import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ){}

  public country?: Country;


  // OBSERVABLE HELL
  // ngOnInit(): void {
  //   this.activatedRoute.params
  //     .subscribe( ({id}) => {

  //       this.countriesService.searchByAlphaCode( id )
  //       .subscribe( country => {
  //         console.log(country);
  //       } );
  //     })
  // }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countriesService.searchByAlphaCode( id ))
    )
    .subscribe( country => {

      if( !country )
      {
        return this.router.navigateByUrl('');
      }

      this.country = country;

      return;
    });
  }
}
