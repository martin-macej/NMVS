import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  rightAnswers: number;
  wrongAnswers: number;
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './result-dialog.component.html',
})
export class ResultDialogComponent {
  constructor(public dialogRef: MatDialogRef<ResultDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
