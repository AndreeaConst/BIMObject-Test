import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Result } from 'src/app/models/http-request.model';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less']
})
export class SearchResultsComponent implements OnInit {

  @Input() results$ = new BehaviorSubject<Result[]>([]);
  dialogRef: MatDialogRef<DialogComponent>;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(data) {
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {
        universityData: data,
      },
    });

    this.dialogRef.afterClosed().subscribe((res: string) => {
      if (!res) {
        return;
      }
    });
  }

}
