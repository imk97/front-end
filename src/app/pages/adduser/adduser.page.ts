import { Component, OnInit } from '@angular/core';
import { User } from '../../class/user';
import { UserService } from '../../service/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastController  } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
  providers: [UserService]
})
export class AdduserPage implements OnInit {

  constructor(private userservice: UserService, public toastController: ToastController,
    public router: Router ) { }

  roles: any = [
    'user',
    'staff'
  ]

  ngOnInit() {
  }

  user: User = new User();
  users: User;

  onSave(): void {
    console.log(this.user)
    this.userservice.addUser(this.user).subscribe(
      data => this.toastController.create({
        color: 'dark',
        message: data['message'],
        duration: 2000
      }).then(toast => toast.present() )
    );
    this.router.navigate(['/login'])
  }
}
