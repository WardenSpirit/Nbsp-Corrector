import * as vscode from 'vscode'
import { Change } from "./Change"

export class NoActiveEditorError extends Error {
    private static readonly MESSAGE = "Aktivní okno editoru nenalezeno!"
    constructor() {
        super(NoActiveEditorError.MESSAGE);
        this.name = "NoActiveEditorError";
    }
}

export class InvalidDocumentTypeError extends Error {
    private static readonly MESSAGE = "V aktivním okně editoru není soubor \".HTML!\""
    constructor() {
        super(InvalidDocumentTypeError.MESSAGE);
        this.name = "InvalidDocumentTypeError";
    }
}

export class CharacterTooLongError extends Error {
    private static readonly MESSAGE = "Neplatí předpoklad, že délka řetězce (stringu) reprezentujícího znak (character) je 1."
    constructor() {
        super(CharacterTooLongError.MESSAGE);
        this.name = "CharacterTooLongError";
    }
}

export function readAdapted(): string {
    console.log(`The document's length is ${getActiveDocument().getText().length}`)
    return adaptLinesToUnableReader(getActiveDocument().getText())
}

export function rewriteCharacter(index: number, newChar: string) {
    if (newChar.length != 1) {
        throw new CharacterTooLongError();
    }
    return rewriteSection(newChar, index, index + 1);
}

function getActiveDocument(): vscode.TextDocument {
    const activeEditor = getActiveEditor();
    const document = activeEditor.document
    if (document.languageId !== "html") throw new InvalidDocumentTypeError()
    return document
}

function getActiveEditor(): vscode.TextEditor {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) throw new NoActiveEditorError();
    return activeEditor;
}

function getActiveDocumentFromEditor(activeEditor: vscode.TextEditor): vscode.TextDocument {
    const document = activeEditor.document
    if (document.languageId !== "html") throw new InvalidDocumentTypeError()
    return document
}

function adaptLinesToUnableReader(htmlText: string): string {
    const numberOfRN: number = htmlText.match(/\r\n/g)? htmlText.match(/\r\n/g)!.length : 0
    console.log(`number of \\r\\n: ${numberOfRN}`)
    const returnValue = htmlText.replace(/\r\n/g, "\n\n")
    console.log(`after adapting lines: \n${returnValue}`)
    return returnValue
}

export function rewriteSection(newSection: string, startIndex: number, endIndex: number) {
    console.log(`rewriteSection("${newSection}", ${startIndex}, ${endIndex}) invoked`)
    const activeDocument = getActiveDocument()
    const oldText = activeDocument.getText()
    if (startIndex < 0 || startIndex >= oldText.length || endIndex < 0 || endIndex > oldText.length) {
        throw new RangeError("Neplatný rozsah indexů.");
    }

    const range = new vscode.Range(
        activeDocument.positionAt(startIndex),
        activeDocument.positionAt(endIndex)
    )

    getActiveEditor().edit((editBuilder) => {
        editBuilder.replace(range, newSection)
    })
}