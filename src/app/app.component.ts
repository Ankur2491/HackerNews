import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HackNews';
  newClass = "nav-item";
  topClass = "nav-item";
  bestClass = "nav-item";
  constructor(private router: Router){}
  ngOnInit(){
    this.router.events.subscribe(event=>{
      if (event instanceof NavigationEnd) {
        // const eventUrl = /(?<=\/).+/.exec(event.urlAfterRedirects);
        // const currentRoute = (eventUrl || []).join('');
        const currentRoute = event.urlAfterRedirects;
        if(currentRoute.split('/')[1]=="new"){
          this.newClass = "nav-item active";
          this.bestClass = "nav-item";
          this.topClass = "nav-item";
        }
        else if(currentRoute.split('/')[1]=="top"){
          this.newClass = "nav-item";
          this.bestClass = "nav-item";
          this.topClass = "nav-item active";
        }
        else{
          this.newClass = "nav-item";
          this.topClass = "nav-item";
          this.bestClass = "nav-item active";
        }
      }
    })
  }
}
