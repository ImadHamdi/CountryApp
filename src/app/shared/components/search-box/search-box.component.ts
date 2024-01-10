import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject();
  // '?' perquè quaan es crea el component no tenim cap subscripció
  private debouncerSubscription?: Subscription;

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe( debounceTime(300) )
    .subscribe( value => {
      // console.log( 'debouncer value', value);
      this.onDebounce.emit( value );
    })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }


  @Input()
  public placeholder: string = "";

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  emitValue( value: string ): void {
    this.onValue.emit( value )
  }

    onkeyPress( searchTerm: string): void{
      this.debouncer.next( searchTerm );
    }
}
