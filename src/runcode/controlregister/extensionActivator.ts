import * as vscode from 'vscode';
import { registerCommand as registerCommand } from './commandRegister';
import { correctActiveDocument } from '../spacescorrector/correctionController';

export function activate(context: vscode.ExtensionContext) {
	const commandId = 'nbspcorrector.correct';
	registerCommand(commandId, correctActiveDocument, context);
}

export function deactivate() {}
