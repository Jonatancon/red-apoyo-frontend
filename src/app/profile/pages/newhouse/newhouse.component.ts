import { Component, OnInit } from '@angular/core';
import {CountryService} from "../../../core/services/country/country.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HouseService} from "../../../core/services/house/house.service";
import {CountriesModel} from "../../../core/models/countries.model";
import {StatesModel} from "../../../core/models/states.model";
import {CityModel} from "../../../core/models/city.model";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";

@Component({
  selector: 'app-newhouse',
  templateUrl: './newhouse.component.html',
  styleUrls: ['./newhouse.component.scss']
})
export class NewhouseComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  cityOptional = '';
  nameImage: string | undefined;
  countries:CountriesModel[]  = [];
  states: StatesModel[]  = [];
  cities: CityModel[]  = [];
  uploadPercent$: Observable<any> | undefined;
  urlImage$: Observable<any> | undefined;

  constructor(
    private countryService:CountryService,
    private formBuilder: FormBuilder,
    private houseService: HouseService,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      idCasa:[''],
      direccion: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      ciudad: ['' , [Validators.required]],
      telefono: ['', [Validators.required],],
      urlFoto: ['']
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

  saveHouse(event:Event) {
    event.preventDefault();

    if (this.form.valid) {
      this.houseService.saveHouse(this.form.value).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }

  }

  uploadFoto(event:Event) {
    const id = Math.random().toString(36).substring(2);
    // @ts-ignore
    const file = event.target.files[0];
    const filePath = `images/house_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent$ = task.percentageChanges();
    this.nameImage = filePath;
    task.snapshotChanges().pipe(
      finalize( () => {
        this.urlImage$ = ref.getDownloadURL();
        this.urlImage$.subscribe(url => {
          this.form.get('urlFoto')?.setValue(url);
        });
      })
    ).subscribe();
  }

}
