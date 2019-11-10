import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../class/user';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.page.html',
  styleUrls: ['./detailuser.page.scss'],
})
export class DetailuserPage implements OnInit {

  data:any;

  constructor(private userservice: UserService, 
    public alertController: AlertController,
    public route: ActivatedRoute, public router: Router,
    public dataService: DataService
  ) { }

  ngOnInit() {
    if(this.route.snapshot.data['special']) {
      this.data = this.route.snapshot.data['special'];
      console.log(this.data);
    }
  }

  
  delete(id: number): void {
    this.alertController.create({
      subHeader: 'Do you confirm to delete this user?',
      buttons: [
        {
          text: 'No',
          handler: () => {console.log("cancel");}
          
        },
        {
          text: 'Yes',
          handler: () => {
            console.log(id);
            this.userservice.deleteUser(id).subscribe();
          }
        }
      ]
    }).then(alert => alert.present());

  }

  edit(id: number, data: User): void {
    //console.log(id);
    //console.log(data);
    this.dataService.setData(id, data);
    this.router.navigateByUrl('/edituser/'+id)
    /*this.userservice.updateUser(data, id).subscribe(
      user => {console.log(data)
      });*/
  }

}
