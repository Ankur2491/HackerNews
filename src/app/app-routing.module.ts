import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { StoriesComponent } from './stories/stories.component';

const routes: Routes = [{ path: '', redirectTo: 'stories/new', pathMatch: 'full' }, { path: "stories/:type", component: StoriesComponent }, { path: "search", component: SearchComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }