import * as documentAccess from "../documentaccess/documentAccess"
import { alarm } from "../messager/messager"
import * as documentValidator from "./documentValidator"
import * as DOMRecurser from "./DOMRecurser"
import { generateCorrections } from "./correctionPerformer"
import { Change } from "./Change"

export function correctActiveDocument() {
    let htmlText: string
    try {
        htmlText = documentAccess.read()
    } catch (error) {
        if (error instanceof Error) alarm(error.message)
        return
    }

    const parsedDocument = new DOMParser().parseFromString(htmlText, 'text/xml');

    if (!documentValidator.canBeCzechHtmlDocument(parsedDocument)) {
        alarm(documentValidator.ERROR_MESSAGE)
        return
    }

    DOMRecurser.forChainedTextParts(parsedDocument.documentElement, noteCorrections)

    changes.forEach(change => documentAccess.rewriteCharacter(change[0], change[1]))
}

const changes: Change[] = []

function noteCorrections(correctedText: string, startingIndex: number) {
    generateCorrections(correctedText).forEach(change => {
        change[1] += startingIndex
        changes.push(change)
    })
}