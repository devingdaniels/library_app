const addBookButton = document.getElementById("add-book-button")
const libraryGrid = document.querySelector(".library-grid-container-wrapper")
const form = document.getElementById("form-template")
const formCancelButton = document.getElementById('form-cancel-button')
const totalBooks = document.getElementById('total-books')
const totalReadBooks = document.getElementById('total-read-books')
const totalUnReadBooks = document.getElementById('total-unread-books')
const mainBackground = document.getElementById('main')


class Book {
    constructor(
      title = 'Unknown',
      author = 'Unknown',
      pages = '0',
      isRead = false
    ) {
      this.title = title
      this.author = author
      this.pages = pages
      this.isRead = isRead
    }
  }

  let library = {
    bookDatabase: []
}

addBookButton.onclick = () => {
    displayBookForm()
}

form.addEventListener('submit', event=>{
// prevents auto submitting of the form
event.preventDefault() 
// use the data from the form to create a book object

// verify the title is not already in existence 
let title = document.getElementById('form-title').value

if (checkForDuplicateTitle(title)){

// add code here to display message on the card

    alert("that book already exists")
}
else {

    const book = createBookObject()

    addBookToDatabase(book)// helper function, pushes book object onto the array
    
    addBookToLibraryUI() // update the UI with current library listing 
}
})


function addBookToLibraryUI(){

    // reset library UI before updating with current listing
    resetLibraryUI()
    // Wipe the data from the form and hide it form the user
    hideForm()
    // For each book
    // Create a book card
    // Add it to the library UI
    library.bookDatabase.forEach(book=>{
        const bookCard = createBookUiCard(book)
        libraryGrid.append(bookCard)
    })

    console.log(library.bookDatabase)
}

function createBookUiCard(book){
    const bookCard = document.createElement('div');
    bookCard.classList = "book-card";
    bookCard.id = book.title
    bookCard.appendChild(document.createElement('h3')).textContent = "Book"
    bookCard.appendChild(document.createElement('p')).textContent = book.title
    bookCard.appendChild(document.createElement('p')).textContent = book.author
    bookCard.appendChild(document.createElement('p')).textContent = book.pages
    bookCard.appendChild(document.createElement('button')).textContent = "toggle"
    bookCard.appendChild(document.createElement('button')).textContent = "remove"
    return bookCard
}

function createBookObject(){
    let title = document.getElementById('form-title').value
    let author = document.getElementById('form-author').value
    let pages = document.getElementById('form-pages').value        
    let read = document.getElementById('form-read-checkbox').checked
    const book = new Book (title, author, pages, read)
    return book
}











/* HELPER FUNCTIONS */

function checkForDuplicateTitle(title){
    return library.bookDatabase.some(el =>el.title === title)
}

function displayBookForm(){
    // for styling, make form stand out 
    turnOnBackgroundOpacity()
    form.style.display = "block"
}

function turnOnBackgroundOpacity(){
    mainBackground.style.opacity = ".3"
}

function addBookToDatabase(book){
    library.bookDatabase.push(book)
}

function resetLibraryUI(){
    libraryGrid.innerHTML = ""
}


function hideForm(){
    resetFormData()
    turnOffMainOpacity()
    hideFormCard()
}

function resetFormData(){
    // reset form data
   document.getElementById('form-title').value = ""     
   document.getElementById('form-author').value = ""     
   document.getElementById('form-pages').value = ""     
   document.getElementById('form-read-checkbox').checked = false
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

