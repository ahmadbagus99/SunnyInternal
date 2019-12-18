import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-prospect',
  templateUrl: './view-prospect.page.html',
  styleUrls: ['./view-prospect.page.scss'],
})
export class ViewProspectPage implements OnInit {
  id: number;
  namaCustomer: string;
  emailCustomer: string;
  alamatCustomer: string;
  no_tlp: string;
  company: string;
  alamatCompany: string;
  emailCompany: string;
  nomorCompany: string;
  customerneed: string;
  stock: string;
  hargaProduk: string;
  totalPrice: number;
  budget: string;
  toggleParam: number;
  toggleWon: boolean;
  note: string = "On Progress";
  userID: number;
  user: any;
  limit: number = 10;
  start: number = 0;
  items: any;
  isHidden: boolean;
  buttonSave:boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private postPvdr: PostProvider,
    private storage: Storage,
    private alertCtrl: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.namaCustomer = data.namaCustomer;
      this.emailCustomer = data.emailCustomer;
      this.alamatCustomer = data.alamatCustomer;
      this.no_tlp = data.no_tlp;
      this.company = data.company;
      this.alamatCompany = data.alamatCompany;
      this.emailCompany = data.emailCompany;
      this.nomorCompany = data.nomorCompany;
      this.customerneed = data.customerneed;
      this.stock = data.stock;
      this.hargaProduk = data.hargaProduk;
      this.totalPrice = data.totalPrice;
      this.budget = data.budget;
      this.toggleParam = data.status;
      this.storage.set('Amount', data.totalPrice)
      if (this.toggleParam == 0) {
        this.toggleWon = false;
      } else if (this.toggleParam == 1) {
        this.toggleWon = true;
      }
    })
    this.storage.get('session_storage').then((iduser) => {
      var IdUser = iduser;
      var MyID = IdUser.map(user => user.id);
      this.user = parseInt(MyID)
      this.userID = this.user;
    });
  }
  ionViewWillEnter() {
    if (this.toggleWon == true) {
      this.note = "Close Won"
    } else if (this.toggleWon == false) {
      this.note = "On Progress"
    }
    this.isHidden = this.toggleWon;
  }

  checkToggle() {
    if (this.toggleWon == true) {
      this.note = "Close Won"
    } else if (this.toggleWon == false) {
      this.note = "On Progress"
    }
  }

  Update() {
    return new Promise(resolve => {
      let body = {
        aksi: 'update',
        id: this.id,
        toggleWon: this.toggleWon,
      };
      this.postPvdr.postData(body, 'InsertCustomer.php').subscribe(data => {
        console.log(data)
        this.router.navigate(['members/dashboard'])
      })
    });
  }
  checkStatus(){
    this.buttonSave = false;
    if (this.buttonSave == false){
      this.cancel();
    }else if(this.toggleWon == false ){
      this.cancel();
    }
  }
  async cancel() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure ?',
      subHeader:'Canceled this process ?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: (blah) => {
            console.log('cancel')
          }
        },
        {
          text: 'Ya',
          handler: () => {
            this.router.navigate(['members/seeallprospect'])
          }
        }
      ]
    })
    await alert.present();
  }

}
