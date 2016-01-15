import React from 'react';
import { render } from 'react-dom';
import PouchDB from 'pouchdb';
import TodoApp from './components/TodoApp.jsx';

// To use PouchDB-Fauxton Chrome Extension, window.PouchDB needs to be set
// TODO Can this be changed from window to global? Can this only be done when env === 'DEV'?
window.PouchDB = PouchDB;


const db = new PouchDB('todo');

render(
    <TodoApp db={db} />,
    document.getElementById('root')
);
