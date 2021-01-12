import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {MyPlantsPage} from './myPlants.page';

const routes: Routes = [
    {
        path: '',
        component: MyPlantsPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Tab2PageRoutingModule {
}
