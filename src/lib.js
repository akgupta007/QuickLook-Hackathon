// ************************************************************************
// Multi Highlight Library
// ************************************************************************

// ****** Multi Highlight functions
function hl_search(tabId) {
    chrome.scripting.executeScript(tabId,
        {
            code: "$(document.body).highlight('" + "" +"'})"
        }, _ => chrome.runtime.lastError);
   
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.enable){
        $("body").highlight('');
    }
    else{
        $(document.body).unhighlight();
    }
    sendResponse({ fromcontent: "This message is from content.js" });
});


function hl_clearall(tabId) {
    chrome.scripting.executeScript(tabId,
        {
            code: "$(document.body).unhighlight()"
        }, _ => chrome.runtime.lastError);
}