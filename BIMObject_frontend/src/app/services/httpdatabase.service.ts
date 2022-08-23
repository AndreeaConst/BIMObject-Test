import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { Result } from '../models/http-request.model';

@Injectable({
  providedIn: 'root'
})
export class HttpdatabaseService {

  constructor(private _httpClient: HttpClient) {}

  search(country: Observable<string>) {
    return country.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((country) =>
        this.getUniversities(country).pipe(
          catchError(() => {
            return of(null);
          })
        )
      )
    );
  }

  getUniversities(
    country: string
  ): Observable<Result[]> {
    const apiUrl = 'http://universities.hipolabs.com/search';
    return this._httpClient.get<Result[]>(apiUrl, {
      params: new HttpParams()
        .set('country', country),
    });
  }
}
