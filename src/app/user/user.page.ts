import { Component, OnInit } from '@angular/core';
import { User } from '../class/user';
import { UserService } from '../service/user.service';
import { LoadingController,NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  providers: [UserService]
})
export class UserPage implements OnInit {

  user = [];
  constructor(private userservice: UserService, public loading: LoadingController, 
    public nav: NavController, public router: Router, public dataService: DataService, 
    public alertController: AlertController, public location: Location) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.loading.create({
      message: 'Please wait...',
      duration: 1000
    }).then(
      loading => loading.present()
    );

    this.userservice.getUsers()
      .subscribe(user => {
        this.user = user['data'] as [];
        console.log(this.user);
      });
  }

  delete(id: number): void {
    this.alertController.create({
      subHeader: 'Do you confirm to delete this user?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log(id);
            this.userservice.deleteUser(id).subscribe();
          }
        },
        {
          text: 'No',
          handler: () => {console.log("cancel");}
        }
      ]
    }).then(alert => alert.present());
    /*this.router.navigateByUrl('/user', {skipLocationChange: true}).then(() => {
      console.log(decodeURI(this.location.path()))
      this.router.navigate([decodeURI(this.location.path())])
    })*/

  }

  getDetail(id: number, data: User): void {
    console.log(id);
    console.log(data);
    this.dataService.setData(id, data);
    this.router.navigateByUrl('/detailuser/'+id)
  }

}
