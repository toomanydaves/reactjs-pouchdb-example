import React, { Component } from 'react';

export default class TodoList extends Component {
    render () {
        const createItem = function (item) {
            return <li key={item.id}>{item.text}</li>;
        };

        return <ul>{this.props.items.map(createItem)}</ul>;
    }
}
