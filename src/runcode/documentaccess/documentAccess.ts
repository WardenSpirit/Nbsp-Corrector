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

export function read(): string {
    console.log(`Debug: The document's length is ${getActiveDocument().getText().length}`)
    return getActiveDocument().getText()
}
/*
export function rewriteCharacter(index: number, newChar: string) {
    if (newChar.length != 1) {
        throw new CharacterTooLongError();
    }
    return rewriteSection([newChar, index, index + 1], );
}*/

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

function getDocumentFromEditor(activeEditor: vscode.TextEditor): vscode.TextDocument {
    const document = activeEditor.document
    if (document.languageId !== "html") throw new InvalidDocumentTypeError()
    return document
}

export function applyChanges(changes: Change[]) {
    const activeEditor = getActiveEditor()
    const activeDocument = getDocumentFromEditor(activeEditor)

    checkRanges(changes, activeDocument)

    activeEditor.edit((editBuilder) => {
        let change: Change | undefined
        while (change = changes.pop()) {
            rewriteSection(change, activeDocument, editBuilder)
        }
    })
}

function checkRanges(changes: Change[], target: vscode.TextDocument) {
    const textLength = target.getText().length
    changes.forEach(change => {
        if (change[1] < 0 || change[1] >= textLength || change[2] < 0 || change[2] > textLength) {
            throw new RangeError("Neplatný rozsah indexů.")
        }
    })
}

function rewriteSection(change: Change, target: vscode.TextDocument, editBuilder: vscode.TextEditorEdit) {
    console.log(`rewriteSection("${change[0]}", ${change[1]}, ${change[2]}) invoked`)
    const range = new vscode.Range(
        target.positionAt(change[1]),
        target.positionAt(change[2])
    )
    editBuilder.replace(range, change[0])
}