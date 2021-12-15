import { Component, OnInit } from '@angular/core';
import {CountryService} from "../../../core/services/country/country.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CountriesModel} from "../../../core/models/countries.model";
import {StatesModel} from "../../../core/models/states.model";
import {CityModel} from "../../../core/models/city.model";
import {UserService} from "../../../core/services/authentication/user.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  hide = true;
  cityOptional = '';
  countries:CountriesModel[]  = [];
  states: StatesModel[]  = [];
  cities: CityModel[]  = [];

  constructor(
    private countryService:CountryService,
    private formBuilder: FormBuilder,
    private userService:UserService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  saveUser(event:Event) {
    event.preventDefault();
    if (this.form.get('check')?.value) {
      this.form.get('roles')?.setValue(['usuario', 'anfitrion']);
    }
    this.userService.createdUser(this.form.value).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  private buildForm () {
    this.form = this.formBuilder.group({
      nombreUsuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      ciudad: ['' , [Validators.required]],
      pais: ['', [Validators.required],],
      estado: ['', [Validators.required]],
      check:false,
      roles: [['usuario']]
    });
  }

  private loadCountries () {
    this.countryService.getAllCountries().subscribe(
      data => {
        this.countries = data;
      }
    );
  }

  loadState(country:string){
    this.countryService.getAllStates(country).subscribe(
      data => {
        this.states = [];
        this.states = data;
      }
    );
  }

  loadCities (state:string) {
    this.cityOptional = state;
    this.countryService.getAllcities(state).subscribe(
      data => {
        this.cities = [];
        this.cities = data;
      }
    );
  }

}
