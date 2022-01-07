import { Component, OnInit } from '@angular/core';
import { HackNewsService } from '../hack-news.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery = "";
  results = [];
  currentPage: number = 1;
  totalCount;
  constructor(private service: HackNewsService) { }

  ngOnInit(): void {
  }
  onSubmit(form) {
    this.service.search(form.value.searchQuery).subscribe(data => {
      this.searchQuery = form.value.searchQuery;
      this.results = data.hits;
      let totalHits = data.nbHits;
      if (totalHits > 1000) {
        this.totalCount = 980;
      }
      else {
        this.totalCount = totalHits;
      }
      this.currentPage = 1;
    })
  }
  async getPaginatedData($event) {
    this.currentPage = $event;
    window.scroll(0, 0);
    this.service.searchByPageIndex(this.searchQuery, $event).subscribe(data => {
      this.results = data.hits;
    })
  }
}
