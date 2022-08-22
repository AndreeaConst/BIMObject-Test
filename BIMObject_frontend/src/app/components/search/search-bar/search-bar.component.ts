import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpdatabaseService } from 'src/app/services/httpdatabase.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  words$: Observable<any>;
  searchTerm$ = new BehaviorSubject<string>('');
  resultsEmpty$ = new BehaviorSubject<boolean>(false);

  searchForm: FormGroup = new FormGroup({});

  constructor(
    private httpClient: HttpClient, 
    private fb: FormBuilder,
    public httpdatabaseService: HttpdatabaseService) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchField: [''],
      partOfSpeech: ['']
    });
    this.loadData();
  }

  loadData() {

  }

  applyFilter() {
   
  }

  ngOnDestroy() {
  }
}
