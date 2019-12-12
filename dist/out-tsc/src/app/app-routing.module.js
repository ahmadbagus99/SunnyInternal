import * as tslib_1 from "tslib";
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'loading', pathMatch: 'full' },
    { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
    { path: 'dashboard', loadChildren: './members/dashboard/dashboard.module#DashboardPageModule' },
    { path: 'loading', loadChildren: './public/loading/loading.module#LoadingPageModule' },
    {
        path: 'members',
        canActivate: [AuthGuard],
        loadChildren: './members/member-routing.module#MemberRoutingModule'
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map