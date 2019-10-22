# Progressive Todo App (Microsoft Todos clone) 
>Todo app developed with React and Firebase, based on Microsoft todos.

## Demo
<img src="todoapp.png" width="100%">

## Features
* Firebase realtime database used for data persistance in the app
* Google OAuth for user sign up and succesive logins, session managed using local storage.
* Able to create and delete lists as well as individual Todos
* Search functionality for finding text within todos and navigating to the apropriate list

## Tools
* React 
* Redux, React-redux
* React-Router-Dom
* Firebase
* AntDesign
* Styled-Components

## Usage
To run the application locally; clone the repo install dependencies and sign up for Firebase + enable Google O-Auth
> NB the firebase config variables should be stored in and .env file.

```
$ git clone https://github.com/omarb147/ProgressiveTodoApp
$ cd fire-todos
$ npm install && npm start
```


## Improvements
I named this Repo iprogressive todo app as I intend to add more features as I go along, I want to first get the core features which appear in the Microsoft todo app implemented, which are the following:

* Edit pane for individual todos where you can add
  * Extra Steps (mini todo list within a todo) 
  * Due Date 
  * Extra comments
  * Move to another list
* More logon options
* Sort List by different filters
* Automatically update Due date list once due date has been set
* Notifications when upcoming todos are due and warning when overdue

### Other features and elements to add 

* Login with other OAuth providers and Email + Password
* Unit Tests 
* Homepage content


