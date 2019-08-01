# PDF Generator

This simple extension generates a PDF file from a .in file template. There are several places in a PDF file where bytes-offsets are required. We use the PDFium fixup_template_pdf.py script to replace {{name}}-style variables in the input with calculated results.

## Features

- [x] Generate PDF on `Ctrl+S` or `Cmd+S`

## Requirements

You need to have Python 2.7+ on your device. The default Python path used is `python`. You can change it in the settings.

## Extension Settings

This extension contributes the following settings:

* `pdfGenerator.resource.pythonPath"`: the Python path used to run the Python script

## Release Notes

### 1.0.0

## Contributions

We would be love to have you contribute on PDF Generator ❤️ Here's the repo: https://github.com/bbeaudry/pdf-generator.
