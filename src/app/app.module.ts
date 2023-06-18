import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { ListComponent } from './components/list/list.component';
import { TaskDescriptionComponent } from './components/task-description/task-description.component';
import { AddEditPopupComponent } from './shared/components/add-edit-popup/add-edit-popup.component';
import { ListsComponent } from './components/lists/lists.component';
import { ListsFooterComponent } from './components/list-footer/lists-footer.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';

import {
  CdkDrag,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import {NgFor} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ListComponent,
    TaskDescriptionComponent,
    AddEditPopupComponent,
    ListsComponent,
    ListsFooterComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
    NgFor,
    CdkDragPlaceholder,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
