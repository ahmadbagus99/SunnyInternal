import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(  private router : Router, ) { }

  ngOnInit() {
  }

     // Fungsi untuk masuk ke pages HTML faq //
  faq(){
    this.router.navigate(['members/faq'])
  }
     // Fungsi untuk masuk ke pages HTML syaratketentuan //
  syaratketentuan(){
    this.router.navigate(['members/syaratketentuan'])
  }
      // Fungsi untuk masuk ke pages HTML pusat bantuan //
  pusatBantuan(){
    this.router.navigate(['members/pusatbantuan'])
  }
     // Fungsi untuk masuk ke pages HTML kebijakan privasi //
  kebijakanPrivasi(){
    this.router.navigate(['members/kebijakanprivasi'])
  }
     // Fungsi untuk masuk ke pages HTML hubungi kami //
  hubungiKami(){
    this.router.navigate(['members/hubungikami'])
  }
}
