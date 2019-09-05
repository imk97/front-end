import { Component, OnInit } from '@angular/core';
import { User } from '../class/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  providers: [UserService]
})
export class UserPage implements OnInit {

  user = [];
  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userservice.getUsers()
      .subscribe(user => {
        this.user = user.data as [];
        console.log(this.user);
      });
  }

}
