console.log("moodle-chrome-extension running...")

chrome.storage.local.get('hidden', data => {
    let hiddenList = data.hidden;

    const menus = document.querySelectorAll('.dropdown-menu')
    const course_menu = menus[4];

    for (let child of course_menu.children) {
        child.innerText = child.title.replaceAll(/T3INF[\d]{4}(_\d_)?/gm, '');

        if (hiddenList !== undefined) {
            if (hiddenList.includes(child.title)) {
                child.style.display = 'none';
            }
        }
    }
});

var clickedItem = null;

document.addEventListener("contextmenu", function(event){
    if(event.target.className === 'dropdown-item'){
        console.log(event.target.className)
        chrome.storage.local.set({contextMenuOn: event.target.title});
    }else{
        chrome.storage.local.set({contextMenuOn: null});
    }
}, true);


