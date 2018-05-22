chrome.webRequest.onHeadersReceived.addListener((details) => {

    var headers = details.responseHeaders;
    var i = findInHeaders(headers, "content-disposition");
    
    if (i > -1) {

        let cd = headers[i].value.toLowerCase();
        
        if (cd.startsWith('attachment') && (cd.endsWith('.pdf"') || cd.endsWith('.pdf'))) {

            headers[i].value = 'inline' + headers[i].value.substr(10);

            var iContentType = findInHeaders(headers, "content-type");
            headers[iContentType].value = 'application/pdf';
            return {responseHeaders: headers};
        }
        
    }

},
{urls: ["*://*isams*/"]},
["responseHeaders","blocking"]);

function findInHeaders(headers, name) {
    for (let i = 0; i < headers.length; i++) {
        if(name.toLowerCase() == headers[i].name.toLowerCase()) {
            return i;
        }
    }
    return -1;
}