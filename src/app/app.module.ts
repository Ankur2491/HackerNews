import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { HackNewsService } from './hack-news.service';
import { StoriesComponent } from './stories/stories.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { SafePipe } from './safe.pipe';
import { CommentComponent } from './comment/comment.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
const config = {
  apiKey: 'AIzaSyAcStQ9tpyLbeHEY9PpLMBmsKww0WHiYGo',
  authDomain: 'hnews-829bf.firebaseapp.com',
  databaseURL: 'https://hackernews-602a0.firebaseio.com',
  projectId: 'hnews-829bf',
  storageBucket: 'hnews-829bf.appspot.com'
}

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    ModalComponent,
    SafePipe,
    CommentComponent,
    SearchComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HackNewsService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent, DialogComponent]
})
export class AppModule { }
