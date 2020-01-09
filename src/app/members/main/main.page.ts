import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ShareService } from 'src/app/share/share';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit{
  @ViewChild('mySlider') slider: IonSlides;
  sliderOpts = {
    autoplay: true,
    speed: 1000,
    zoom: {
      maxRatio: 5
    }
  };
  Activity: any = null;
  items: any = [];
  itemsaccount: any = [];
  user: any;
  limit: number = 10;
  start: number = 0;
  itemProspect: any = [];
  itemTotalProspect: any = [];
  itemCustomer: any = [];
  totalCustomer: number = 0;
  totalProspect: number = 0;
  text: string = "You don't have prospect today";
  textActivity: string = "You don't have activities today";
  itemIncentive: any;
  NewDate : string;

  constructor(
    private storage: Storage,
    private router: Router,
    public share: ShareService,
    private postPvdr: PostProvider,
  ) {
  }
   ionViewWillEnter() {
    this.items = [];
    this.start = 0;
    this.itemTotalProspect = [];
    this.itemCustomer = [];
    this.itemProspect = [];
    this.itemIncentive = [];
    this.Activity = [];
    this.LoadActivity();
    this.LoadIncentive();
    this.loadProspect();
    this.LoadProfile();
    this.LoadTotalCustomer();
    this.LoadTotalProspect();
  }
  ngOnInit(){
    if (this.Activity == null) {
      this.textActivity;
    } else {
      this.textActivity = '';
    }
    console.log(this.Activity)
  }
  updateprospect(id, namaCustomer, emailCustomer, alamatCustomer, no_tlp, company, alamatCompany, emailCompany, nomorCompany, customerneed, stock, hargaProduk, totalPrice, budget, status) {
    this.router.navigate(['members/view-prospect/'
      + id + '/'
      + namaCustomer + '/'
      + emailCustomer + '/'
      + alamatCustomer + '/'
      + no_tlp + '/'
      + company + '/'
      + alamatCompany + '/'
      + emailCompany + '/'
      + nomorCompany + '/'
      + customerneed + '/'
      + stock + '/'
      + hargaProduk + '/'
      + totalPrice + '/'
      + budget + '/'
      + status + '/'
    ]);
  }
  LoadTotalCustomer() {
    //getID
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadTotalCustomer.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemCustomer.push(item);
          this.totalCustomer = this.itemCustomer.length;
          // this.storage.set('Customer', this.itemCustomer)
        }
      });
    });
  }
  LoadIncentive() {
    //getID
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'GetIncentive.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemIncentive.push(item);
        }
      });
    });
  }

  LoadTotalProspect() {
    //getID
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadTotalProspect.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemTotalProspect.push(item);
          this.totalProspect = this.itemTotalProspect.length;
          if (this.totalProspect == 0) {
            this.text;
          } else if (this.totalProspect >= 1) {
            this.text = '';
          }
        }
      });
    });
  }
  loadProspect() {
    //getID
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProspect.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemProspect.push(item);
        }
      });
    });
    // this.changeRef.detectChanges();
  }

  LoadProfile() {
    //getID
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProfile.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.items.push(item);
        }
      });
    });
  }
  LoadActivity(){
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadActivity.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.Activity.push(item);
        }
      });
    });
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }
}
