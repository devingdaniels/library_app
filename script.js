const addBookButton = document.getElementById("add-book-button")
const libraryGrid = document.querySelector(".library-grid-container-wrapper")



let brain = {
    bookArray: []
}


addBookButton.onclick = () => {
   showForm()

}

function showForm(){

    // dim the background
    const main = document.querySelector('.main-grid-layout')

    const form = document.createElement("form")
    form.style.position = "fixed"
    form.style.top = "50%"
    form.style.left = "50%"
    form.style.transform = "translate(-50%, -50%)"
    form.style.height = "400px";
    form.style.width = "400px";
    form.style.boxShadow = "2px 5px 12px rgb(80, 105, 228)"
    form.style.backgroundColor = "rgb(222, 224, 225)";


   
    main.appendChild(form)
    
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