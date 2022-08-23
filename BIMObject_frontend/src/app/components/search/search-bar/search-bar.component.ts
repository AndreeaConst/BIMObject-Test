import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
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
  currPageResults: Result[];
  results: Result[];
  searchTerm$ = new BehaviorSubject<string>('');
  isLoading$ = new BehaviorSubject<boolean>(true);
  searchSub: Subscription;
  resultsLength: number;

  searchForm: FormGroup = new FormGroup({});

  @ViewChildren('paginator') paginator: QueryList<MatPaginator>;

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
      this.isLoading$.next(false);
      this.results$.next(response);
      this.results = response;
      this.resultsLength = response.length;
      this.currPageResults = response.slice(0,10);
      this.paginator.first.pageIndex = 0;
    });
  }

  onPageChange($event) {
    this.currPageResults = this.results.slice(
      $event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize + $event.pageSize
    );
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }
}
