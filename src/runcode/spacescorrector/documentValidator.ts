import jsdom = require("jsdom")
const { JSDOM } = jsdom
const DOMParser = new JSDOM().window.DOMParser

export const ERROR_MESSAGE = "Soubor musí mít příponu '.html' a obsahovat validní dokument HTML. Je-li přítomný atribut 'lang' značky html, musí značit češtinu (např. \"cs\"). Speciální znaky musí být psány entitně."

export function canBeCzechValid(HTMLText: string): boolean {

    const parsedDocument = new DOMParser().parseFromString(HTMLText, 'text/html')
    const documentElement: HTMLElement = parsedDocument.documentElement
    
    if (!isParsedOK(documentElement)) return false

    const lang = documentElement.getAttribute("lang")
    return lang ? lang.startsWith("cs") : true
}

function isParsedOK(documentElement: HTMLElement) {
    return !documentElement.querySelector('parsererror')
}
