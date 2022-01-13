import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';
import { HackNewsService } from '../hack-news.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery = "";
  searchPref = "pop";
  results = [];
  prefPlaceholder = "Search Preference";
  currentPage: number = 1;
  totalCount;
  constructor(private service: HackNewsService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  enrichData(source) {
    this.results = [];
    for (let item of source) {
      if (!item["url"]) {
        item["url"] = `https://news.ycombinator.com/item?id=${item['objectID']}`
      }
      this.results.push(item);
    }
  }
  onSubmit(form) {
    this.service.search(form.value.searchQuery, this.searchPref).subscribe(data => {
      this.searchQuery = form.value.searchQuery;
      this.enrichData(data.hits);
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
    this.service.searchByPageIndex(this.searchQuery, $event, this.searchPref).subscribe(data => {
      this.enrichData(data.hits);
    })
  }
  setPreference(param) {
    if (param == "popularity") {
      this.searchPref = "pop";
      this.prefPlaceholder = "by Popularity"
    }
    else {
      this.searchPref = "date";
      this.prefPlaceholder = "by Date"
    }
  }
  openDialog(url: string) {
    const modalRef = this.modalService.open(DialogComponent,{ windowClass : "myCustomModalClass"});
    modalRef.componentInstance.url = url;
    modalRef.result.then((result) => {
      console.log(result);
      console.log('closed');
    }).catch((result) => {
      console.log(result);
      console.log('cancelling');
    });
  }
}
