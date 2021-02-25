//if previous notes are present in local storage diplay them
showNotes();

// search btn problem fixed
let srchBtn = document.getElementById("srchBtn");
srchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
});

//store the note in local storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let dateObj = new Date();
    let noteDate = dateObj.getDate().toString()+'/'+(dateObj.getMonth()+1).toString()+'/'+ dateObj.getFullYear().toString()+', '
    + dateObj.getHours().toString()+':'+dateObj.getMinutes().toString()+':'+dateObj.getSeconds().toString();
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    let noteTitle = document.getElementById('title');
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push({title: noteTitle.value, content: addTxt.value, date: noteDate});
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = '';
    title.value = '';
    showNotes();
});

//display note

function showNotes() {
    let notes = localStorage.getItem('notes');
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    Array.from(notesObj).forEach(function(element, index){
        html += `<div class="card my-2 mx-2 noteCard" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <h6 class="card-title">${element.date}</h6>
                <p class="card-text">${element.content}</p>
                <button onclick="deleteNote(this.id)" class="btn btn-primary" id="${index}">Delete note</button>
            </div>
        </div>`;
    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length!=0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show! Use "Take a note" section above to add notes.`;
    }
}

//delete a note

function deleteNote(index){
    let notes = localStorage.getItem('notes');
    let notesObj;
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//search functionality

let search = document.getElementById('search');
search.addEventListener('input', function(e){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let titleTxt = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let date = element.getElementsByTagName('h6')[0].innerText;
        if(cardTxt.includes(inputVal)||titleTxt.includes(inputVal)||date.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
});