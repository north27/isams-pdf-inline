// var responseListener = function (details) {
//     const headers = details.responseHeaders;

//     const contentType = headers.find(element => element.name == "Content-Type");
//     alert(JSON.stringify(contentType));
//     if ((contentType && contentType.value) && (contentType.value == 'application/pdf')) {
//         alert(JSON.stringify(headers));
//         var rule = {
//             "name": "Content-Disposition",
//             "value": "inline"
//         };
//         details.responseHeaders.push(rule);
//         return { responseHeaders: details.responseHeaders };
//     }
// };

// chrome.webRequest.onHeadersReceived.addListener(responseListener,
//     {
//         urls: [
//             "*://*.isams.co.uk/*",
//             "*://*.isams.cloud/*",
//             "*://*.halcyonschool.com/*"
//         ]
//     },
//     [
//         "blocking",
//         "responseHeaders"
//     ]
// );


chrome.webRequest.onHeadersReceived.addListener((details) => {

    var headers = details.responseHeaders;
    var i = findInHeaders(headers, "content-disposition");
    console.log('headers', headers);
    if (i > -1) {
        const cdValue = headers[i].value;
        let cd = headers[i].value.toLowerCase();
        const contentType = headers.find(element => element.name == "Content-Type");
        const allowedTypes = [
            'application/pdf',
            'application/octet-stream; Charset=UTF-8'
        ];

        if (cd.startsWith('attachment') && (allowedTypes.find(element => element == contentType.value))) {
            console.log('Inlining...');
            headers[i].value = 'inline' + headers[i].value.substr(10);

            var iContentType = findInHeaders(headers, "content-type");
            headers[iContentType].value = contentType.value;
            return {responseHeaders: headers};
        }

    }

},
{urls: ["*://*.isams.co.uk/*","*://*.isams.cloud/*","*://*.halcyonschool.com/*"]},
["responseHeaders","blocking"]);

function findInHeaders(headers, name) {
    for (let i = 0; i < headers.length; i++) {
        if(name.toLowerCase() == headers[i].name.toLowerCase()) {
            return i;
        }
    }
    return -1;
}