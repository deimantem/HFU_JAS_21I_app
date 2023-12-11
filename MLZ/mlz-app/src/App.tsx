import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import TodoDetail from "./components/TodoDetail";
import EditTodoForm from "./components/EditTodoForm";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoList/>}/>
                <Route path="/todo/:id" element={<TodoDetail/>}/>
                <Route path="/create" element={<AddTodoForm/>}/>
                <Route path="/edit/:id" element={<EditTodoForm/>}/>
            </Routes>
        </Router>
    );
};

export default App;