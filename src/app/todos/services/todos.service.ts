import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '@todos/models';
import { Observable, of } from 'rxjs';

@Injectable()
export class TodosService {

  constructor(
    @Inject('API_URL') private apiUrl: string
  ) {
  }

  getAllTodos(): Observable<Todo[]> {
    let todoData;
    if(localStorage.getItem('todoData')){
      todoData = JSON.parse(localStorage.getItem('todoData'))
    }else{
      todoData = [];
    }
    return of(todoData);
  }

  createTodo(todo: Todo): Observable<Todo> {
    if(!localStorage.getItem('todoData')){
      localStorage.setItem('todoData',JSON.stringify([]));
    }
    let todoData = JSON.parse(localStorage.getItem('todoData'))
    todoData.push(todo);
    localStorage.setItem('todoData',JSON.stringify(todoData));
    
    return of(todo);
  }

  updateTodo(todo: Partial<Todo>): Observable<Todo> {
    let todoData = JSON.parse(localStorage.getItem('todoData'))

    var foundIndex = todoData.findIndex(x => x.id == todo.id);
    if(todo.title)
      todoData[foundIndex].title = todo.title;
    if(todo.completed == true || todo.completed == false)
      todoData[foundIndex].completed = todo.completed;
    localStorage.setItem('todoData',JSON.stringify(todoData));
    return of(todoData);
  }

  deleteTodo(id: number): Observable<Todo> {
    let todoData = JSON.parse(localStorage.getItem('todoData'))

    const indexOfObject = todoData.findIndex(object => {
      return object.id === id;
    });

    let deletedData = todoData[indexOfObject];
    
    todoData.splice(indexOfObject, 1);
    localStorage.setItem('todoData',JSON.stringify(todoData));
    return of(deletedData);
  }

}
