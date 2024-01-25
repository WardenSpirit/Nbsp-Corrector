import * as documentAccess from "../documentaccess/documentAccess"
import { inform, alarm } from "../messager/messager"
import * as documentValidator from "./documentValidator"
import * as DOMRecurser from "./textExtractor"
import { createSpaceUnifications, createAllCorrections } from "./correctionCreator"
import { Change } from "../documentaccess/Change"

export async function correctActiveDocument() {
    try {
        await changeTexts(createSpaceUnifications)
        inform("Nalezené výrazy: " + await changeTexts(createAllCorrections))
    } catch (error) {
        if (error instanceof Error) alarm(`Je mi líto, něco se nepovedlo: ${error.message}`)
    }
}

async function changeTexts(changesGeneration: (correctedText: string) => Change[]): Promise<number> {
    let HTMLText = obtainText()
    let textParts = DOMRecurser.extractTexts(HTMLText)

    const changes: Change[] = generateChanges(textParts, changesGeneration)
    let numberOfChanges = changes.length
    await documentAccess.applyChanges(changes)
    return numberOfChanges
}

function obtainText(): string {
    let HTMLText: string
    HTMLText = documentAccess.read()

    if (!documentValidator.canBeCzechValid(HTMLText)) {
        throw new Error(documentValidator.ERROR_MESSAGE)
    }

    return HTMLText
}

function generateChanges(textParts: [textPart: string, offset: number][],
    changesGeneration: (changedText: string) => Change[]): Change[] {

    const allGenerated: Change[] = []
    for (let textPartI = 0; textPartI < textParts.length; textPartI++) {
        const textPart = textParts[textPartI]
        const generatedForPart: Change[] = changesGeneration(textPart[0])
        generatedForPart.forEach(change => {
            shiftTextParts(textPart, change)
            pushWithOffset(change, textPart[1], allGenerated)
        })
    }
    return allGenerated
}

function shiftTextParts(updatedPart: [textPart: string, offset: number], change: Change) {
    const currentPart = updatedPart
    const oldText = currentPart[0]
    currentPart[0] = oldText.substring(0, change[1]) + change[0] + oldText.substring(change[2])
}

function pushWithOffset(change: Change, offset: number, allGenerated: Change[]) {
    change[1] += offset
    change[2] += offset
    allGenerated.push(change)
}