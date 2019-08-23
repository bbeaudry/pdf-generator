# PDF Generator

This simple extension generates a PDF file from a .in file template on save. There are several places in a PDF file where bytes-offsets are required. We use the PDFium `fixup_template_pdf.py` script to replace {{name}}-style variables in the input with calculated results.

## Features

- [x] Generate PDF on save (for .in files).
- [x] Generate PDF from command palette.

## Requirements

You need to have Python 2.7+ on your device. The default Python path used is `python`. You can change it in the settings.

## Extension Settings

This extension contributes the following settings:

* `pdfGenerator.resource.pythonPath`: the Python path used to run the Python script.

## Release Notes

### 1.0.x

Initial release. 

### 1.1.x

Updated the python script to work on Python <3.0.0. Tested from Python v2.7.13 to v3.6.1.

## Contributions

Want to contribute to PDF Generator and make it better? ⭐️ Here's the repo: https://github.com/bbeaudry/pdf-generator.
