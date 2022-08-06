const addBookButton = document.getElementById("add-book-button")
const libraryGrid = document.querySelector(".library-grid-container-wrapper")
const form = document.getElementById("form-template")
const formCancelButton = document.getElementById('form-cancel-button')
const main = document.getElementById('main')
const totalBooks = document.getElementById('total-books')
const totalReadBooks = document.getElementById('total-read-books')
const totalUnReadBooks = document.getElementById('total-unread-books')






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

    const newBookCard = document.createElement('div');
    newBookCard.classList = "book-card";
    newBookCard.dataset = "data-index-number"
    newBookCard.dataset.indexNumber = brain.bookArray.length
    newBookCard.appendChild(document.createElement('h3')).textContent = "Book"
    newBookCard.appendChild(document.createElement('p')).textContent = book.title
    newBookCard.appendChild(document.createElement('p')).textContent = book.author
    newBookCard.appendChild(document.createElement('p')).textContent = book.pages

    let readButton = newBookCard.appendChild(document.createElement('button'))
    readButton.textContent = readStatus(book)
     // add ID for styling and for button access
    readButton.setAttribute('id','read-button')

    let removeButton = newBookCard.appendChild(document.createElement('button'))
    removeButton.textContent = "Remove"
    // add ID for styling and for button access
    removeButton.setAttribute('id','remove-button')


// add event listeners to read/unread button
readButton.addEventListener('click', event => {
    toggleRead(event)
})

// add event listeners to remove button
removeButton.addEventListener('click', event => {
    deleteBookFromLibrary(event)
})


addToLibrary(newBookCard, book)
}


function deleteBookFromLibrary(event){
// get the index of the card 
const cardNumber = (event.target.parentElement.dataset.indexNumber)
// retrieve the book from the brain array
let book = brain.bookArray[cardNumber]
// create a nodelist of book-cards
const bookList = document.querySelectorAll('.book-card')
//traverse the bookList and find book with matching cardNumber
bookList.forEach(element => {
    if (element.getAttribute("data-index-number") === cardNumber){
        // remove that element from the DOM
        libraryGrid.removeChild(element)
    }
})
// remove the book from the brain array
brain.bookArray.pop(book);

updateStats()

console.log(libraryGrid)
console.log(brain.bookArray)




}




function toggleRead(event){
    // get the index of the card 
    const cardNumber = (event.target.parentElement.dataset.indexNumber)
    // retrieve the book from the brain array
    let book = brain.bookArray[cardNumber]
    // update the read status in the book object
    if (!getReadStatus(book)){
        book.read = true;
    }else if (getReadStatus(book)) {
        book.read = false;
    }
    // update the button label with the current status
    event.target.textContent = readStatus(book)
    updateStats()
}


function addToLibrary(newBookCard,book){
    // add the book card to the grid
    libraryGrid.appendChild(newBookCard)
    // add the book object to the array
    brain.bookArray.push(book)
    updateStats()
}

function updateStats(){
    // display the total books
    totalBooks.textContent = brain.bookArray.length
    // display the total read books
    totalReadBooks.textContent = getTotalRead()
    // display the total read books
    totalUnReadBooks.textContent = getTotalUnRead()
}

function getTotalRead(){
    let totalRead = 0

    brain.bookArray.forEach(book =>{
        if (book.read === true){
            totalRead += 1
        }
    })
    return totalRead
}

function getTotalUnRead(){
    let totalUnRead = 0
    brain.bookArray.forEach(book =>{
        if (book.read === false){
            totalUnRead += 1
        }
    })
    return totalUnRead
}


function readStatus(book){
    if (book.read === true){
        return "Read"
    } 
    return "Unread"
}

function getReadStatus(book){
    return book.read
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
    resetFormData()
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
