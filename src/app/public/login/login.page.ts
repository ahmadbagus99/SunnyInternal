import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/share/share';
import { ToastController, AlertController,LoadingController  } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-providers';

const TOKEN_KEY = 'auth-token';

type NewType = String;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  email: NewType;
  password: String;
  isActiveToggleTextPassword: Boolean = true;
  items: any = [];
  limit = 10;
  start = 0;
  private alert;
  constructor(
    private storage: Storage,
    private authService: AuthenticationService,
    public toastCtrl: ToastController,
    public share: ShareService,
    private postPvdr: PostProvider,
    private alertController : AlertController,
    public loadingController: LoadingController,
    ) { 

    }
  public toggleTextPassword(): void{
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  async login() {
    const loading = await this.loadingController.create({
      message : "",
      spinner: 'crescent',
      translucent : true,
      cssClass:'custom-loader-class',
      mode: 'md'
    });
    loading.present();
    if (this.email != '' && this.password != '') {
      const body = {
        email : this.email,
        password : this.password,
        aksi : 'login'
      };
      this.postPvdr.postData(body, 'LoadUser.php').subscribe(async data => {
        
        const alertmsg = data.msg;
        if (data.success) {
          
          this.storage.set('session_storage', data.result);
           this.storage.set(TOKEN_KEY, this.newMethod().email).then(() => {
            this.authService.authenticationState.next(true);
            
          });
          //fungsi untuk tampilan loading text/tulisan ketika user berhasil login //
          loading.dismiss().then(async ()=>{
            await this.alertController.create({
              message: 'Login Succesfully',
              }).then((overlay) => {
                this.alert = overlay;
                this.alert.present();
                setTimeout(() => {
                  this.alert.dismiss();
                }, 1000);
                });
          })
          
        } else {
          loading.dismiss().then(async()=>{
            await this.alertController.create({
              subHeader: alertmsg,
              buttons: ['OK']
              }).then((overlay) => {
                this.alert = overlay;
                this.alert.present();
                });
          })
          
        }
      });
    } else {
       //fungsi untuk tampilan loading text/tulisan ketika user salah email dan password//
      loading.dismiss().then(async()=>{
        const toast = await this.toastCtrl.create({
          message:  'Email and password wrong!',
          duration: 2000
           });
        toast.present();
      })
    }
   }

  private newMethod() {
    return this;
    
  }
  
}
