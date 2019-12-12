import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.page.html',
  styleUrls: ['./edituser.page.scss'],
})
export class EdituserPage implements OnInit {
  id : number;
  email : string;
  password : string;
  constructor(
    private actRoute : ActivatedRoute,
    private router : Router,
    private postPvdr : PostProvider,
  ) { }

  profile(){
    this.router.navigate[('members/profile')];
  }

  ngOnInit() {
    this.actRoute.params.subscribe((data:any) =>{
      this.id = data.id;
      this.email = data.email;
      this.password = data.password;
      console.log(data);
      });
  }

  updateProcess(){
    return new Promise(resolve => {
      let body = {
      aksi : 'update',
      id  : this.id,
      email : this.email,
      password : this.password
    };
    this.postPvdr.postData(body,'LoadUser.php').subscribe(data =>{
    console.log('Ok');
    });
  });
  }

}
