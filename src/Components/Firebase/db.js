import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import gravatar from "gravatar";

const prodConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID
};

const config = process.env.NODE_ENV === "production" ? prodConfig : prodConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
    this.auth = app.auth();
    this.googleAuth = new app.auth.GoogleAuthProvider();
  }

  todos = uid => this.db.ref(`/todos/${uid}`);
  lists = uid => this.db.ref(`/lists/${uid}`);
  users = () => this.db.ref("/users");

  //** USER ACTIONS  ***//
  createUser = (uid, userDetails) => {
    this.db.ref(`/users/${uid}`).once("value", snapshot => {
      const user = snapshot.val();

      if (!user) {
        const favourites = { name: "favourites", icon: "star", owner: uid };
        const dueDate = { name: "Due Date", icon: "time", owner: uid };
        this.db.ref(`/lists/${uid}`).push(favourites);
        this.db.ref(`/lists/${uid}`).push(dueDate);
        this.db.ref(`/users/${uid}`).set({ ...userDetails });
      }
    });
  };

  //** AUTH ACTIONS  ***//
  onSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleAuth).then(async res => {
      const { uid, email, displayName, photoURL } = res.user;
      let avatar = photoURL;
      if (!avatar) avatar = await gravatar(email);
      const userDetails = { name: displayName, uid, avatar, email };

      this.createUser(uid, userDetails);
    });

  onSignOut = () => {};

  //** TODOs ACTIONS  ***//
  selectTodo = (uid, todoId) => this.db.ref(`/todos/${uid}/${todoId}`);
  list = (uid, selectedList) => this.db.ref(`/lists/${uid}/${selectedList}`);

  addTodo = (uid, listId, title) => {
    const todo = { title, completed: false, lists: { [listId]: true } };
    this.db
      .ref(`/todos/${uid}`)
      .push(todo)
      .then(newEntry => this.db.ref(`/lists/${uid}/${listId}/todos/${newEntry.key}`).set(true));
  };

  deleteTodo = (uid, todoId, listId) => {
    this.db.ref(`/todos/${uid}/${todoId}`).remove(() => {
      this.db.ref(`/lists/${uid}/${listId}/todos/${todoId}`).set(null);
    });
  };

  editTodo = (uid, id, data) => {
    this.db.ref(`/todos/${uid}/${id}`).update(data);
  };

  //** LIST ACTIONS  ***//

  addList = (uid, name) => {
    const list = { name };
    this.db.ref(`/lists/${uid}`).push(list);
  };

  deleteList = (uid, listId) => {
    this.db.ref(`/lists/${uid}/${listId}`).set(null, () => {
      this.db.ref(`/todos/${uid}`).once("value", snapshot => {
        const todos = snapshot.val();
        if (todos) {
          Object.keys(todos)
            .filter(key => todos[key].lists && todos[key].lists[listId])
            .forEach(key => this.db.ref(`/todos/${uid}/${key}/`).set(null));
        }
      });
    });
  };
}

export default Firebase;
