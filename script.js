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

formCancelButton.addEventListener('click', hideForm)

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
    // helper function, pushes book object onto the array
    addBookToDatabase(book)
    // update the UI with current library listing 
    updateBookLibraryUI()     
}
})


function updateBookLibraryUI(){
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
     updateStats()
}

function createBookUiCard(book){
    const bookCard = document.createElement('div');
    bookCard.classList = "book-card";
    bookCard.id = book.title
    bookCard.appendChild(document.createElement('h3')).textContent = "Book"
    bookCard.appendChild(document.createElement('p')).textContent = book.title
    bookCard.appendChild(document.createElement('p')).textContent = book.author
    bookCard.appendChild(document.createElement('p')).textContent = book.pages
    // create the buttons on the card
    // Add all needed button functionality / styling
    const bookCardReadButton =  bookCard.appendChild(document.createElement('button'))
    createBookCardReadButton(bookCardReadButton, book)
    const bookCardRemoveButton = bookCard.appendChild(document.createElement('button'))
    createBookCardRemoveButton(bookCardRemoveButton)
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
function createBookCardRemoveButton(bookCardRemoveButton){
    // add the style class
    bookCardRemoveButton.id = "remove-button"
    // add label
    bookCardRemoveButton.textContent = "Remove"
    // add event listener
    bookCardRemoveButton.addEventListener('click', event =>{
        removeBookFromLibrary(event)
    })
    }

function removeBookFromLibrary(event){
    // remove the book card from the UI library
    removeBookCardFromUI(event.target.parentElement)
    // remove the book from the database
    removeBookFromLibraryDatabase(event.target.parentElement.id)
    // update the stats
    updateStats()
}

function removeBookFromLibraryDatabase(title){
    // Get the index of the object with the title to remove
    // Pass that index into the splice function, remove that item
    library.bookDatabase.splice(library.bookDatabase.findIndex(item => item.title === title), 1)
}

function removeBookCardFromUI(bookCard){
    // traverse the dom and remove the card with matching id
    // remove the space from the bookCard.id string
    const arrayOfUIBooks = Array.from(document.querySelectorAll('.book-card')) 
    arrayOfUIBooks.forEach(element =>{
        if (element.id === bookCard.id){
            libraryGrid.removeChild(element)
        }
    })
}
    
function createBookCardReadButton(bookCardReadButton, book){
     // add the style class
    bookCardReadButton.id = "read-button"
    // add label with correct read status
    bookCardReadButton.textContent = isRead(book)
    // add event listener so it will change when user clicks
    bookCardReadButton.addEventListener('click', e => {
        bookCardReadButton.textContent = invertIsReadButton(bookCardReadButton)
        updateBookIsReadStatus(e)
        updateStats()
    })
}

function updateBookIsReadStatus(e){
    // get and save the id of the current bookCard
    const bookCardID = e.target.parentElement.id // id of book card, ie title
    updateIsReadStatusInBookDatabase(bookCardID)
}

function updateIsReadStatusInBookDatabase(bookCardID){
    
    const index = library.bookDatabase.findIndex(element => element.title === bookCardID)

    if ( library.bookDatabase[index].isRead === true){
        library.bookDatabase[index].isRead = false
    }else {
        library.bookDatabase[index].isRead = true
    }
}

function invertIsReadButton(bookCardReadButton){
    if (bookCardReadButton.textContent === "Read"){
        return "Unread"
    }else {
        return "Read"
    }
}

function isRead(book){
    if (book.isRead === true){
        return "Read"
    }else if (book.isRead === false) {
        return "Unread"
    } 
}

function checkForDuplicateTitle(title){
    return library.bookDatabase.some(el =>el.title === title)
}

function displayBookForm(){
    // for styling, make form stand out 
    turnOnBackgroundOpacity()
    // Disable pointer events on the add book button
    disableAddBookButton()
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
    // Reset any data that was entered
    resetFormData()
    // reset site opacity
    turnOffMainOpacity()
    // Remove the form from DOM
    hideFormCard()
    // Enable add book button
    enableAddBookButton()
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


function updateStats(){
    totalBooks.textContent = library.bookDatabase.length
    totalReadBooks.textContent =  getTotalReadBooks()
    totalUnReadBooks.textContent =  getTotalUnreadBooks()
}

function getTotalReadBooks(){
   
    let total = 0
    library.bookDatabase.forEach(book => {
        if (book.isRead === true){
            total += 1
        }
    })
    return total
}

function getTotalUnreadBooks(){
    let total = 0
    library.bookDatabase.forEach(book => {
        if (book.isRead === false){
            total += 1
        }
    })
    return total
}

function disableAddBookButton(){
    addBookButton.style.pointerEvents = 'none'
}

function enableAddBookButton(){
    addBookButton.style.pointerEvents = 'auto'
}
