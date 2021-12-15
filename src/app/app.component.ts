import {Component, OnInit} from '@angular/core';
import {CountryService} from "./core/services/country/country.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'red-apoyo-front';

  constructor(
    private countryService:CountryService
  ) {
  }

  ngOnInit(): void {
    this.countryService.loginCountry().subscribe();
  }

}
