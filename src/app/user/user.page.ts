import { Component, OnInit } from '@angular/core';
import { User } from '../class/user';
import { UserService } from '../service/user.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  providers: [UserService]
})
export class UserPage implements OnInit {

  user = [];
  constructor(private userservice: UserService, public loading: LoadingController) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userservice.getUsers()
      .subscribe(user => {

        this.loading.create({
          message: 'Please wait...',
          duration: 1000
        }).then(loading => loading.present());

        this.user = user['data'] as [];
        console.log(this.user);
      });
  }

}
