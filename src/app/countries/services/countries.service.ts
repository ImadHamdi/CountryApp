import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocaleStorage();
  }

  private getCuntriesRequest( url: string ): Observable<Country[]>
  {
      return this.http.get<Country[]>( url )
        .pipe(
          catchError( () => of([]) ),
          // delay(500)
        );
  }

  private saveToLocaleStorage(){
    localStorage.setItem( 'localeCacheStorage', JSON.stringify(this.cacheStore) );
  }

  private loadFromLocaleStorage(){

    if( !localStorage.getItem('localeCacheStorage') ) return;

    this.cacheStore = JSON.parse( localStorage.getItem('localeCacheStorage')! );
  }

  searchCapital( term: string): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/capital/${ term }`;

    return this.getCuntriesRequest( url )
      .pipe(
        tap( countries => {this.cacheStore.byCapital = {term,countries}}),
        tap( () => this.saveToLocaleStorage()),
      );
  }

  searchCountry( term: string ): Observable<Country[]>
  {
    const url: string = `${ this.apiUrl }/name/${ term }`;

    return this.getCuntriesRequest( url )
      .pipe(
        tap( countries => {this.cacheStore.byCountries = {term, countries}}),
        tap( () => this.saveToLocaleStorage()),
      );
  }

  searchRegion( region: Region ): Observable<Country[]>
  {
    const url: string = `${ this.apiUrl }/region/${ region }`;

    return this.getCuntriesRequest( url )
      .pipe(
        tap( countries => {this.cacheStore.byRegion = { region,countries }}),
        tap( () => this.saveToLocaleStorage()),
      )
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

  setLocalStorageConutries( variable: string ): string | null {
    localStorage.setItem(variable, JSON.stringify(this.cacheStore));

    return localStorage.getItem(variable);
  }
}
