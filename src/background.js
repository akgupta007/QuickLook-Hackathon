// handle new page opened
chrome.tabs.onUpdated.addListener(function (tabId, info) {
    chrome.tabs.executeScript(tabId,
        {
            code: 'console.log("TAB IS UPDATED")'
        }, _ => chrome.runtime.lastError);
    chrome.tabs.sendMessage(
        tabId,
        { 
            enable: true,
            tabId: tabId
        },
        function(response) {
            
        }
    );
});
