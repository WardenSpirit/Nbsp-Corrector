import * as documentAccess from "../documentaccess/documentAccess"
import { inform, alarm } from "../messager/messager"
import * as documentValidator from "./documentValidator"
import * as DOMRecurser from "./textExtractor"
import { createSpaceUnificationus, createAllCorrections } from "./correctionCreator"
import { Change } from "../documentaccess/Change"
import jsdom = require("jsdom")
const { JSDOM } = jsdom
const DOMParser = new JSDOM().window.DOMParser

const changes: Change[] = []

export async function correctActiveDocument() {
    
    const sorting = (a: Change, b: Change) => a[1] - b[1]

    let HTMLText = gainText()
    if (!HTMLText) return

    let textParts = DOMRecurser.extractTexts(HTMLText)
    const unifications: Change[] = generateChanges(textParts, createSpaceUnificationus).sort(sorting)
    await documentAccess.applyChanges(unifications)


    HTMLText = gainText()
    if (!HTMLText) return

    textParts = DOMRecurser.extractTexts(HTMLText)
    const corrections: Change[] = generateChanges(textParts, createAllCorrections).sort(sorting)
    await documentAccess.applyChanges(corrections)

    inform(`${corrections.length} correction(s): "${corrections}"`)
}

function gainText() : string|null {
    let HTMLText: string
    try {
        documentAccess.loadDocument()
        HTMLText = documentAccess.read()
    } catch (error) {
        if (error instanceof Error) alarm(error.message)
        return null
    }

    const parsedDocument = new DOMParser().parseFromString(HTMLText, 'text/html')

    if (!documentValidator.canBeCzechValid(parsedDocument)) {
        alarm(documentValidator.ERROR_MESSAGE)
        return null
    }

    return HTMLText
}

function generateChanges(textParts: [textPart: string, offset: number][],
    changesGeneration: (changedText: string) => Change[]) : Change[] {
    const allGenerated: Change[] = []
    for (let textPartI = 0; textPartI < textParts.length; textPartI++) {
        const textPart = textParts[textPartI]
        const generatedForPart: Change[] = changesGeneration(textPart[0])
        generatedForPart.forEach(change => {
            updateTextParts(textParts.slice(textPartI), change)
            pushWithOffset(change, textPart[1], allGenerated)
        })
    }
    return allGenerated
}

function pushWithOffset(change: Change, offset: number, allGenerated: Change[]) {
    change[1] += offset
    change[2] += offset
    allGenerated.push(change) 
}

function updateTextParts(updatedParts: [textPart: string, offset: number][], change: Change) {
    const currentPart = updatedParts[0]
    const oldText = currentPart[0]
    currentPart[0] = oldText.substring(0, change[1]) + change[0] + oldText.substring(change[2])

    // const offset = currentPart[0].length - oldText.length
    // updatedParts.slice(1).forEach(offsetPart => {
    //     offsetPart[1] += offset
    // })
}