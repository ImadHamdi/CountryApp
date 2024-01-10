import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  private getCuntriesRequest( url: string ): Observable<Country[]>
  {
      return this.http.get<Country[]>( url )
        .pipe(
          catchError( () => of([]) ),
          // delay(500)
        );
  }

  searchCapital( term: string): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/capital/${ term }`;

    return this.getCuntriesRequest( url );
  }

  searchCountry( term: string ): Observable<Country[]>
  {
    const url: string = `${ this.apiUrl }/name/${ term }`;

    return this.getCuntriesRequest( url );
  }

  searchRegion( term: string ): Observable<Country[]>
  {
    const url: string = `${ this.apiUrl }/region/${ term }`;

    return this.getCuntriesRequest( url );
  }

  searchByAlphaCode( code: string ): Observable<Country | null>
  {
    const url: string = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null))
      );
  }
}
