import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../class/user';
import { DataService } from '../../../service/data.service';
import { UserService } from '../../../service/user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  constructor(public route: ActivatedRoute,
    public router: Router,
    private userservice: UserService,
    public toast: ToastController,
    public location: Location
  ) { }

  user: User = new User();

  ngOnInit() {
    this.userid();
  }

  userid() {
    this.userservice.getUsersById(Number(sessionStorage.getItem('id'))
    ).subscribe(
      res => {
        this.user = res['user'][0];
        console.log(this.user)
      }
    )
  }

  onUpdate(data: User, id: number): void {
    let save = this.userservice.updateUser(data, id).subscribe(data => {
      if (save) {
        this.toast.create({
          position: 'bottom',
          message: data['message'],
          duration: 2000
        }).then(toast => toast.present());
      }
    });
  }

}
