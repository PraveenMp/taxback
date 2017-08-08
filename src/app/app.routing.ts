import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/user.component';
import { PageNotFoundComponent } from './shared/components/pagenotfound.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: UserComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    declarations: [
        PageNotFoundComponent
    ],
    exports: [RouterModule]
})

export class AppRouterModule {
}
