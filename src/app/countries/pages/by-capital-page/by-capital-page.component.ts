import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public searchValue: string = "";

  constructor( private countriesService: CountriesService ){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.searchValue = this.countriesService.cacheStore.byCapital.term;
    console.log(this.searchValue);
  }

  searchByCapital( term: string ): void{
    this.isLoading = true;

    this.countriesService.searchCapital( term )
    .subscribe( countries => {
      this.countries = countries;

      this.isLoading = false;
    } );
  }
}
