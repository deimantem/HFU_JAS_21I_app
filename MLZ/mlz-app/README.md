# HFU_JAS_21I_app

This is the app built for the Javascript MLZ project.

## Installation

- Open a terminal
- Execute `npm install` to install all packages

## Run

- Open a terminal in this folder
- Execute `npm run start:server` to start the the JSON Server
- Execute `npm run start:app` to start the the React application


Manual tests I performed:

### Creating a Todo:
Scenario 1: Created a new todo with a title.
Expected Result: Todo is successfully created and displayed in the todo list.
Scenario 2: Tried to create a todo without a title.
Expected Result: Application should display a required error, indicating that a title is necessary for creating a todo.

### Deletion of Todo:
Scenario 1: Deleted a todo from the todo list.
Expected Result: The selected todo should be successfully deleted, and the todo list should be updated accordingly.

### Editing Todo:
Scenario 1: Edited the details of an existing todoby changing date, isCompleted, or description.
Expected Result: The changes to the todo should be successfully updated, and the todo list should reflect the modifications.

### Searching for Todo:
Scenario 1: Performed a search for an existing todo.
Expected Result: The todo list should be filtered to display only the matching todos, and the searched term may be highlighted in the titles.
Scenario 2: Cleared the search term.
Expected Result: The full list of todos should be shown without any highlighting.

### Creating Test Todos:
Scenario 1: Created test todos to populate the application by clicking 'create test todo' button multiple times.
Expected Result: The application should be populated with test todos, and they should be visible in the todo list. deletion, editing of these items should be possible too.
