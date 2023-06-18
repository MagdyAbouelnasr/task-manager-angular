import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AddEditPopupComponent } from '../add-edit-popup/add-edit-popup.component';
import { BehaviorSubject, Observable, concat, debounceTime, distinctUntilChanged, fromEvent, map, switchMap } from 'rxjs';
import { ListService } from 'src/app/services/list-task-service.service';
import { TaskList } from '../../models/list-task.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements AfterViewInit {


  @ViewChild('searchInput') input!: ElementRef

  constructor(private NgbModal: NgbModal,private listService: ListService){}

  ngAfterViewInit() {

  //  const filteredLists$ =
  fromEvent<any>(this.input.nativeElement, 'keyup')
  .pipe(
    map(event => event.target.value),
    debounceTime(400),
    distinctUntilChanged(),
    switchMap(search => this.listService.SearchQueryList(search))
  )
  .subscribe(queryList => {
    // Handle the updated query list here
    this.listService.queryList$.next(queryList);
    // console.log(queryList);
  });


  }


  AddEditPopup() {
			const modalRef = this.NgbModal.open(AddEditPopupComponent, { size: 'md' });
			// modalRef.componentInstance.HearingExceptional = this.HelperService.Clone<HearingsModels.HearingSummaryResModel>(row);
			// modalRef.componentInstance.Chambers = this.JudgeChambers;
			modalRef.result.then((savedRow) => {
				// if (row.id == 0) {
				// 	this.PagedRows.push(savedRow);
				// } else {
				// 	const index = this.PagedRows.findIndex((obj: HearingsModels.HearingSummaryResModel) => obj.id == row.id);
				// 	this.PagedRows[index] = savedRow;
				// }
				// this.GetPagedRows();

			}, () => { });
	}
}
