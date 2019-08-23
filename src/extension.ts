import * as vscode from "vscode";
import * as path from "path";

import { PythonShell } from "python-shell";

const SCRIPTS_DIR = __dirname + "/scripts";
const GENERATE_PDF_SCRIPT_PATH = "fixup_pdf_template.py";

export function activate(context: vscode.ExtensionContext) {

    let generatePDFCommand = vscode.commands.registerCommand("pdfGenerator.commands.generatePDF", () => {
        let activeTextEditor = vscode.window.activeTextEditor;
        if (activeTextEditor) {
            let filename = activeTextEditor.document.fileName;
            let filename_without_extension = path.parse(filename).name;
            let pythonPath: string | undefined = vscode.workspace.getConfiguration().get("pdfGenerator.resource.pythonPath");
            let options = {
                pythonPath: pythonPath,
                scriptPath: SCRIPTS_DIR,
                args: [filename]
            };

            // Verify pythonPath is valid
            PythonShell.getVersion(pythonPath as string).then((data) => {
                PythonShell.run(GENERATE_PDF_SCRIPT_PATH, options, function (err, output) {
                    if (err) {
                        vscode.window.showErrorMessage("Error while generating PDF. " + err.toString());
                        throw err;
                    }
                    vscode.window.showInformationMessage("Successfully generated " + filename_without_extension + ".pdf");
                });
            }).catch((e) => {
                vscode.window.showErrorMessage("Wrong Python path:" + pythonPath as string);
            });

        }
    });

    vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        let filename = document.fileName;
        let extension = path.parse(filename).ext;
        if (extension === ".in") {
            vscode.commands.executeCommand("pdfGenerator.commands.generatePDF");
        }
    });

    context.subscriptions.push(generatePDFCommand);
}

export function deactivate() { }
