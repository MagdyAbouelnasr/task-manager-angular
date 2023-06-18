import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { TaskList } from '../../models/list-task.model';
import { ListService } from 'src/app/services/list-task-service.service';
@Component({
  selector: 'app-add-edit-popup',
  templateUrl: './add-edit-popup.component.html',
  styleUrls: ['./add-edit-popup.component.scss']
})
export class AddEditPopupComponent {

  listing: string = 'List';
  text: string = ''
  textBool: boolean = false;


  constructor(
    private NgbActiveModal: NgbActiveModal,
    private ListService: ListService
  ){}


  changeText(event: Event): void{
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void{
    if(this.text == ''){
      this.textBool = true
    }else{
    this.ListService.addTodo(this.text);
    this.text = '';
    this.NgbActiveModal.dismiss();
    this.textBool = false
  }
  }

  Cancel(){
    this.NgbActiveModal.dismiss();
  }
}
