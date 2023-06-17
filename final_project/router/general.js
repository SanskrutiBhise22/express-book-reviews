const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  if(isValid(req.body.username)){
    return res.status(400).json({message: "Error: Username already exists!"});
  }
  else
  {
    let user = {
      username: req.body.username,
      password: req.body.password
    }
    users.push({"username":username,"password":password});
    return res.status(200).json({message: "Registration successful!"});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,3))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn=req.params.isbn;
  res.send(books[isbn])
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author=req.body.author;
  let booksByAuthor = books.filter((book)=>{
      book.author===author
  });
  if(booksByAuthor.length>0){
    return res.status(200).json({message: "Books by author "+author, books: booksByAuthor});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  title=req.body.title;
  let booksByTitle = books.filter((book)=>{
      book.title===title
  });
  if(booksByTitle.length>0){
    return res.status(200).json({message: "Books by title "+title, books: booksByTitle}); 
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn=req.params.isbn;
  res.send(JSON.stringify(books[isbn].reviews))
});

let url="http://localhost:3000/";
const getBookDetails=async(url)=>{
      let resp = await axios.get(url);
      let books = resp.data;
      books.map((book)=>{
        console.log(book[isbn]);
        console.log(book[isbn].author);
        console.log(book[isbn].title);
        console.log(book[isbn].reviews);
      });
}
url="http://localhost:3000/isbn/?isbn=";
const getBookDetailsByISBN=async(url,isbn)=>{
      let resp = await axios.get(url+isbn);
      let book = resp.data;
      console.log(book[isbn]);
}

url="http://localhost:3000/author/?author=";
const getBookDetailsByAuthor=async(url,author)=>{
      let resp = await axios.get(url+author);
      let books = resp.data;
      books.map((book)=>{
        console.log(book[isbn]);
        console.log(book[isbn].author);
        console.log(book[isbn].title);
        console.log(book[isbn].reviews);
      });
}

url="http://localhost:3000/title/?title=";
const getBookDetailsByTitle=async(url,title)=>{
      let resp = await axios.get(url+title);
      let books = resp.data;  
      books.map((book)=>{
        console.log(book[isbn]);
        console.log(book[isbn].author);
        console.log(book[isbn].title);
        console.log(book[isbn].reviews);
      });
}

module.exports.general = public_users;

