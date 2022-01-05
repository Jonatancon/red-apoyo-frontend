import { Component, OnInit } from '@angular/core';
import {HouseModel} from "../../../core/models/house.model";
import {HouseService} from "../../../core/services/house/house.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  house: HouseModel[] = [];
  houseId: string | null = null;
  loading: boolean = true;

  constructor(
    private houseService: HouseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.houseService.getAllHouse().subscribe(
      (data) => {
        this.house = data;
        this.loading = false;
      });
    this.route.queryParamMap.subscribe(params => {
      this.houseId = params.get('house');
    });
  }

}
