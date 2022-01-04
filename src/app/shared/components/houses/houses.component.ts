import {Component, Input, OnInit} from '@angular/core';
import {HouseModel} from "../../../core/models/house.model";
import {HouseService} from "../../../core/services/house/house.service";

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {

  @Input() houses: HouseModel[] = [];

  @Input()
  set houseId(id: string | null) {
    if(id) {
      this.onShowDetail(id);
    }
  }

  showHouseDetail = false;
  houseChosen: HouseModel | null = null;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  imgDefault: string = './assets/img/default.jpg';
  img: string = '';

  constructor(
    private houseService: HouseService
  ) { }

  ngOnInit(): void {
  }

  onShowDetail(id:string) {
    this.statusDetail = 'loading';
    this.open();
    this.houseService.getOneHouse(id).subscribe(
      (data) => {
        this.houseChosen = data;
        this.statusDetail = 'success';
      },
      (error) =>{
        console.log(error);
        this.statusDetail = 'error';
      }
    );
  }

  open() {
    this.showHouseDetail = true;
  }

  close() {
    this.showHouseDetail = false;
  }

  imgError() {
    this.img = this.imgDefault;
  }

}
