import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
    { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
    { path: 'main', loadChildren: './main/main.module#MainPageModule' },
    { path: 'addcontact', loadChildren: './addcontact/addcontact.module#AddcontactPageModule' },
    { path: 'addcontact/:id/:nama/:alamat/:tgl_lahir/:kelamin/:no_tlp/:almt_rumah/:title/:perusahaan/:almt_perusahaan/:penghasilan/:Hobi/:Makanan_Favorit/:NPWP/:Facebook/:Twitter/:Instagram', loadChildren: './addcontact/addcontact.module#AddcontactPageModule' },
    { path: 'myaccount', loadChildren: './myaccount/myaccount.module#MyaccountPageModule' },
    { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
    { path: 'addaccount', loadChildren: './addaccount/addaccount.module#AddaccountPageModule' },
    { path: 'addaccount/:id/:nama/:web/:phone/:email/:owner/:type/:event_date/:category/:industry/:employee', loadChildren: './addaccount/addaccount.module#AddaccountPageModule' },
    { path: 'editcontact/:id/:nama/:alamat/:tgl_lahir/:kelamin/:no_tlp/:almt_rumah/:title/:perusahaan/:almt_perusahaan/:penghasilan/:Hobi/:Makanan_Favorit/:NPWP/:Facebook/:Twitter/:Instagram', loadChildren: './editcontact/editcontact.module#EditcontactPageModule' },
    { path: 'editcontact', loadChildren: './editcontact/editcontact.module#EditcontactPageModule' },
    { path: 'editprofile', loadChildren: './editprofile/editprofile.module#EditprofilePageModule' },
    { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
    { path: 'editprofile/:id/:fullname/:phonenumber/:birthday/:email/:country', loadChildren: './editprofile/editprofile.module#EditprofilePageModule' },
    { path: 'user', loadChildren: './user/user.module#UserPageModule' },
    { path: 'edituser/:id/:email/:password', loadChildren: './edituser/edituser.module#EdituserPageModule' },
    { path: 'activities', loadChildren: './activities/activities.module#ActivitiesPageModule' },
    { path: 'product', loadChildren: './product/product.module#ProductPageModule' },
    { path: 'prospect', loadChildren: './prospect/prospect.module#ProspectPageModule' },
    { path: 'editproduct', loadChildren: './editproduct/editproduct.module#EditproductPageModule' },
    { path: 'editproduct/:id/:namaProduk/:tipeProduk/:statusProduk/:jumlahProduk/:hargaProduk/:deskripsiProduk', loadChildren: './editproduct/editproduct.module#EditproductPageModule' },
    { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
    { path: 'language', loadChildren: './language/language.module#LanguagePageModule' },
    { path: 'syaratketentuan', loadChildren: './syaratketentuan/syaratketentuan.module#SyaratketentuanPageModule' },
    { path: 'addactivities', loadChildren: './addactivities/addactivities.module#AddactivitiesPageModule' },
    { path: 'seeallprospect', loadChildren: './seeallprospect/seeallprospect.module#SeeallprospectPageModule' },
    { path: 'addprospect', loadChildren: './addprospect/addprospect.module#AddprospectPageModule' },
    { path: 'pusatbantuan', loadChildren: './pusatbantuan/pusatbantuan.module#PusatbantuanPageModule' },
    { path: 'hubungikami', loadChildren: './hubungikami/hubungikami.module#HubungikamiPageModule' },
    { path: 'kebijakanprivasi', loadChildren: './kebijakanprivasi/kebijakanprivasi.module#KebijakanprivasiPageModule' },
    { path: 'faq', loadChildren: './faq/faq.module#FaqPageModule' },
];
var MemberRoutingModule = /** @class */ (function () {
    function MemberRoutingModule() {
    }
    MemberRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], MemberRoutingModule);
    return MemberRoutingModule;
}());
export { MemberRoutingModule };
//# sourceMappingURL=member-routing.module.js.map