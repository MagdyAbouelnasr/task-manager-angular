import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, combineLatest, map } from 'rxjs';
import { ListService } from 'src/app/services/list-task-service.service';
import { TaskList } from 'src/app/shared/models/list-task.model';
import { FilterEnum } from 'src/app/shared/types/filter.enum';
import { merge, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {
  list: TaskList[] = [];
  newList!: string;

  visibleLists$!: Observable<TaskList[]>;
  noTodoClass$: Observable<boolean>;
  editingId: string | null = null;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  visibleListsLength: number = 0;

  pageSlice$!: Observable<TaskList[]>


  constructor(public listService: ListService){

    this.listService.Lists$.subscribe((lists) => {
      this.visibleListsLength = lists.length;
    });


    this.noTodoClass$ = this.listService.Lists$.pipe(map((Lists=> Lists.length === 0)))

    this.visibleLists$ = combineLatest(
      this.listService.Lists$, this.listService.filter$, this.listService.queryList$
      ).pipe(map(([lists, filter, queryList]: [TaskList[], FilterEnum, TaskList[]])=>{
        if(filter === FilterEnum.active){
          return lists.filter(list => !list.is_complete)
        }else if ( filter === FilterEnum.completed){
          return lists.filter(list => list.is_complete )
        }
        else
          return lists;
      }) ) //combine latest combines streams

      this.visibleLists$ = combineLatest(
        this.visibleLists$,
        this.listService.queryList$
      ).pipe(
        map(([lists, queryList]: [TaskList[], TaskList[]]) => {
          if (queryList.length !== 0) {
            return queryList;
          } else {
            return lists;
          }
        })
      );


        this.pageSlice$ = this.visibleLists$.pipe(
          switchMap((data) => {
            const slicedData = data.slice(0, 3); // Take the first three elements
            return of(slicedData);
          })
        );


  }

  setEditingId(edetingId: string | null):void{
      this.editingId = edetingId
  }

  onPageChange(event : PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.visibleListsLength)
      endIndex = this.visibleListsLength

      this.pageSlice$ = this.visibleLists$.pipe(
        switchMap((data) => {
          const slicedData = data.slice(startIndex, endIndex);
          return of(slicedData);
        })
      );
  }
}
