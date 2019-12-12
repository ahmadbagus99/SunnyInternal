import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ShareService } from '../share/share';
import { Router } from '@angular/router';

//account 
const TOKEN_KEY = 'auth-token';

 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
  userName: String;
  passWord: String;
  constructor(
    private storage: Storage, 
    private plt: Platform,
    public toastController: ToastController,
    public share: ShareService,
    private router : Router
    ) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  login() {
    return this.storage.set(TOKEN_KEY,this.userName).then(() => {
      this.router.navigate(['members/dashboard']);
      this.authenticationState.next(true);
    });
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.storage.remove('IdLogin');
      this.storage.remove('session_storage');
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
    }
}

  
  