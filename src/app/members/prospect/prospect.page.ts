import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.page.html',
  styleUrls: ['./prospect.page.scss'],
})
export class ProspectPage implements OnInit {
  items: any = [];
  user: any;
  limit : number = 10;
  start : number = 0;
  isLoaded = false;
  data : any = [];
  id : string;
  public searchTerm: string = ""; 
  selectCategory ='Populer';
  itemsNew: any = [];
  itemsproduct : any = [];
  itemsProfile : any = [];
  itemsCustomer : any = [];
  itemTotalProspect : any = [];
  totalProspect : number = 0;
  text : string = "Kamu tidak memiliki prospek hari ini"
  url :any;

  constructor(
    private router : Router,
    private postPvdr : PostProvider,
    private storageLocal : Storage,
    public alertController : AlertController,
    public loadingController : LoadingController,
    private dataService: DataService,
    private callNumber : CallNumber,
  ) { 
    setTimeout(() => {
      this.isLoaded = true;
    }, 2000);
    this.loadSaved(); 
  }
  
  ngOnInit() {
  }
  addprospect(){
    this.router.navigate(['members/addprospect'])
  }
  SeeAll(){
    this.router.navigate(['members/seeallprospect'])
  }
  ionViewWillEnter(){
    this.items = [];
    this.start = 0;
    this.itemsNew = [];
    this.itemsProfile = [];
    this.itemsproduct = [];
    this.itemsCustomer = [];
    this.itemTotalProspect = [];
    this.LoadTotalProspect();
    this.LoadCustomer();
    this.loadProspect();
    this.loadProspectNew();
    this.LoadProfile();
    this.loadProduct();
  }
  async loadProduct(){
    const loading = await this.loadingController.create({
      message : "",
      spinner: 'crescent',
      translucent : true,
      cssClass:'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
    this.storageLocal.get('IdLogin').then((IdLogin)=>{
      this.user = IdLogin;
      let body = {
      aksi : 'getdata',
      limit : this.limit,
      start : this.start,
      };
      this.postPvdr.postData(body, 'LoadProduct.php?Id='+this.user).subscribe(data =>{
        loading.dismiss().then(()=>{
          for(let item of data){
            this.itemsproduct.push(item);
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
    this.storageLocal.get('IdLogin').then((IdLogin) => {
      this.user = IdLogin;
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvdr.postData(body, 'LoadProfile.php?Id=' + this.user).subscribe(data => {
        loading.dismiss().then(() => {
          for (let item of data) {
            this.itemsProfile.push(item);
          }
        })
      });
    });
  }
  deleteprospect(id){
    let body = {
      aksi : 'delete',
      id : id,
      };
      this.postPvdr.postData(body, 'InsertProspect.php').subscribe(_data =>{
        this.ionViewWillEnter();
      });
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
  updateProduct(id,namaProduk,tipeProduk,totalProfit,normalPrice,jumlahProduk,hargaProduk,deskripsiProduk){
    if(namaProduk==""){
      namaProduk=" ";
    }
    if(tipeProduk==""){
      tipeProduk=" ";
    }
    if(totalProfit==""){
      totalProfit=" ";
    }
    if(jumlahProduk==""){
      jumlahProduk=" ";
    }
    if(hargaProduk==""){
      hargaProduk=" ";
    }
    if(deskripsiProduk==""){
      deskripsiProduk=" ";
    }
    if(normalPrice==""){
      normalPrice=" "
    }
    this.router.navigate(['members/addproduct/'
    +id+'/'
    +namaProduk+'/'
    +tipeProduk+'/'
    +totalProfit+'/'
    +normalPrice+'/'
    +jumlahProduk+'/'
    +hargaProduk+'/'
    +deskripsiProduk]);
  }
  async loadProspect(){
    const loading = await this.loadingController.create({
      message : "",
      spinner: 'crescent',
      translucent : true,
      cssClass:'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
    this.storageLocal.get('IdLogin').then((IdLogin)=>{
        this.user = IdLogin;
        let body = {
          aksi : 'getdata',
          limit : this.limit,
          start : this.start,
          };
          this.postPvdr.postData(body, 'LoadProspect.php?Id='+this.user).subscribe(data =>{
            loading.dismiss().then(()=>{
              for(let item of data){
                this.items.push(item);
            } 
            })
          });
      })
  }
  loadProspectNew(){
    this.storageLocal.get('IdLogin').then((IdLogin)=>{
        this.user = IdLogin;
        let body = {
          aksi : 'getdata',
          limit : this.limit,
          start : this.start,
          };
          this.postPvdr.postData(body, 'LoadProspectNew.php?Id='+this.user).subscribe(data =>{
            for(let item of data){
              this.itemsNew.push(item);
          } 
          });
      })
  }
  LoadTotalProspect() {
    this.storageLocal.get('IdLogin').then((IdLogin) => {
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
  async LoadCustomer(){
    const loading = await this.loadingController.create({
      message : "",
      spinner: 'crescent',
      translucent : true,
      cssClass:'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
    this.storageLocal.get('IdLogin').then((IdLogin)=>{
        this.user = IdLogin;
        let body = {
          aksi : 'getdata',
          limit : this.limit,
          start : this.start,
          };
          this.postPvdr.postData(body, 'LoadCustomer.php?Id='+this.user).subscribe(data =>{
            loading.dismiss().then(()=>{
              for(let item of data){
                this.itemsCustomer.push(item);
            } 
            })
          });
      })
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  async presentAlertMultipleButtons(id) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      subHeader: '',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (_blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            let body = {
              aksi : 'delete',
              id : id,
              };
              this.postPvdr.postData(body, 'InsertProspect.php').subscribe(_data =>{
                this.ionViewWillEnter();
              });
          }
        }
      ]
    });
    await alert.present();
  }
  doRefresh(event){
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }
  setFilteredItems() {
    this.items = this.dataService.filterContact(this.searchTerm);
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.url = event.target.result;
        this.url = reader.result;
        this.storageLocal.set('Profile', this.url)
      }
    }
  }
  loadSaved() {
    this.storageLocal.get('Profile').then((url) => {
      this.url = url || [];
    });
  }
}
