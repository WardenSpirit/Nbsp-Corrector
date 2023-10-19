import * as documentAccess from "../documentaccess/documentAccess"
import { info, alarm } from "../messager/messager"
import * as documentValidator from "./documentValidator"
import * as DOMRecurser from "./textExtractor"
import { createAllCorrections } from "./correctionCreator"
import { Change } from "../documentaccess/Change"
import jsdom = require("jsdom")
const { JSDOM } = jsdom
const DOMParser = new JSDOM().window.DOMParser

export function correctActiveDocument() {
    let HTMLText: string
    try {
        HTMLText = documentAccess.read()
    } catch (error) {
        if (error instanceof Error) alarm(error.message)
        return
    }
    const parsedDocument = new DOMParser().parseFromString(HTMLText, 'text/html')

    if (!documentValidator.canBeCzechValid(parsedDocument)) {
        alarm(documentValidator.ERROR_MESSAGE)
        return
    }

    const textParts: [text: string, offset: number][] = DOMRecurser.extractTexts(HTMLText)

    textParts.forEach(textPart => {
        noteCorrections(...textPart)
    })

    info(`info: ${changes.length} change(s): "${changes}"`)
    documentAccess.applyChanges(changes)
}

const changes: Change[] = []

function noteCorrections(correctedText: string, startingIndex: number) {
    const corrections = createAllCorrections(correctedText)
    corrections.forEach(change => {
        change[1] += startingIndex
        change[2] += startingIndex
        changes.push(change)
    })
}
