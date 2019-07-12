import { Component, h, State } from '@stencil/core';
import { Todo } from '../../models/Todo/Todo';

@Component({
  tag: 'todo-view',
  styleUrl: 'todo-view.css'
})
export class AppHome {
  @State() todos: Todo[] = [];
  private unsubscribe: Function;

  componentWillLoad(){
    this.unsubscribe = Todo.subscribe((todos: Todo[]) => this.todos = todos);
  }

  render() {
    return (
      <div class='todo-view'>
        <ul>
          {this.todos.map(todo =>
          <li>
            {todo.text}
            <button onClick={() => Todo.remove(todo)}>X</button>
          </li>)}
        </ul>
        <button onClick={() => this.unsubscribe()}>Unsubscribe</button>
      </div>
    );
  }
}
