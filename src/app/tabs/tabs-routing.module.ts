import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/members/myPlants',
        pathMatch: 'full'
    },
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'waterMe',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../waterMe/waterMe.module').then(m => m.Tab1PageModule)
                    }
                ]
            },
            {
                path: 'myPlants',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../myPlants/myPlants.module').then(m => m.Tab2PageModule)
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
