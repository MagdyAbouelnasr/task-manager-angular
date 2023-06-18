import { Injectable } from '@angular/core';
import { TaskList } from '../shared/models/list-task.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly localStorageKey = 'todoLists';

  getLists(): TaskList[] | null {
    const listsData = localStorage.getItem(this.localStorageKey);
    if (listsData) {
      return JSON.parse(listsData);
    }
    return null;
  }

  setLists(lists: TaskList[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(lists));
  }
}
