import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(public loginService: LoginService) {
  }

  ngOnInit() {
  }

  logout(){
    //localStorage.removeItem('currentUser');
    this.loginService.logout();
  }

}
