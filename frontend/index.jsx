import React, {Component} from "react";
import ReactDOM from "react-dom";
import request from "superagent";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      todos: [],
      newTodoTitle: "",
      newTodoContent: ""
    };
  }
  
  componentDidMount() {
    this.loadTodos();
  }
  
  loadTodos() {
    // Call the backend API to get the latest to-do items
    request.get("/api/todos").end((err, res) => {
      this.setState({ todos: res.body.todos });
    });
  }
  
  onNewTodo() {
    // Call the backend API to create a new to-do item
    var todo = {
      title: this.state.newTodoTitle,
      content: this.state.newTodoContent
    };
    request.post("/api/todos").send(todo).end((err, res) => {
      this.setState({ todos: res.body.todos });
    });
    
    this.setState({
      newTodoTitle: "",
      newTodoContent: ""
    });
  }
  
  onDeleteTodo(todoId) {
    // Call the backend API to delete a to-do item
    request.delete("/api/todo/" + todoId).end((err, res) => {
      this.loadTodos();
    });
  }
  
  render() {
    var todos = null;
    if (this.state.todos.length > 0) {
      todos = this.state.todos.map((todo) => {
        return (
          <li className="todo" key={todo.id}>
            <b>{todo.title}</b>
            <p>{todo.content}</p>
            <button onClick={this.onDeleteTodo.bind(this, todo.id)}>
              Delete
            </button>
          </li>
        );
      });
      todos = (<ul>{todos}</ul>);
    } else {
      todos = (
        <h2>Nothing to do right now. Take a break☀️</h2>
      );
    }
        
    return (
      <div>
        <h1>Hi!</h1>
        <p>
          This is a simple to-do app built with <a href="https://postverta.com">Postverta</a>
        </p>
        {todos}
        <h2>Add more stuff</h2>
        <span>Title</span>
        <input type="text" value={this.state.newTodoTitle}
               placeholder="Buy milk"
               onChange={(evt) => {this.setState({newTodoTitle: evt.target.value})}}/>
        <br/>
        <span>Content</span>
        <textarea value={this.state.newTodoContent}
                  placeholder="Buy two cartons of 2% fat milk from Safeway"
                  onChange={(evt) => {this.setState({newTodoContent: evt.target.value})}}/>
        <button onClick={this.onNewTodo.bind(this)}>
          Add
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));