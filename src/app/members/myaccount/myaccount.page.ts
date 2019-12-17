import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    public alertController: AlertController,
    private router : Router
    ){ 

    }
    async presentAlertMultipleButtons() {
      const alert = await this.alertController.create({
        header: 'Are You Sure?',
        subHeader: '',
        message: '',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ya',
            handler: () => {
              this.authService.logout();
            }
          }
        ]
      });
  
      await alert.present();
    }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
  }

  profile(){
    this.router.navigate(['members/user']);
  }
  showDetail(){
    this.router.navigate(['members/about'])
  }

  bahasa(){
    this.router.navigate(['members/language'])
  }
}
