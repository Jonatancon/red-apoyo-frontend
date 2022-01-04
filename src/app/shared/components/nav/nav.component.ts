import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../../core/services/token/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  name: String | null = this.tokenService.getUserName();

  constructor(
    public tokenService: TokenService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.tokenService.logOut();
    this.route.navigate(['/user/login']);
  }

}
