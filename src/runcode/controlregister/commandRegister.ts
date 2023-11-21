import * as vscode from 'vscode';

export function registerCommand(commandId: string, command: (...args: any[]) => any, context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(commandId, command)
	context.subscriptions.push(disposable)
}