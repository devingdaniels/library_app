const addBookButton = document.getElementById("add-book-button")
const libraryGrid = document.querySelector(".library-grid-container-wrapper")
const form = document.getElementById("form-template")
const formSaveButton = document.getElementById('form-save-button')
const main = document.getElementById('main')


let brain = {
    bookArray: [],
    title: "",
    author: "",
    pages: "",
    read: false
}

addBookButton.onclick = () => {
    displayForm()
 
 }

formSaveButton.onclick = () => {
    handleData();
}

function displayForm(){ 
    // dim the background
    turnOnMainOpacity()
    // show the card
    displayFormCard()
    //display the form on page
}

function handleData(){

    //save the data from the form 
    // reset the form to base state (reset data in inputs)
    // hide the card HTML element from the UI
    hideFormCard()
    // reset the main opacity 
    turnOffMainOpacity()
    // pass the data to a createCard
    createCard()

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


function turnOnMainOpacity(){
    main.style.opacity = .3;
}

function turnOffMainOpacity(){
    main.style.opacity = 1;
}

function hideFormCard(){
    form.style.display = "none"
}

function displayFormCard(){
    form.style.display = "block"
}
