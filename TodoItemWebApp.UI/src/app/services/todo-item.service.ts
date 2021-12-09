import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {TodoItem} from '../models/todoItem';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private items: TodoItem[] = [];
  todoItems = new Subject<TodoItem[]>();

  constructor(private http: HttpClient) { }

  getItem(){
    this.http.get<any>('/api/v1/todoitem').pipe(map(result =>{
      return {
        todos: result.value.map(todoData => {
          return {
              id: todoData.Id,
              title: todoData.Title,
              description: todoData.Description,
              startSchedule: new Date(todoData.StartSchedule),
              endSchedule: new Date(todoData.EndSchedule),
              createdDate: todoData.CreatedDate,
              modifyDate: todoData.ModifyDate
          }
        })
      }
    })).subscribe(todoTransform => {
     this.items = todoTransform.todos;
     this.todoItems.next(this.items);
    })
  }

  getItemUpdateListener(){
    return this.todoItems.asObservable();
  }

  getTodoItemById(id: number | string) {
    return this.http.get<any>('/api/v1/todoitem?$filter=Id eq '+id);
  }

  addItem(todoItem: TodoItem) {
    this.http.post<TodoItem>('/api/v1/todoitem',todoItem).subscribe(result =>{
      window.location.reload();
    });
  }

  removeItem(id: any){
    return this.http.delete('/api/v1/todoitem/'+id).subscribe(result => {
      window.location.reload();
    });
  }

  editItem(id: any, todoItem: TodoItem){
    return this.http.patch('/api/v1/todoitem/'+id, todoItem).subscribe(result => {
      window.location.reload();
    });
  }
}
