import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../class/user';
import { DataService } from '../../../service/data.service';
import { UserService } from '../../../service/user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { stringify } from 'querystring';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  constructor( public route: ActivatedRoute, public router: Router,
    private userservice: UserService, public toast: ToastController,
    public location: Location, private dataservice: DataService) { }

  user: User = new User();
  username: string;

  ngOnInit() {
    this.userid();
  }

  userid() {
    this.userservice.getUsersById(this.dataservice.getID()).subscribe(
      res => {
        this.user = res['user'][0];
        console.log(this.user)
      }
    )
  }

  onUpdate(data: User, id: number): void {
    this.userservice.updateUser(data, id).subscribe(res => {
      if (res['message'] == 'No update!') {
        this.toast.create({
          message: 'User info stay remain.',
          duration: 2000
        }).then(res => res.present());
      } else if (res['message'] == 'Success updated!') {
        this.toast.create({
          message: 'User info updated.',
          duration: 2000
        }).then(res => res.present());
        this.username = res['username'];
        this.dataservice.setUsername(this.username)
        this.router.navigate(['/user'])
      }
      
    });
  }

}
