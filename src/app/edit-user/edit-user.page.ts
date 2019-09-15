import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../class/user';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { AlertController } from '@ionic/angular';
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
    public alertController: AlertController,
    public location: Location
  ) { }

  data: any;
  user: User = new User();

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.data = this.route.snapshot.data['special'];
      console.log(this.data);
    }
  }

  onUpdate(data: User, id: number): void {
    let save = this.userservice.updateUser(data, id).subscribe(data => {
      if (save) {
        this.alertController.create({
          header: 'Confirm!',
          message: data['message'],
          buttons: ['OK']
        }).then(toast => toast.present());
        if (data['message'] == 'Success updated!') {
          this.router.navigate(['/home'])
        } else {
          this.router.navigateByUrl('/user', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.location.path()])
          })

        }
      }
    });
  }

}
