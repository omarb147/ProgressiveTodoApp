import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const prodConfig = {
  apiKey: process.env.FIREBASE_DEV_APIKEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://fir-todos-60fd4.firebaseio.com",
  projectId: process.env.FIREBASE_DEVE_PROJECT_ID
};

const config = process.env.NODE_ENV === "production" ? prodConfig : prodConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
  }

  todos = () => this.db.ref("/todos");
  lists = () => this.db.ref("/lists");

  selectTodo = todoId => this.db.ref(`/todos/${todoId}`);
  selectedList = selectedList => this.db.ref(`/lists/${selectedList}`);

  addTodo = (listId, title) => {
    const todo = { title, completed: false, lists: { [listId]: true } };
    this.db
      .ref("/todos")
      .push(todo)
      .then(newEntry => this.db.ref(`/lists/${listId}/todos/${newEntry.key}`).set(true));
  };

  addList = name => {
    const list = { name };
    this.db.ref("/lists").push(list);
  };

  editTodo = (id, data) => this.db.ref(`/todos/${id}`).update(data);
}

export default Firebase;
