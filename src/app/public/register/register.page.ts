import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nama = '';
  email = '';
  password = '';
  isActiveToggleTextPassword: Boolean = true;
  // tslint:disable-next-line: variable-name
  confirm_password = '';

  constructor(
    public toastCtrl: ToastController,
    private postPvdr: PostProvider,
    private router: Router,
    public loadingController: LoadingController
  ) { }
  public toggleTextPassword(): void{
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
}

public getType() {
  return this.isActiveToggleTextPassword ? 'password' : 'text';
}

  ngOnInit() {
  }
   // Fungsi untuk masuk ke pages HTML login //
  login() {
    this.router.navigate(['login']);
  }
  async prosesregister() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    loading.present();
  //digunakan untuk fill yang harus di isi yaitu nama asli//
    if (this.nama == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Name required!',
          duration: 2000
        });
        toast.present();
      })
      //digunakan untuk fill yang harus di isi yaitu email//
    } else if (this.email == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Email required',
          duration: 2000
        });
        toast.present();
      })
     //digunakan untuk fill yang harus di isi yaitu password//
    } else if (this.password == '') {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Password required!',
          duration: 2000
        });
        toast.present();
      })
      //fungsi untuk tampilan loading text/tulisan ketika user saat input password tidak sama//
    } else if (this.password != this.confirm_password) {
      loading.dismiss().then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'password not match!',
          duration: 2000
        });
        toast.present();
      })
    } else {
      const body = {
        nama: this.nama,
        email: this.email,
        password: this.password,
        aksi: 'register'
      };
       //fungsi untuk tampilan loading text/tulisan ketika user berhasil daftar//
      this.postPvdr.postData(body, 'LoadUser.php').subscribe(async data => {
        const alertmsg = data;
        if (data.success) {
          loading.dismiss().then(async () => {
            this.router.navigate(['login']);
            const toast = await this.toastCtrl.create({
              message: 'Registration Successful!',
              duration: 2000
            });
            toast.present();
          })
        } else {
          loading.dismiss().then(async () => {
            const toast = await this.toastCtrl.create({
              message: alertmsg,
              duration: 2000
            });
            toast.present();
          })
        }
      });
    }
  }
}
