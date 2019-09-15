import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Login } from '../class/login';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private userservice: UserService, private router: Router, 
    public toastController: ToastController) { }

  user: Login = new Login();
  public errorMsg;

  ngOnInit() {
  }
  
  onLogin() {
    console.log(this.user);
    this.userservice.loginUsers(this.user).subscribe(
      res => {
        
        console.log(res);
        this.toastController.create({
          color: 'dark',
          message: (res['message']),
          duration: 2000,
        }).then(toast => toast.present());
        if(res['message'] == 'Successfully login') {
          this.router.navigate(['/home']);
        }
        //localStorage.setItem('token', res.access_token)
        //this.router.navigate(['/home'])
      }
      
    )
  }


}
