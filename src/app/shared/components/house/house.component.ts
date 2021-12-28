import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HouseModel} from "../../../core/models/house.model";

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {

  @Input() house: HouseModel = {
    idCasa: '',
    idPropietario: '',
    direccion: '',
    pais: '',
    estado: '',
    ciudad: '',
    telefono: '',
    urlFoto: ''
  }
  @Output() showHouse = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onShowDetails() {
    this.showHouse.emit(this.house.idCasa);
  }

}
