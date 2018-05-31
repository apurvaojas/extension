function injectTheScript() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
        chrome.tabs.sendMessage(tabs[0].id, {text: 'report_back'}, (res)=>{
            console.log(res);
        }); 
        // chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});
    });
    
}

const code = `
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        // If the received message has the expected format...
        console.log("Message_______", msg);
        if (msg.text === 'report_back') {
            // Call the specified callback, passing
            // the web-page's DOM content as argument
            sendResponse(document.querySelectorAll('ul.row li:nth-child(2) button')[0].outerHTML);
        }
    });`;
    
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.executeScript(tabs[0].id, {code});
    // });

document.getElementById('clickactivity').addEventListener('click', injectTheScript);

$(document).ready(()=>{
    $('#rf-website').on('change',function(e){
        populatePages(this.value);
    });

    $('#rf-activate').on('click',function(e){
        let pageid = $('#rf-pages').val();
        const time = $('#rf-time').val();
        inject({pageid});
        chrome.tabs.onUpdated.addListener((id)=>{
            if(id== pageid){
                inject({pageid});
                startRefreshonPage({pageid,time});
            }
        })
        startRefreshonPage({pageid,time});

    });
});

var setIntervalSynchronous = function (func, delay) {
    var intervalFunction, timeoutId, clear;
    // Call to clear the interval.
    clear = function () {
      clearTimeout(timeoutId);
    };
    intervalFunction = function () {
      func();
      timeoutId = setTimeout(intervalFunction, delay);
    }
    // Delay start.
    timeoutId = setTimeout(intervalFunction, delay);
    // You should capture the returned function for clearing.
    return clear;
  };

function startRefreshonPage({pageid, time}){
    let interval = setTimeout(()=>{
       
            if(button) {
                clearTimeout(interval);
            }
            else{
                chrome.tabs.reload(Number(pageid));
                // inject({pageid, time})
            }
            console.log(res);
        
    },time);
}



function inject({pageid, time}){
    const code = `
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        // If the received message has the expected format...
        console.log("Message_______", msg);
        if (msg.text === 'report_back') {
            // Call the specified callback, passing
            // the web-page's DOM content as argument
            sendResponse(document.querySelectorAll('ul.row li:nth-child(2) button')[0]);
        }
    });`;

    chrome.tabs.executeScript(Number(pageid), {code},()=>{
        chrome.tabs.sendMessage(Number(pageid), {text: 'report_back'}, (res)=>{
            console.log(res);
        }); 
    });
      
   
}

function populatePages(website){
    $('#rf-pages').html('');
    // let template = 
    chrome.tabs.getAllInWindow((tabs)=>{
        tabs.forEach(tab => {
            if(tab.url.match(new RegExp(website))){
                $('#rf-pages').append(`<option value=${tab.id}>${tab.title}</option>`);
            }
        });
        
    })
}
