import * as vscode from 'vscode';

export function alarm(text: string) {
    vscode.window.showErrorMessage(text)
}