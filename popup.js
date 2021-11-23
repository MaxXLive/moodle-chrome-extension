const hideButton = document.getElementById('hide_button');
const hiddenListElement = document.getElementById('hidden_list');

let hiddenList;

hideButton.addEventListener('click', () => addToHideList());
loadList();

function addToHideList(){
    const text = document.getElementById('name_text').value;

    if(hiddenList !== undefined){
        hiddenList.push(text);
        chrome.storage.local.set({hidden: hiddenList});
    }else{
        chrome.storage.local.set({hidden: [text]});
    }
    document.getElementById('name_text').value = '';
    loadList();
}

function loadList() {
    chrome.storage.local.get('hidden', data => {
        hiddenList = data.hidden;
        hiddenListElement.innerHTML = '';
        if(hiddenList !== undefined){
            hiddenList.forEach(value => {
                const a = document.createElement('a');
                a.innerText = value;
                a.href = '#';
                a.addEventListener('click', ev => deleteFromList(ev));
                const li = document.createElement('li');
                li.appendChild(a);
                hiddenListElement.appendChild(li);
            })
        }
    });
}

function deleteFromList(event) {
    hiddenList = hiddenList.filter(value => value !== event.target.innerText);
    chrome.storage.local.set({hidden: hiddenList});
    loadList();
}
