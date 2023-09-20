
export const ERROR_MESSAGE = "Dokument nevyhovuje požadavkům. Soubor musí mít příponu '.html' a obsahovat validní kód HTML. Atribut 'lang' značky '<html>' nesmí značit jiný jazyk než \"cs\"."

export function canBeCzechHtmlDocument(parsedDocument: Document): boolean {
    const documentElement: HTMLElement = parsedDocument.documentElement
    if (!isParsedOK(documentElement)) return false

    const lang = documentElement.getAttribute("lang")
    return lang ? lang.startsWith("cs") : true
}

function isParsedOK(documentElement: HTMLElement) {
    return !documentElement.querySelector('parsererror')
}
