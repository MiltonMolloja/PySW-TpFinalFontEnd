import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar-tipo-test',
  templateUrl: './navbar-tipo-test.component.html',
  styleUrls: ['./navbar-tipo-test.component.css']
})
export class NavbarTipoTestComponent implements OnInit {

  constructor(public loginService: LoginService) {
  }

  ngOnInit() {
  }

  logout(){
    //localStorage.removeItem('currentUser');
    this.loginService.logout();
  }

}
