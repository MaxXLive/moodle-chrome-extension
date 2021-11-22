console.log("moodle-chrome-extension running...")

chrome.storage.local.get('hidden', data => {
    let hiddenList = data.hidden;

    const menus = document.querySelectorAll('.dropdown-menu')
    const course_menu = menus[4];

    for (let child of course_menu.children) {
        child.innerText = child.title;

        if (hiddenList !== undefined) {
            if (hiddenList.indexOf(child.title) !== -1) {
                course_menu.removeChild(child)
            }
        }
    }
});


