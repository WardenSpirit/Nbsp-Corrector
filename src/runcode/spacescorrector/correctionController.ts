import * as documentAccess from "../documentaccess/documentAccess"
import { alarm } from "../messager/messager"
import * as documentValidator from "./documentValidator"
import * as DOMRecurser from "./DOMRecurser"
import { createAllCorrections } from "./correctionPerformer"
import { Change } from "./Change"
import jsdom = require("jsdom")
import { loadRewriteActive } from "../settings/settingsAccess"
const { JSDOM } = jsdom
const DOMParser = new JSDOM().window.DOMParser

export function correctActiveDocument() {
    let htmlText: string
    try {
        htmlText = documentAccess.readAdapted()
    } catch (error) {
        if (error instanceof Error) alarm(error.message)
        return
    }

    const parsedDocument = new DOMParser().parseFromString(htmlText, 'text/html');

    if (!documentValidator.canBeCzechHtmlDocument(parsedDocument)) {
        alarm(documentValidator.ERROR_MESSAGE)
        return
    }

    const correctionFunction = loadRewriteActive()? noteCorrectionsRewriting : noteCorrections
    const doctypeHTMLLength = htmlText.indexOf(parsedDocument.documentElement.innerHTML)
    console.log(`doctypeHTMLLength: ${doctypeHTMLLength}`)
    DOMRecurser.forChainedTextParts(parsedDocument.documentElement, correctionFunction, doctypeHTMLLength)

    console.log(`info: ${changes.length} change(s): "${changes}"`)

    changes.forEach(change => documentAccess.rewriteSection(change[0], change[1], change[2]))
}

const changes: Change[] = []

function noteCorrectionsRewriting(correctedText: string, startingIndex: number) {
    noteCorrections(correctedText.replace(/(?: |&nbsp;?|(?:&#160|&#xA0)(?:;|(?=[^0-9A-F])))/gi, " "), startingIndex)
}

function noteCorrections(correctedText: string, startingIndex: number) {
    createAllCorrections(correctedText).forEach(change => {
        change[1] += startingIndex
        change[2] += startingIndex
        changes.push(change)
    })
}
