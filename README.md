# isams-pdf-inline

A Chrome plugin that monitors any iSAMS site (must be hosted by iSAMS) and intercepts PDF downloads.
It then changes the Attachment header to force it a file download rather than using an in-line viewer.

See background.js for main code.

To test:

Clone the repo to a local directory

In Chrome:

Go to chrome://extensions/
Enabled Developer Mode (top-right)
Click 'Add Unpacked'
Navigate to folder containing this code
