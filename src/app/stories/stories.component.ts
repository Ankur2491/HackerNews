import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HackNewsService } from '../hack-news.service';

import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
// let $ = require('jquery')
@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  items = [];
  pageOfItems: Array<any>;
  allData = [];
  type: string;
  show = false;
  currentPage: number = 1;
  constructor(private route: ActivatedRoute, private service: HackNewsService, private modalService: NgbModal,private spinner: NgxSpinnerService) { }
  ngOnInit() {
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}` }));
    this.route.params.subscribe(data => {
      // this.service.getStories(data.type);
      this.type = data.type;
      window.scroll(0,0);
      this.currentPage = 1;
      this.items = [];
      this.service.getItems(data.type).subscribe((items: Array<any>) => {
        this.allData = items;
        console.log(items);
        this.items = Array(items.length).fill(0).map((x, i) => ({ id: (i + 1), content: `` }));
        this.initTenData();
      })
    })
    // let story = {'leadImageUrl':''};
    // this.service.searchImage("IKEA Buys 11,000 Acres of U.S. Forest to Keep It from Being Developed").subscribe(data=>{
    //   console.log(data);
    // })
    
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    // console.log(pageOfItems[0].id);
    // this.spinner.show();
    console.log("Here");
    window.scroll(0, 0);
    if (pageOfItems[0]) {
      this.service.getItems(this.type).subscribe((items: Array<any>) => {
        this.allData = items;
        this.initRandomPageData(pageOfItems[0].id);
      });
    }
    this.pageOfItems = pageOfItems;
  }
  async initTenData() {
    for (let i = 0; i < 12; i++) {
      this.items[i].content = await this.service.getItem(this.allData[i]);
    }
    // this.spinner.hide();
  }
  async initRandomPageData($event) {
    window.scroll(0, 0);
    this.currentPage = $event;
    for (let i = 12*($event - 1); i < 12*$event; i++) {
      this.items[i].content = await this.service.getItem(this.allData[i]);
    }
    // this.spinner.hide();
  }
  clicked(url: string) {
    console.log(url);
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.src = url;
    modalRef.result.then((result) => {
      console.log(result);
      console.log('closed');
    }).catch((result) => {
      console.log(result);
      console.log('cancelling');
    });
  }
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      return of(result as T);
    };
  }
  changed($event){
    console.log($event.value);
  }
}
