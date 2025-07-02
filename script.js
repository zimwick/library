"use strict";

const tableBody = document.getElementById("table-data");
const formToggle = document.getElementById("form-toggle");
const form = document.querySelector("form");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      read ? "read" : "not read yet"
    }`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach((book) => {
    const thTitle = document.createElement("th");
    thTitle.innerText = book.title;
    const tdAuthor = document.createElement("td");
    tdAuthor.innerText = book.author;
    const tdPages = document.createElement("td");
    tdPages.innerText = book.pages;
    const tdRead = document.createElement("td");
    tdRead.innerText = book.read;

    tableBody.appendChild(thTitle);
    tableBody.appendChild(tdAuthor);
    tableBody.appendChild(tdPages);
    tableBody.appendChild(tdRead);
  });
}

addBookToLibrary("hello", "meh", 1234, true);

displayBooks();

formToggle.addEventListener("click", function () {
  form.classList.toggle("hidden");
  formToggle.classList.toggle("hidden");
});
