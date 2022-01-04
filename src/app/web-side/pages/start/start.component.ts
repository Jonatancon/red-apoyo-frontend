import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CountryService} from "../../../core/services/country/country.service";
import {CountriesModel} from "../../../core/models/countries.model";
import {StatesModel} from "../../../core/models/states.model";
import {CityModel} from "../../../core/models/city.model";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  countries: CountriesModel[] = [];
  states: StatesModel[] = [];
  cities: CityModel[] = [];
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService
  ) { this.buildForm(); }

  ngOnInit(): void {
    this.loadCountry();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      pais: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      ciudad: ['', [Validators.required]]
    });
  }

  onConsult(event: Event) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }

  loadCountry() {
    this.countryService.getAllCountries().subscribe( (data) => {
      this.countries = data;
    });
  }

  loadState(country:string) {
    this.countryService.getAllStates(country).subscribe(
      (data) => {
        this.states = data;
    });
  }

  loadCities(state:string) {
    this.countryService.getAllcities(state).subscribe( (data) => {
      this.cities = data;
    });
  }

}
