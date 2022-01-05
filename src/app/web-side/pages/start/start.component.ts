import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CountryService} from "../../../core/services/country/country.service";
import {CountriesModel} from "../../../core/models/countries.model";
import {StatesModel} from "../../../core/models/states.model";
import {CityModel} from "../../../core/models/city.model";
import {HouseModel} from "../../../core/models/house.model";
import {HouseService} from "../../../core/services/house/house.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  houses: HouseModel[] = [];
  countries: CountriesModel[] = [];
  states: StatesModel[] = [];
  cities: CityModel[] = [];
  loading = false;
  loadingHouse = false;
  titleConsult: string = '';
  houseId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private houseService: HouseService,
    private route: ActivatedRoute
  ) { this.buildForm(); }

  ngOnInit(): void {
    this.loadCountry();

    this.route.queryParamMap.subscribe(params => {
      this.houseId = params.get('house');
    });

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      pais: ['', [Validators.required]],
      estado: ['', ],
      ciudad: ['', ]
    });
  }

  onConsult(event: Event) {
    this.loading = true;
    this.loadingHouse = true;
    this.houseService.getAllHousesForCriterial(this.form.value).subscribe(
      (data) => {
        this.houses = data;
        this.loading = false;
        this.titleConsult = 'Casas encontradas para el Pais: ' + this.form.get('pais')?.value +
          (this.form.get('estado')?.value? ' Estado: ' + this.form.get('estado')?.value:' ') +
          (this.form.get('ciudad')?.value? ' En la Ciudad: ' + this.form.get('ciudad')?.value:'')
      }
    );
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
