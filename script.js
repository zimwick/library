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

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  //clear table to repopulate data
  tableBody.innerHTML = "";

  myLibrary.forEach((book) => {
    const tr = document.createElement("tr");
    const thTitle = document.createElement("th");
    thTitle.innerText = book.title;
    const tdAuthor = document.createElement("td");
    tdAuthor.innerText = book.author;
    const tdPages = document.createElement("td");
    tdPages.innerText = book.pages;
    const tdRead = document.createElement("td");
    tdRead.innerText = book.read;

    const tdDelete = document.createElement("td");
    tdDelete.innerHTML = `<button data-id=${book.id} class="delete-btn" type='button'>X</button>`;

    tableBody.appendChild(tr);
    tr.appendChild(thTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdPages);
    tr.appendChild(tdRead);
    tr.appendChild(tdDelete);
  });
}

addBookToLibrary("hello", "meh", 1234, true);

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
    formRead.value
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

displayBooks();
