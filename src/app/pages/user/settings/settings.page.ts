import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router, private global: GlobalService) { }

  ngOnInit() {
  }

  edituser() {
    this.router.navigate(['/edituser'])
  }

  password() {
    this.router.navigate(['/password'])
  }

  logout() {
    this.global.logout();
    this.router.navigate(['/login']);
  }
}
