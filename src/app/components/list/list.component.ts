import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ListService } from 'src/app/services/list-task-service.service';
import { TaskList } from 'src/app/shared/models/list-task.model';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { NgbOffcanvasConfig, NgbOffcanvas , OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [NgbOffcanvasConfig, NgbOffcanvas],
  
})
export class ListComponent {
  @Input('list') listProps!: TaskList;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();

  editingText: string = ''
  @ViewChild('textInput') textInput!: ElementRef




  constructor(private listService: ListService, public dialog: MatDialog){
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  ngOnInit(): void {
      this.editingText = this.listProps.name
  }

//   ngOnChanges(changes: SimpleChanges) {
//     console.log('changes', changes);
//     if (changes.isEditingProps.currentValue) {
//       setTimeout(() => {
//         this.textInput.nativeElement.focus();
//       }, 0);
//     }
//   }
// }

  setTodoInEditMode(){
    this.setEditingIdEvent.emit(this.listProps.id)
  }

  removeTodo():void{
      this.listService.removeTodo(this.listProps.id)
  }

  toggleTodo():void{
      this.listService.toggleTodo(this.listProps.id)
  }

  changeText(event: Event): void{
      const value = (event.target as HTMLInputElement).value;
      this.editingText = value
  }

  changeTodo():void{
    this.listService.changeTodo(this.listProps.id, this.editingText)
    this.setEditingIdEvent.emit(null); //close editing mode
  }
  abortChangeTodo() {
    this.editingText = this.listProps.name
    this.setEditingIdEvent.emit(null);
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration:  '300ms',
      data: {
        title: 'Task',
        message: 'Confirm Task Deletion',
        buttonContentYes: 'Confirm',
        buttonContentNo: 'Cancel'
      }

    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
      if(result == 'true'){
      }else{
        this.removeTodo()
      }

    })
  }
}
