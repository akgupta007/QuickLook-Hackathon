// ************************************************************************
// Multi Highlight popup js
// ************************************************************************

const enableQuickLook = document.getElementById("enableQuickLook");
if(enableQuickLook){
    enableQuickLook.onclick = function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { 
                    enable: true,
                    tabId: tabs[0].id
                },
                function(response) {
                    window.close();
                }
            );
        });
    }
}

const disableQuickLook = document.getElementById("disableQuickLook");
if(disableQuickLook){
    disableQuickLook.onclick = function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { enable: false },
                function(response) {
                    window.close();
                }
            );
        });
    }
}