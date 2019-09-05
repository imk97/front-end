import { Component, OnInit } from '@angular/core';
import { User } from '../class/user';
import { UserService } from '../service/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
  providers: [UserService]
})
export class AdduserPage implements OnInit {

  constructor(private userservice: UserService, public alert: AlertController) { }

  ngOnInit() {
  }

  user: User = new User();
  users: User;

  onSave() {
    this.userservice.addUser(this.user)
      .subscribe(
        (data: User) => console.log(data)
      );
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }

}
