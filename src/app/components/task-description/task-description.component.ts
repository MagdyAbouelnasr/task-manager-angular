import { Component, Input, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { NgbOffcanvasConfig, NgbOffcanvas , OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ListService } from 'src/app/services/list-task-service.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.scss'],
  providers: [NgbOffcanvasConfig, NgbOffcanvas],
})
export class TaskDescriptionComponent implements OnInit{
  @Input() taskName!: string;
  @Input() taskId!: string;
  closeResult = '';
  @Input() description!: string ; 
  newDescription!: string;


  @ViewChild('content') content: any

	constructor(config: NgbOffcanvasConfig,
               private offcanvasService: NgbOffcanvas,
               private listService: ListService, 
               public dialog: MatDialog) {

		config.position = 'end';
		config.backdropClass = 'bg-info';
	}

  ngOnInit(){
    this.newDescription = this.description;
  }

	open(content: any) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        console.warn(this.closeResult);
        if(result == 'Save click'){
         this.listService.changeTodoDescription(this.taskId, this.description);

        }
        else if(result == 'Close click' && this.description !== this.newDescription){ 
          this.openDialog('500ms', '300ms')
        }
        // else{
          
        // } //in future new feature for reason
			},
			(reason) => {
				this.closeResult = this.getDismissReason(reason);
        if((this.closeResult == 'by pressing ESC' || this.closeResult == 'by clicking on the backdrop') && this.description !== this.newDescription){
          this.openDialog('500ms', '300ms')
        }
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === OffcanvasDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on the backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Description',
        message: ' Would you like to discard changes?',
        buttonContentYes: 'Confirm',
        buttonContentNo: 'Cancel'
      }

    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
      if(result == 'true'){
        this.open(this.content);
      }else{
        this.newDescription = ''
        this.description = ''
      }

    })
  }

}
