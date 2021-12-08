import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {TodoItem} from '../models/todoItem'

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  todoItems = new Subject<TodoItem[]>();

  constructor(private http: HttpClient) { }

  getItem(){
    //return this.http.get();
  }

  getItemUpdateListener(){
    return this.todoItems.asObservable();
  }

  addItem(todoItem: TodoItem) {
    this.todoItems.next([todoItem]);
    console.log(this.todoItems);
  }

  removeItem(id: any){

  }

  editItem(id: any, todoItem: TodoItem){

  }
}
