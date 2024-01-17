import { Component, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public searchValue: string = "";

  constructor( private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.searchValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchCountry( term: string ): void
  {
    this.countriesService.searchCountry( term )
    .subscribe(countries => {
      this.countries = countries;
    });
  }

}
