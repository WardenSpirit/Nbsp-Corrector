import * as documentAccess from "../documentaccess/documentAccess"
import { info, alarm } from "../messager/messager"
import * as documentValidator from "./documentValidator"
import * as DOMRecurser from "./textExtractor"
import { createAllCorrections } from "./correctionPerformer"
import { Change } from "../documentaccess/Change"
import { loadRewriteActive } from "../settings/settingsAccess"
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

    const correction = loadRewriteActive() ? noteCorrectionsRewriting : noteCorrections
    textParts.forEach(textPart => {
        correction(...textPart)
    })

    info(`info: ${changes.length} change(s): "${changes}"`)
    documentAccess.applyChanges(changes)
}

const changes: Change[] = []

function noteCorrectionsRewriting(correctedText: string, startingIndex: number) {
    noteCorrections(correctedText.replace(/(?: |&nbsp;?|(?:&#160|&#xA0)(?:;|(?=[^0-9A-F])))/gi, " "), startingIndex)        //tohle asi nebude stačit, jelikož se přitom ztrácí data o indexech (staří zaznamenat nalezené zápisy mezer a posléze je přidat z5)
}

function noteCorrections(correctedText: string, startingIndex: number) {
    createAllCorrections(correctedText).forEach(change => {
        change[1] += startingIndex
        change[2] += startingIndex
        changes.push(change)
    })
}
