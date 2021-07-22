import { Component, Input, OnInit } from '@angular/core';
import { HackNewsService } from '../hack-news.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() id;
  commentData;
  constructor(private service: HackNewsService) { }

  ngOnInit(): void {
    this.fetchCommentById(this.id);
  }

  async fetchCommentById(id) {
    this.commentData = await this.service.getItem(id);
    // console.log(this.commentData);
  }

}
