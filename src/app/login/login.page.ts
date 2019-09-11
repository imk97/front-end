import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Login } from '../class/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private userservice: UserService, private router: Router) { }

  user: Login = new Login();

  ngOnInit() {
  }
  
  onLogin() {
    console.log(this.user);
    this.userservice.loginUsers(this.user)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.access_token)
        this.router.navigate(['/home'])
      },
      err => console.log(err)
    )
  }


}
