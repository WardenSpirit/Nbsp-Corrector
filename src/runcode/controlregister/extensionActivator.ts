// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { registerCommand as registerCommand } from './commandRegister';
import { correctActiveDocument } from '../spacescorrector/correctionController';

// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "Korektor nezlomitelných mezer" has just been activated!');

	// The command has been defined in the package.json file. The commandId parameter must match.
	const commandId = 'nbspcorrector.correct';
	registerCommand(commandId, correctActiveDocument, context);
}

export function deactivate() {}
