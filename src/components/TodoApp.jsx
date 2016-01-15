import React, { Component } from 'react';
import TodoList from './TodoList.jsx';

const TodoApp = React.createClass({
    getInitialState: function () {
        return { items: [ ], text: '' };
    },
    componentDidMount: function () {
        const component = this;
        const db = this.props.db;

        db.allDocs({ include_docs: true }).then(function (result) {
            if (component.isMounted() && result.rows.length) {
                component.setState({
                    items: result.rows.map(function (row) {
                        return {
                            id: row.id,
                            text: row.doc.text
                        };
                    })
                })
            }
        });

        db
        .changes({
            include_docs: true,
            live: true,
            since: 'now'
        })
        .on('change', function (change) {
            component.setState({
                items: [ 
                    ...component.state.items, 
                    { id: change.id, text: change.doc.text }
                ]
            });
        });
    },
    onChange: function (e) {
        this.setState({ text: e.target.value });
    },
    handleSubmit: function (e) {
        const id = Date.now().toString();
        const text = this.state.text;

        if (text) {
            this.props.db.put({ _id: id, text: text });

            this.setState({ text: '' });
        }

        e.preventDefault();
    },
    render: function () {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.text} />
                    <button>{'Add #' + (this.state.items.length + 1)}</button>
                </form>
            </div>
        );
    }
});

export default TodoApp;
