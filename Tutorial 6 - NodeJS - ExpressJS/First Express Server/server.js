const express = require('express');

const app = express();

const port = 8000;

//RootPage, Callback function
app.get('/', (req, res) => {
  res.send('Hello World!'); //Here you retrun index.html
})

app.get('/contact', (req, res) => {
  res.send('Contact me at: victorvdka@gmail.com!'); //Here you retrun index.html
})

app.get('/about', (req, res) => {
  res.send('I am Victor bla bla bla'); //Here you retrun index.html
})

app.get('/hobbies', (req, res) => {
  res.send('I love programming!'); //Here you retrun index.html
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})