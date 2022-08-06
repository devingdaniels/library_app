const addBookButton = document.getElementById("add-book-button")
const libraryGrid = document.querySelector(".library-grid-container-wrapper")
const form = document.getElementById("form-template")
const formCancelButton = document.getElementById('form-cancel-button')
const main = document.getElementById('main')


let brain = {
    bookArray: []
}


// book constructor
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// Book.prototype.readStatus() = ()=>{
//     // toggle the read status
// }



addBookButton.onclick = () => {
    displayForm()
 
 }
 formCancelButton.onclick = () => {
    hideForm()
 }

form.addEventListener('submit', (event) =>{
    // prevents auto submitting of the form
    event.preventDefault() 
    // save the data from the form
    let title = document.getElementById('form-title').value
    let author = document.getElementById('form-author').value
    let pages = document.getElementById('form-pages').value        
    let read = document.getElementById('form-read-checkbox').checked
    // wipe form data
    resetFormData()
     // hide the card HTML element from the UI
    hideFormCard()
     // reset the main opacity 
    turnOffMainOpacity()
    // create a new book object with user-data
    const book = new Book(title, author, pages, read)
    // pass book object to create card
    createCard(book)
})


function createCard(book){

    const newBook = document.createElement('div');
    newBook.classList = "book-card";
    newBook.dataset = "data-index-number"
    newBook.dataset.indexNumber = brain.bookArray.length
    newBook.appendChild(document.createElement('h3')).textContent = "Book"
    newBook.appendChild(document.createElement('p')).textContent = book.title
    newBook.appendChild(document.createElement('p')).textContent = book.author
    newBook.appendChild(document.createElement('p')).textContent = book.pages

    let readButton = newBook.appendChild(document.createElement('button'))
    readButton.textContent = readStatus(book)
     // add ID for styling and for button access
    readButton.setAttribute('id','read-button')

    let removeButton = newBook.appendChild(document.createElement('button'))
    removeButton.textContent = "Remove"
    // add ID for styling and for button access
    removeButton.setAttribute('id','remove-button')

   
    brain.bookArray.push(newBook)

     addToLibrary()

}

function addToLibrary(){

    brain.bookArray.forEach(element => {
        libraryGrid.appendChild(element)
    });
}



function readStatus(book){
    if (book.read === true){
        return "Read"
    } 
    return "Unread"
}

function resetFormData(){
     // reset form data
    document.getElementById('form-title').value = ""     
    document.getElementById('form-author').value = ""     
    document.getElementById('form-pages').value = ""     
    document.getElementById('form-read-checkbox').checked = false
}

function displayForm(){ 
    // dim the background
    turnOnMainOpacity()
    // show the card
    displayFormCard()
}

function hideForm(){
    turnOffMainOpacity()
    hideFormCard()
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
