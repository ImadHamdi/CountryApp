import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

type Region = 'Africa' | 'Asia' | 'Americas' | 'Oceania' | 'Europe';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Asia', 'Americas', 'Oceania', 'Europe'];
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesService){}

  searchRegion( term: Region): void {
    this.selectedRegion = term;

    this.countriesService.searchRegion( term )
    .subscribe(
      countries => {
        this.countries = countries;
      }
    )
  }
}
