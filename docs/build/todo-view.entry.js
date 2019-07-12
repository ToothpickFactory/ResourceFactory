import { r as registerInstance, h } from './chunk-8cd65796.js';
import { T as Todo } from './chunk-21629fd8.js';

class AppHome {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.todos = [];
    }
    componentWillLoad() {
        this.unsubscribe = Todo.subscribe((todos) => this.todos = todos);
    }
    render() {
        return (h("div", { class: 'todo-view' }, h("ul", null, this.todos.map(todo => h("li", null, todo.text, h("button", { onClick: () => Todo.remove(todo) }, "X")))), h("button", { onClick: () => this.unsubscribe() }, "Unsubscribe")));
    }
    static get style() { return ""; }
}

export { AppHome as todo_view };
