const express = require("express");
const bodyParser = require('body-parser')
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const config = require("./config/webpack.config.js");

var app = express();
app.use(bodyParser.json());

var compiler = webpack(config);

// Use the express app to serve both the bundled frontend assets
// (through webpack middleware) and APIs.

// Serve the bundled assets
app.use(webpackMiddleware(compiler, {
  noInfo: true,
  lazy: true
}));

// Store the to-dos in memory
var todoId = 0;
var todos = [];

// Serve the backend APIs
app.get("/api/todos", function (req, res) {
  res.json({ todos: todos });
});

app.post("/api/todos", function (req, res) {
  var newTodo = {
    id: todoId.toString(),
    title: req.body.title,
    content: req.body.content
  };
  
  todoId ++;
  todos.push(newTodo);
  console.log("New to-do item:", newTodo);
  res.json({ todos: todos });
});

app.delete("/api/todo/:todo_id", function (req, res) {
  for (var i = 0; i < todos.length; i ++) {
    if (todos[i].id === req.params.todo_id) {
      todos.splice(i, 1);
      break;
    }
  }
  res.end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});