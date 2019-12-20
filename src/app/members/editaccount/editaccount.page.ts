import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.page.html',
  styleUrls: ['./editaccount.page.scss'],
})
export class EditaccountPage implements OnInit {

  id: number;
  items2: any;
  user: any;
  nama: string = "";
  web: string = "";
  phone: string = "";
  kelamin: string = "";
  owner: string = "";
  type: string = "";
  email: string ="";
  title: string = "";
  event_date: string = "";
  category: string = "";
  industry: string = "";
  employee: string = "";
  nomor : string;
  alamat : string;
  items : any = [];
  itemsNew : any = [];
  limit : number = 10;
  start : number = 0;
  url : any;
  check : any;
  isLoaded : boolean;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public alertController: AlertController,
    private actRoute: ActivatedRoute,
    public loadingController : LoadingController,
    private callNumber : CallNumber
  ) 
  {  }

  ionViewWillEnter(){
    this.items = [];
    this.start = 0;
    this.itemsNew = [];
    this.loadAccount();
    this.loadSaved();
  }
  

//fungsi sebagai router pemanggil data yang sudah disii ke dalam product
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.nama = data.nama;
      this.alamat = data.alamat;
      this.web = data.web;
      this.phone = data.phone;
      this.kelamin = data.kelamin;
      this.owner = data.owner;
      this.email = data.email;
      this.type = data.type;
      this.category = data.category;
      this.title = data.title;
      this.event_date = data.event_date;
      this.industry = data.industry;
      this.employee = data.employee;
      this.nomor = data.no_tlp;
    });
  }

  updateAccount(id, nama, alamat, web, phone, email, owner, type, event_date, category, industry, employee)
  {
    this.router.navigate(['members/addaccount/'
    +id+'/'
    +nama+'/'
    +alamat+'/'
    +web+'/'
    +phone+'/'
    +email+'/'
    +owner+'/'
    +type+'/'
    +event_date+'/'
    +category+'/'
    +industry+'/'
    +employee])
  }

   //fungsi untuk membuat baru akun yang akan diisi
  async loadAccount(){
    const loading = await this.loadingController.create({
      message : "",
      spinner: 'crescent',
      translucent : true,
      cssClass:'custom-loader-class',
      mode: 'md'
    });
    await loading.present();
    this.storage.get('IdLogin').then((IdLogin)=>{
        this.user = IdLogin;
        let body = {
          aksi : 'getdata',
          limit : this.limit,
          start : this.start,
          };
          this.postPvdr.postData(body, 'LoadAccount.php?Id='+this.user).subscribe(data =>{
            loading.dismiss().then(()=>{
              for(let item of data){
                this.items.push(item);
            } 
            })
          });
      })
  }
//fungsi sebagai untuk menampilkan popup untuk menelepon ke nomor yang sudah diisi di user ke dalam akun 
  call(data){
    var num :string= this.nomor;
    console.log('Memanggil..',num)
    this.callNumber.callNumber(num, true)
    .then(res => console.log("Launched Dialer!", res))
    .catch( err => console.log("Dialer Error", err));
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.url = event.target.result;
        this.url = reader.result;
        this.storage.set(this.id.toString(), this.url).then(()=>{
          this.isLoaded = true;
        })
      }
    }
  }
  loadSaved() {
    this.storage.get(this.id.toString()).then((url) => {
      this.check = url;
      if ( this.check == null){
        this.isLoaded = false;
      }else {
        this.isLoaded = true;
      }
        this.url = url || [];
    });
  }

}
