import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Login } from '../../class/login';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { DataService } from '../../service/data.service';
import { User } from 'src/app/class/user';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private userservice: UserService, private router: Router,
    public toastController: ToastController, public loading: LoadingController,
    public dataService: DataService, private network: Network,
    private dialogs: Dialogs) {

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.dialogs.alert('Hello World').then(() =>
        console.log('network was disconnected :-('))
        .catch(e => console.log('Error displaying dialog', e));

    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();

    let connectSubscription = this.network.onConnect().subscribe(
      () => {
        console.log('network connected!');

        setTimeout(
          () => {
            if (this.network.type === 'wifi') {
              this.dialogs.alert('Hello World').then(() =>
                console.log('network was connected'))
                .catch(e => console.log('Error displaying dialog', e));
            }
          }, 3000
        )
      }
    );

    // stop connect watch
    connectSubscription.unsubscribe();
  }

  login: Login = new Login();
  user: User = new User();
  public errorMsg;

  ngOnInit() {
  }

  onLogin() {
    console.log(this.login);
    this.userservice.loginUsers(this.login).subscribe(
      res => {
        console.log(res);
        if (res['message'] == 'user') {
          this.loading.create({
            duration: 300
          }).then(loading => loading.present());
          this.user = res['user'];
          this.dataService.setName(this.user.username);
          this.dataService.setToken(res.access_token);
          this.dataService.setID(this.user.id);
          sessionStorage.setItem('id', String(this.user.id))
          sessionStorage.setItem('token', res.access_token)
          sessionStorage.setItem('username', this.user.username)
          this.router.navigate(['/user']);
        } else if (res['message'] == 'staff') {
          this.loading.create({
            duration: 300
          }).then(loading => loading.present());
          const data = res['user'];
          this.dataService.setToken(res.access_token);
          sessionStorage.setItem('token', res.access_token);
          sessionStorage.setItem('id', data.id)
          sessionStorage.setItem('username', data.username);
          this.router.navigate(['/staff']);
        } else if (res['message'] == 'admin') {
          this.loading.create({
            duration: 300
          }).then(loading => {
            loading.present();
            const data = res['user']
            this.dataService.setToken(res.access_token)
            sessionStorage.setItem('token', res.access_token)
            sessionStorage.setItem('id', data.id)
            sessionStorage.setItem('username', data.username)
            this.router.navigate(['/admin'])
          })
        }
        else {
          this.toastController.create({
            color: 'dark',
            message: (res['message']),
            duration: 2000,
          }).then(toast => toast.present());
        }
      }

    )
  }

  register() {
    this.router.navigate(['/add']);
  }


}
