import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ListService } from 'src/app/services/list-task-service.service';
import { FilterEnum } from 'src/app/shared/types/filter.enum';
@Component({
  selector: 'app-lists-footer',
  templateUrl: './lists-footer.component.html',
  styleUrls: ['./lists-footer.component.scss']
})
export class ListsFooterComponent {

  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>
  filter$: Observable<FilterEnum> 
  filterEnum = FilterEnum

  constructor(private ListService: ListService) {
    this.activeCount$ = this.ListService.Lists$.pipe(
      map((lists) => lists.filter((list) => !list.is_complete).length)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount)=> `item${activeCount != 1? 's' : ''} left`)
    )

    this.noTodosClass$ = this.ListService.Lists$.pipe(
      map((lists) => lists.length === 0)
    );

    this.filter$ = this.ListService.filter$
  }

  changeFilter(event: Event, filterName: FilterEnum):void {
    event.preventDefault();
    // this.ListService.filter$.next()
    this.ListService.changeFilter(filterName)
  }
}
