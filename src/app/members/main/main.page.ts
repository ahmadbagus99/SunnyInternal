import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ShareService } from 'src/app/share/share';
import { Component, ViewChild, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
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
  textProspect: string = "You don't have prospect today";
  textActivity: string = "You don't have activities today";
  Incentive: string;

  slideOpts = {
    initialSlide: 4,
    slidesPerView: 1,
    autoplay:true
  };
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
    this.LoadActivity();
    this.LoadIncentive();
    this.loadProspect();
    this.LoadCustomer();
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
  LoadCustomer() {
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'LoadCustomer.php?Id=' + this.user).subscribe(data => {
        this.totalCustomer = data.length;
        for (let item of data) {
          this.itemCustomer.push(item);
          this.totalCustomer = this.itemCustomer.length;
        }
      });
    });
  }
  LoadIncentive() {
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'GetIncentive.php?Id=' + this.user).subscribe(data => {
        var DataIncentive = parseInt(data.map(data => data.Incentive));
        var GetDigit = DataIncentive.toString().length;
        if (GetDigit <= 3){
          this.Incentive = DataIncentive.toString();
        }else if ( GetDigit > 3){
         var SubsNumber = DataIncentive.toString().substring(0, DataIncentive.toString().length-3)
         this.Incentive = SubsNumber + 'K';
       }
      });
    });
  }

  loadProspect() {
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'LoadProspect.php?Id=' + this.user).subscribe(data => {
        //Total Prospect
        this.totalProspect = data.length;
        if (this.totalProspect == 0) {
          this.textProspect;
        } else if (this.totalProspect >= 1) {
          this.textProspect = '';
        }
        for (let item of data) {
          this.itemProspect.push(item);
        }
      });
    });
  }

  LoadActivity(){
    this.Activity = [];
    this.storage.get('session_storage').then((iduser) => {
      var ID = iduser;
      this.user = ID.map(data => data.id)
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.Integration(body, 'LoadActivity.php?Id=' + this.user).subscribe(data => {
        if ( data.length == 0) {
        this.textActivity;
        } else {
        this.textActivity = '';
        }
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
