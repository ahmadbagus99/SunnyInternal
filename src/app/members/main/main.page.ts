import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ShareService } from 'src/app/share/share';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, ViewChild, ElementRef, ApplicationRef, NgZone } from '@angular/core';
import { Chart } from 'chart.js';
import { PostProvider } from 'src/providers/post-providers';
import { IonSlides } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

const TOKEN_user = 'user';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  @ViewChild('mySlider') slider: IonSlides;
  sliderOpts = {
    autoplay: true,
    speed: 1000,
    zoom: {
      maxRatio: 5
    }
  };
  Activity: any = [];
  item: string;
  items2: any;
  public items: any = [];
  public itemsaccount: any = [];
  itemsacc: any;
  user1: any;
  useracc: any;
  user: any;
  limit: number = 10;
  start: number = 0;
  itemProspect: any = [];
  itemTotalProspect: any = [];
  itemCustomer: any = [];
  totalCustomer: number = 0;
  totalProspect: number = 0;
  sum: number = 0;
  sumPrice = [];
  text : string = "You don't have prospect today"
  textActivity : string = "You don't have activities today"
  incentive :number;
  itemIncentive : any;
  
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;

  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;

  constructor(
    private storage: Storage,
    private authService: AuthenticationService,
    private router: Router,
    public share: ShareService,
    private dataService: DataService,
    private postPvdr: PostProvider,
    private loadingController: LoadingController,
    private applicationRef: ApplicationRef,
    private zone: NgZone
  ) {
    router.events.subscribe(() => {
      zone.run(() =>
        setTimeout(() => {
          this.applicationRef.tick();
        }, 0)
      );
    });
  }
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  async ionViewWillEnter() {
    this.storage.get('Activity').then((item) => {
      this.Activity = item;
      if ( this.Activity == null){
        this.textActivity;
      }else{
        this.textActivity = '';
      }
    })
    this.sum = 0;
    this.items = [];
    this.start = 0;
    this.itemTotalProspect = [];
    this.itemCustomer = [];
    this.itemProspect = [];
    this.itemIncentive = [];
    this.LoadIncentive();
    this.loadProspect();
    this.LoadProfile();
    this.LoadTotalCustomer();
    this.LoadTotalProspect();
    this.CheckPrice();
  }
  updateprospect(id,namaCustomer,emailCustomer,alamatCustomer,no_tlp,company,alamatCompany,emailCompany,nomorCompany,customerneed,stock,hargaProduk,totalPrice,budget,status){
    this.router.navigate(['members/view-prospect/'
    +id+'/'
    +namaCustomer+'/'
    +emailCustomer+'/'
    +alamatCustomer+'/'
    +no_tlp+'/'
    +company+'/'
    +alamatCompany+'/'
    +emailCompany+'/'
    +nomorCompany+'/'
    +customerneed+'/'
    +stock+'/'
    +hargaProduk+'/'
    +totalPrice+'/'
    +budget+'/'
    +status
  ]);
  }

  CheckPrice() {
    this.storage.get('Customer').then((data) => {
      var Data = data;
      var FilterData = Data.map(data => data.totalPrice)
      for (var i = 0; i < FilterData.length; i++) {
        this.sum += parseInt(FilterData[i]);
      }
      this.incentive = this.sum * 0.1;
    })
  }
  prospect() {
    this.router.navigate(['members/prospect'])
  }

  ngOnInit() {
    this.storage.get('auth-token').then((items) => {
      this.item = items;
    });
    this.storage.get('session_storage').then((iduser) => {
      this.items2 = iduser;
      this.items2 = this.items2.map(user => user.id);
      this.user = parseInt(this.items2)
      this.storage.set('IdLogin', this.user);
    });
  }

  LoadTotalCustomer() {
    this.storage.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadTotalCustomer.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemCustomer.push(item);
          this.totalCustomer = this.itemCustomer.length;
          this.storage.set('Customer', this.itemCustomer)
        }
      });
    })
  }
  LoadIncentive() {
    this.storage.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
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
    })
  }

  LoadTotalProspect() {
    this.storage.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadTotalProspect.php?Id=' + this.user).subscribe(data => {
        for (let item of data) {
          this.itemTotalProspect.push(item);
          this.totalProspect = this.itemTotalProspect.length;
          if ( this.totalProspect == 0){
            this.text;
          }else if ( this.totalProspect >= 1){
            this.text = '';
          }
        }
      });
    })
  }
  async loadProspect() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
    this.storage.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProspect.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.itemProspect.push(item);
          }
        })
      });
    })
  }

  async LoadProfile() {
    const loading = await this.loadingController.create({
      message: "",
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
    this.storage.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProfile.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.items.push(item);
          }
        })
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
