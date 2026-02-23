const myLibrary = []

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numPages = pages;
    this.readStatus = read;
}

Book.prototype.toggleRead = function() {
    this.readStatus = !this.readStatus;
    clearBooks();
    displayBooks();
}

Book.prototype.removeItem = function() {
    const currId = this.id;
    for(let i=0; i<myLibrary.length; i++) {
        if(currId === myLibrary[i].id) {
            myLibrary.splice(i, 1);
        }
    }
    clearBooks();
    displayBooks();
}

function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);
    myLibrary.push(book);
    clearBooks();
    displayBooks();
}

function clearBooks() {
    let table = document.querySelector("table");
    let rowCount = table.rows.length;
    for(let i=rowCount-1; i>0; i--) {
        table.deleteRow(i);
    }
}

const form = document.getElementById("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pageCount").value;
    let readStatus = document.getElementById("read").checked;
    addBookToLibrary(title, author, pages, readStatus);
    clearForm();
    document.getElementById('my-dialog').close();
})

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pageCount").value = "";
    document.getElementById("read").checked = false;
    document.getElementById("unread").checked = false;
}


function displayBooks() {
    let table = document.querySelector("table");
    myLibrary.forEach((item) => {
        let row = table.insertRow();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();
        let cell4 = row.insertCell();
        let cell5 = row.insertCell();
        let cell6 = row.insertCell();
        // Display info
        cell1.textContent = item.title;
        cell2.textContent = item.author;
        cell3.textContent = item.numPages;
        cell4.textContent = item.readStatus ? "Read" : "Unread";
        // Add buttons
        let toggleRead = document.createElement('button');
        toggleRead.textContent = "toggle read status";
        toggleRead.onclick = (e) => {
            item.toggleRead();
        };
        cell5.appendChild(toggleRead);
        let removeBtn = document.createElement('button');
        removeBtn.textContent = "remove";
        removeBtn.onclick = (e) => {
            item.removeItem();
        }
        cell6.appendChild(removeBtn);
    });
}

addBookToLibrary("bob adventures","Isaac", 40, true);
addBookToLibrary("Robby adventures","John", 50, false);