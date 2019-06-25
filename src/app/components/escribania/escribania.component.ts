import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-escribania',
  templateUrl: './escribania.component.html',
  styleUrls: ['./escribania.component.css']
})
export class EscribaniaComponent implements OnInit {

  constructor(public loginService: LoginService) {
  }

  ngOnInit() {
  }

  logout(){
    //localStorage.removeItem('currentUser');
    this.loginService.logout();
  }

}
