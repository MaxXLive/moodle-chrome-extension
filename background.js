let hiddenList;
loadList();

const contextMenuItems = {
    "title": 'Hide from list',
    "contexts": ["link"],
    "id": "hideFromList"
};
chrome.contextMenus.create(contextMenuItems);
chrome.contextMenus.onClicked.addListener(clickData => {
    chrome.storage.local.get('contextMenuOn', data => {
        const text = data.contextMenuOn;

        if(text !== null){
            if(hiddenList !== undefined){
                hiddenList.push(text);
                chrome.storage.local.set({hidden: hiddenList});
            }else{
                chrome.storage.local.set({hidden: [text]});
            }
            loadList();
            chrome.tabs.reload();
        }
    });
});


function loadList() {
    chrome.storage.local.get('hidden', data => {
        hiddenList = data.hidden;
    });
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
