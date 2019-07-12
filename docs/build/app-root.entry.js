import { r as registerInstance, h } from './chunk-8cd65796.js';
import { T as Todo } from './chunk-21629fd8.js';

class AppRoot {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.todoViews = [];
        this.subscriberCount = 0;
    }
    componentWillLoad() {
        Todo.subscribe(() => this.subscriberCount = Todo.subs.length);
    }
    addTodoView() {
        this.todoViews = [...this.todoViews, h("todo-view", null)];
    }
    addTodo(e) {
        e.preventDefault();
        const newTodo = e.target.children.todo.value;
        Todo.create(newTodo);
        e.target.reset();
    }
    render() {
        return [
            h("header", null, h("h1", null, "Resource Factory Test")),
            h("aside", null, h("button", { onClick: () => this.addTodoView() }, "Create New Todo View"), h("form", { onSubmit: (e) => this.addTodo(e) }, h("h4", null, "Create new TODO"), h("input", { type: "text", name: "todo" }), h("button", { type: "submit" }, "+"))),
            h("main", null, this.todoViews)
        ];
    }
    static get style() { return "app-root {\n  display: grid;\n  grid-template-columns: 200px auto;\n  grid-template-rows: 50px auto;\n  height: 100%;\n}\n\napp-root header {\n  grid-column: span 2;\n  background: orange;\n}\n\napp-root header h1{\n  margin: 0;\n}\n\napp-root aside {\n  background: blue;\n  -ms-flex-align: center;\n  align-items: center;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n\napp-root header h1{\n  grid-column-start: 1;\n  grid-column-end: 3;\n}\n\napp-root header h4{\n  -ms-flex-item-align: center;\n  align-self: center;\n}\n\napp-root header button{\n  -ms-flex-item-align: center;\n  align-self: center;\n}\n\napp-root main {\n  width: 100%;\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n}"; }
}

export { AppRoot as app_root };
