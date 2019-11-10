import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor( private userservice: UserService, private router: Router, private global: GlobalService
  ) { }

  user: User = new User();
  ngOnInit() {
    this.userservice.getUsersById(Number(sessionStorage.getItem('id'))
    ).subscribe(
      res => {
        this.user = res['user'][0];
        console.log(this.user)
      }
    )
  }

  logout() {
    this.global.logout();
    this.router.navigate(['/login']);
  }

  edit() {
    this.router.navigate(['/edituser'])
  }

  settings() {
    this.router.navigate(['/settings'])
  }

}
