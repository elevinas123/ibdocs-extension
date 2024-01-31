

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    console.log('History state updated in tab:', details.tabId);
    
    
    // Execute your content script in the tab that had the URL change
    chrome.scripting.executeScript({
        target: { tabId: details.tabId},
        files: ['contentScript.js']
    }, () => {
        console.log('Content script injected into all frames in tab:', details.tabId);
    });
}, {url: [{urlMatches : 'https://a.ibdocs.org/*'}]}); // Adjust the urlMatches pattern to suit your needs
