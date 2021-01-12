import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './provider/auth.guard';

const routes: Routes = [
    {
        path: 'members',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    },
    {
        path: 'plant-detail',
        loadChildren: () => import('./myPlants/plant-detail/plant-detail.module').then(m => m.PlantDetailPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'plant-detail/:plantId',
        loadChildren: () => import('./myPlants/plant-detail/plant-detail.module').then(m => m.PlantDetailPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'care',
        loadChildren: () => import('./myPlants/care/care.module').then(m => m.CarePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'watering',
        loadChildren: () => import('./myPlants/care/tips/watering/watering.module').then(m => m.WateringPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: () => import('./authenticationPages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./authenticationPages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./authenticationPages/register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('./waterMe/settings/settings.module').then(m => m.SettingsPageModule),
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
