"use strict";

const tableBody = document.getElementById("table-data");
const addBookBtn = document.getElementById("add-book-btn");
const form = document.querySelector("form");
const formSubmit = document.getElementById("form-submit");
const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPages = document.getElementById("pages");
const formRead = document.getElementById("read");
const formCancel = document.getElementById("form-cancel");

const myLibrary = [];

const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
};

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const addBookToLibrary = function (title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
};

//seed data
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary(
  "Harry Potter and the Sorcerer's Stone",
  "J.K. Rowling",
  309,
  false
);
addBookToLibrary("Dune", "Frank Herbert", 412, true);

const displayBooks = function () {
  //clear table to repopulate data
  tableBody.innerHTML = "";

  //populate table elements per book
  myLibrary.forEach((book) => {
    const tr = document.createElement("tr");
    const thTitle = document.createElement("th");
    thTitle.innerText = book.title;
    const tdAuthor = document.createElement("td");
    tdAuthor.innerText = book.author;
    const tdPages = document.createElement("td");
    tdPages.innerText = book.pages;
    const tdRead = document.createElement("td");
    tdRead.innerHTML = `
        <select name="read" class="read-btn" data-id="${book.id}">
          <option ${book.read ? "selected" : ""} value="true">Yes</option>
          <option ${book.read ? "" : "selected"} value="false">No</option>
        </select>
    `;

    //populate delete button per book
    const tdDelete = document.createElement("td");
    tdDelete.innerHTML = `<button data-id=${book.id} class="delete-btn" type='button'>X</button>`;

    tableBody.appendChild(tr);
    tr.appendChild(thTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdPages);
    tr.appendChild(tdRead);
    tr.appendChild(tdDelete);
  });

  const deleteBtns = document.querySelectorAll(".delete-btn");
  const readDropDowns = document.querySelectorAll(".read-btn");

  deleteBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const bookDelete = myLibrary.findIndex(
        (book) => book.id === button.dataset.id
      );
      myLibrary.splice(bookDelete, 1);
      displayBooks();
    });
  });

  readDropDowns.forEach((dropDown) => {
    dropDown.addEventListener("change", function () {
      const updateBook = myLibrary.findIndex(
        (book) => book.id === dropDown.dataset.id
      );
      myLibrary[updateBook].toggleRead();
      displayBooks();
    });
  });
};

addBookBtn.addEventListener("click", function () {
  form.classList.toggle("hidden");
  addBookBtn.classList.toggle("hidden");
});

formSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  addBookToLibrary(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    //convert the string to bool
    formRead.value === "true" ? true : false
  );

  form.classList.toggle("hidden");
  addBookBtn.classList.toggle("hidden");

  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  formRead.value = "";

  displayBooks();
});

formCancel.addEventListener("click", function () {
  form.classList.toggle("hidden");
  addBookBtn.classList.toggle("hidden");

  formTitle.value = "";
  formAuthor.value = "";
  formPages.value = "";
  formRead.value = "";
});

//on first load
displayBooks();
