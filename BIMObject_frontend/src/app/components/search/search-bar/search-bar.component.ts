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
  isLoading$ = new BehaviorSubject<boolean>(true);
  searchSub: Subscription;

  searchForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    public httpdatabaseService: HttpdatabaseService) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchField: ['', {disabled: true}]
    });

    this.loadData();
  }

  loadData() {
    this.searchSub = this.httpdatabaseService.search(this.searchTerm$).subscribe((response: Result[]) => {
      this.searchForm.get('searchField').enable();
      this.isLoading$.next(false);
      this.results$.next(response);

      console.log(response);
    });
  }

  applyFilter() {
   
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }
}
