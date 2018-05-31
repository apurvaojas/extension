function clickPlanet() {
    console.log("content script_____");
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        // If the received message has the expected format...
        if (msg.text === 'report_back') {
            // Call the specified callback, passing
            // the web-page's DOM content as argument
            sendResponse(document.querySelectorAll('ul.row li:nth-child(2) button')[0]);
        }
    });
   
    // document.querySelectorAll('ul.row li:nth-child(2) button')[0].click();
}

clickPlanet();