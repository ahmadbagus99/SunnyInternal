import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-editcontact',
  templateUrl: './editcontact.page.html',
  styleUrls: ['./editcontact.page.scss'],
})
export class EditcontactPage implements OnInit {
  id: number;
  items2: any;
  user: any;
  nama: string = "";
  alamat: string = "";
  tgl_lahir: string = "";
  kelamin: string = "";
  no_tlp: string = "";
  almt_rumah: string = "";
  title: string = "";
  perusahaan: string = "";
  almt_perusahaan: string = "";
  Hobi: string = "";
  Makanan_Favorit: string = "";
  Facebook: string = "";
  Twitter: string = "";
  Instagram: string = "";
  NPWP: string = "";
  userID: string = "";
  penghasilan: string = "";
  category: any;
  nomor : string;
  email : string;
  items : any = [];
  itemsNew : any = [];
  limit : number = 10;
  start : number = 0;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public alertController: AlertController,
    private actRoute: ActivatedRoute,
    public loadingController : LoadingController,
    private callNumber : CallNumber
  ) {
  }

  ionViewWillEnter(){
    this.items = [];
    this.start = 0;
    this.itemsNew = [];
    this.loadContact();
  }

  //fungsi sebagai router pemanggil data yang sudah disii ke dalam kontak
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id = data.id;
      this.nama = data.nama;
      this.email = data.email;
      this.alamat = data.alamat;
      this.tgl_lahir = data.tgl_lahir;
      this.kelamin = data.kelamin;
      this.no_tlp = data.no_tlp;
      this.almt_rumah = data.almt_rumah;
      this.title = data.title;
      this.category = data.category;
      this.penghasilan = data.penghasilan;
      this.perusahaan = data.perusahaan;
      this.almt_perusahaan = data.almt_perusahaan;
      this.penghasilan = data.penghasilan,
        this.Hobi = data.Hobi,
        this.Makanan_Favorit = data.Makanan_Favorit,
        this.NPWP = data.NPWP,
        this.Facebook = data.Facebook,
        this.Twitter = data.Twitter,
        this.Instagram = data.Instagram
        this.nomor = data.no_tlp;
    });
  }

  updatecontact(id,nama,email,alamat,tgl_lahir,kelamin,no_tlp,almt_rumah,title,perusahaan,almt_perusahaan,penghasilan,Hobi,Makanan_Favorit,NPWP,Facebook,Twitter,Instagram){
    this.router.navigate(['members/addcontact/'
    +id+'/'
    +nama+'/'
    +email+'/'
    +alamat+'/'
    +tgl_lahir+'/'
    +kelamin+'/'
    +no_tlp+'/'
    +almt_rumah+'/'
    +title+'/'
    +perusahaan+'/'
    +almt_perusahaan+'/'
    +penghasilan+'/'
    +Hobi+'/'
    +Makanan_Favorit+'/'
    +NPWP+'/'
    +Facebook+'/'
    +Twitter+'/'
    +Instagram]);
  }

  //fungsi untuk membuat baru kontak yang akan diisi
  async loadContact(){
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
          this.postPvdr.postData(body, 'LoadContact.php?Id='+this.user).subscribe(data =>{
            loading.dismiss().then(()=>{
              for(let item of data){
                this.items.push(item);
            } 
            })
          });
      })
  }
//fungsi sebagai untuk menampilkan popup untuk menelepon ke nomor yang sudah diisi di user ke dalam contact
  call(data){
    var num :string= this.nomor;
    console.log('Memanggil..',num)
    this.callNumber.callNumber(num, true)
    .then(res => console.log("Launched Dialer!", res))
    .catch( err => console.log("Dialer Error", err));
  }
  
}