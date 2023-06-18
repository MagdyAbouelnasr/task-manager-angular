import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, map, of } from 'rxjs';
import { FilterEnum } from '../shared/types/filter.enum';
import { TaskList } from '../shared/models/list-task.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ListService{
  // behavorial subject -> some entity where inside we can set some default value // stream
  Lists$ = new BehaviorSubject<TaskList[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);
  queryList$ = new BehaviorSubject<TaskList[]>([]);

  constructor(private localStorageService: LocalStorageService) {
    // Initialize Lists$ with the data from local storage
    const storedLists = this.localStorageService.getLists();
    if (storedLists) {
      this.Lists$.next(storedLists);
    }
  }


  addTodo(text: string): void{
    const newList: TaskList = {
      id: Math.random().toString(16),
      name: text,
      is_complete: false,
      description: ''
    }

    const updatedLists = [...this.Lists$.getValue() , newList]
    this.updateListsAndLocalStorage(updatedLists);

  }

  // toggleAll(is_complete: boolean): void{
  //   const updatedLists= this.Lists$.getValue().map(List=>{
  //     return {
  //       ...List,
  //       is_complete
  //     }
  //   })
  //   this.Lists$.next(updatedLists)
  // }

  changeFilter(filterName: FilterEnum): void{
    this.filter$.next(filterName)
  }

  SearchQueryList(search: string = ''): Observable<TaskList[]> {
    // if (search === '') {
    //   return this.Lists$; // Return the original Lists$ BehaviorSubject
    // } else {
      const filteredLists = this.Lists$.getValue().filter(list => list.name.includes(search));
      if (filteredLists.length === 0) {
        return EMPTY; // Return an empty observable if no matching lists are found
      } else {
        return of(filteredLists);
      // }
    }
  }



  changeTodo(id: string, text: string): void{
    const updatedLists = this.Lists$.getValue().map(List=>{
     if(List.id === id){
        return{
          ...List,
          name: text,
        }
     }
     return List
    })
      this.updateListsAndLocalStorage(updatedLists);

  }

  changeTodoDescription(id: string, text: string): void{
    const updatedLists = this.Lists$.getValue().map(List=>{
     if(List.id === id){
        return{
          ...List,
          description: text,
        }
     }
     return List
    })
    this.updateListsAndLocalStorage(updatedLists);

  }

  removeTodo(id: string): void{
      const updatedLists = this.Lists$.getValue().filter(List => List.id != id);

      this.updateListsAndLocalStorage(updatedLists);

  }

  toggleTodo(id:string): void{
    const updatedLists = this.Lists$.getValue().map(List=>{
     if(List.id === id){
       return {
        ...List,
        is_complete: !List.is_complete
       }
      }
      return List
    })
    this.updateListsAndLocalStorage(updatedLists);

  }


   updateListsAndLocalStorage(updatedLists: TaskList[]): void {
    this.Lists$.next(updatedLists);
    this.localStorageService.setLists(updatedLists);
  }
}
