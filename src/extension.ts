import * as vscode from "vscode";
import * as path from "path";

import { PythonShell } from "python-shell";

const SCRIPTS_DIR = __dirname + "/scripts";
const GENERATE_PDF_SCRIPT_PATH = "fixup_pdf_template.py";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand("pdfGenerator.commands.generatePDF", () => {
        console.log(__dirname);
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

    context.subscriptions.push(disposable);
}

export function deactivate() { }
