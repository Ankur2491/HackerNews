import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoriesComponent } from './stories/stories.component';

const routes: Routes = [{path:'',redirectTo:'stories/new',pathMatch:'full'},{ path: "stories/:type", component: StoriesComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }