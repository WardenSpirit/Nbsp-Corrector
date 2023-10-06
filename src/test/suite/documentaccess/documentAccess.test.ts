import * as assert from 'assert';
import * as vscode from 'vscode';
import * as documentAccess from '../../../runcode/documentaccess/documentAccess';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
/*
suite('DocumentAccess test suite', () => {

    const path = join(__dirname, "temporaryTestFile.html")
    const content = "This is the content of the file. It should equal the read value."
    writeFileSync(path, content, { flag: 'w' })
    const uri = vscode.Uri.file(path)

    test('Read the document test', () => {
        vscode.workspace.openTextDocument(uri).
            then((document) => {
                vscode.window.showTextDocument(document)
                assert.equal(documentAccess.read(), content)
            })
    })

    const rewrittenContent = "This is the text of the file. It should equal the read value."

    test('Write the document test', () => {
        vscode.workspace.openTextDocument(uri).
            then((document) => {
                vscode.window.showTextDocument(document)
                documentAccess.rewriteSection("text", 12, 19)
                assert.equal(documentAccess.read(), rewrittenContent)
            })
    })

    vscode.commands.executeCommand('workbench.action.closeActiveEditor');
})*/