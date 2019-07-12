import { Component, h, State } from '@stencil/core';
import { Todo } from '../../models/Todo/Todo';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @State() todoViews: any[] = [];
  @State() subscriberCount: number = 0;

  componentWillLoad(){
    Todo.subscribe(() => this.subscriberCount = Todo.subs.length);
  }

  public addTodoView(){
    this.todoViews = [...this.todoViews, <todo-view/>]
  }

  public addTodo (e) {
    e.preventDefault();
    const newTodo = e.target.children.todo.value;
    Todo.create(newTodo);
    e.target.reset();
  }

  render() {
    return [
        <header>
          <h1>Resource Factory Test</h1>
        </header>,
        <aside>
          <button onClick={() => this.addTodoView()}>Create New Todo View</button>
          <form onSubmit={(e) => this.addTodo(e)}>
            <h4>Create new TODO</h4>
            <input type="text" name="todo"/>
            <button type="submit">+</button>
          </form>
        </aside>,
        <main>
          {this.todoViews}
        </main>
    ]
  }
}
