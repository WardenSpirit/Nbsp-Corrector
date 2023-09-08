// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { registerCommand as registerCommand } from './commandRegister';
import { correct } from '../spacescorrector/correctionController';

// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file. The commandId parameter must match.
	const commandId = 'nbspcorrector.helloWorld';
	registerCommand(commandId, correct, context);
}

export function deactivate() {}
