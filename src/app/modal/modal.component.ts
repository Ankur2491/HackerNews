import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HackNewsService } from '../hack-news.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() src: Array<any>;
  masterData = [];
  heading: string;
  subscription: Subscription;
  constructor(public activeModal: NgbActiveModal, private service: HackNewsService) { }

  ngOnInit(): void {
    this.service.currentHeading.subscribe(heading => this.heading = heading);
    for (let cId of this.src) {
      this.fetchComments(cId);
    }
  }

  // async fetchComments(cId, parentId) {
  //   let comment = await this.service.getItem(cId);
  //   console.log(comment);
  //   let obj = { 'id': comment['id'], 'text': comment['text'], 'parent': parentId, 'author': comment['by'], 'time': comment['time'] };
  //   this.masterData.push(obj);
  //   if (comment['kids']) {
  //     for (let childId of comment['kids']) {
  //       this.fetchComments(childId, comment['id']);
  //     }
  //   }
  // }
  async fetchComments(cId) {
    let comment = await this.service.getItem(cId);
    this.masterData.push(comment);
    console.log(this.masterData);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
