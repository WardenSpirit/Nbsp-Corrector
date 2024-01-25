import * as assert from 'assert';
import * as vscode from 'vscode';
//import * as documentAccess from '../../../runcode/documentaccess/documentAccess';
import { read, exportedForTesting } from '../../../runcode/documentaccess/documentAccess';
const { rewriteSection, getActiveEditor } = exportedForTesting
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

suite('DocumentAccess test suite', () => {

    const path = join(__dirname, "temporaryTestFile.html")
    const content = "This is the content of the file. It should equal the read value."
    writeFileSync(path, content, { flag: 'w' })
    const uri = vscode.Uri.file(path)

    test('Read the document test', () => {/*
        vscode.workspace.openTextDocument(uri).
            then((document) => {
                vscode.window.showTextDocument(document)
                assert.equal(read(), content)
            })
        */})

    const rewrittenContent = "This is the text of the file. It should equal the read value."

    test('Write the document test', () => {/*
        vscode.workspace.openTextDocument(uri).
            then(async (document: vscode.TextDocument) => {
                vscode.window.showTextDocument(document)
                await getActiveEditor().edit((editor) => {
                    rewriteSection(["text", 12, 19], document, editor)
                })
                assert.equal(read(), rewrittenContent)
            })

        vscode.commands.executeCommand('workbench.action.closeActiveEditor');*/
    })
})