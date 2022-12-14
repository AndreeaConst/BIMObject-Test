import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Result } from 'src/app/models/http-request.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Result,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  get university() {
    return this.data['universityData'];
  }

  goToSearch(name: string) {
    this.dialogRef.close(name);
  }

}
