const addBookButton = document.getElementById("add-book-button")
const libraryGrid = document.querySelector(".library-grid-container-wrapper")
const form = document.getElementById("form-template")
const formSaveButton = document.getElementById('form-save-button')
const main = document.getElementById('main')



let brain = {
    bookArray: []
}

formSaveButton.onclick = () => {
    handleData();
}
addBookButton.onclick = () => {
   displayForm()

}

function handleData(){

}


function displayForm(){
    // get the form from HTML
    
    // dim the main page
   
    main.style.opacity = ".1"
    // turn on display
    unHideForm(form)
    //display the form on page
    const formAnchor = document.getElementById("form-anchor")
    formAnchor.appendChild(form)
}

function unHideForm(form){
    form.style.display = "block"
}



function createCard(){
    const newBook = document.createElement('div');
    newBook.classList = "book-card";
    newBook.appendChild(document.createElement('h3')).textContent = "Book"
    brain.bookArray.push(newBook)

     addToLibrary()

}

function addToLibrary(){

    brain.bookArray.forEach(element => {
        libraryGrid.appendChild(element)
    });
}



// <div id="book-card">
//                     <h3>Book</h3>
//                     <p><em>Title: </em>Harry Potter</p>
//                     <p><em>Author: </em>Some Author</p>
//                     <p><em>Pages: </em> 680 </p>
//                     <button>Read</button>
//                     <button>Remove</button>
//                 </div>     