import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

  logout()
  {
    //llama al logout del loginservices
    this.loginService.logout();
  }

}
