import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Result } from 'src/app/models/http-request.model';
import { HttpdatabaseService } from 'src/app/services/httpdatabase.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  results$ = new BehaviorSubject<Result[]>([]);
  searchTerm$ = new BehaviorSubject<string>('');
  searchSub: Subscription;

  searchForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    public httpdatabaseService: HttpdatabaseService) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchField: ['']
    });

    this.loadData();
  }

  loadData() {
    this.searchSub = this.httpdatabaseService.search(this.searchTerm$).subscribe((response: Result[]) => {
      this.results$.next(response);
    });
  }

  applyFilter() {
   
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }
}
