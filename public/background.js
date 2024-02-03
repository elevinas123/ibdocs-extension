console.log("cias")
chrome.webNavigation.onCompleted .addListener(function(details) {
    console.log('History state updated in tab:', details.tabId);

    // Check state before injecting the script for library.licejus.lt
    chrome.storage.local.get(['licejusAllowed'], function(result) {
        if (result.licejusAllowed) {
            chrome.scripting.executeScript({
                target: { tabId: details.tabId},
                files: ['contentLibraryScript.js']
            }, () => {
                console.log('Content script for library.licejus.lt injected into tab:', details.tabId);
            });
        } else {
            console.log('Script for library.licejus.lt not injected due to user preference.');
        }
    });
}, {url: [{urlMatches : 'https://library.licejus.lt/*'}]});

// Repeat the same for ibdocs
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    console.log('History state updated in tab:', details.tabId);

    // Check state before injecting the script for files.ibdocs.cc
    chrome.storage.local.get(['ibdocsAllowed'], function(result) {
        if (result.ibdocsAllowed) {
            chrome.scripting.executeScript({
                target: { tabId: details.tabId},
                files: ['contentScript.js']
            }, () => {
                console.log('Content script for files.ibdocs.cc injected into tab:', details.tabId);
            });
        } else {
            console.log('Script for files.ibdocs.cc not injected due to user preference.');
        }
    });
}, {url: [{urlMatches : 'https://files.ibdocs.cc/*'}]});
