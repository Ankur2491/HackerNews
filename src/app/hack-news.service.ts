import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
// import * as firebase from 'firebase';
// import { Story } from './story';
@Injectable({
  providedIn: 'root'
})
export class HackNewsService {


  private commentFor = new BehaviorSubject('');
  currentHeading = this.commentFor.asObservable();

  constructor(private http: HttpClient) { }

  async getStories(type: string) {
    let idList: Array<string> = await this.getIds(type);
    console.log(idList);
    let items = { 'items': [] };
    for (let id of idList) {
      let data = await this.getItem(id);
      items.items.push(data);
      console.log(items);
    }


  }
  getIds(type: string): Promise<Array<string>> {
    return this.http.get<Array<string>>(`https://hacker-news.firebaseio.com/v0/${type}stories.json`).toPromise();
  }
  getItems(type: string) {
    return this.http.get(`https://hacker-news.firebaseio.com/v0/${type}stories.json`);
  }
  getItem(id: string) {
    return this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).toPromise();
  }
  async getTenItems(idList: Array<any>) {
    let contentList = [];
    for (let id of idList) {
      let data = await this.getItem(id);
      contentList.push(data);
    }
    return contentList;
  }
  // https://www.google.co.in/search?q=Time-lapse+of+a+single+cell+transforming+into+a+salamander+(2019)&sxsrf=ALeKk01EVbJmQ7-h5SfOHa7Ol9xdb_LatQ:1611669023539&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjwr5L93rnuAhW5zDgGHX6gCCYQ_AUoAnoECAUQBA&biw=1440&bih=740
  searchImage(query: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ Accept: 'text/html' });
    return this.http.get(`/google/search?source=lnms&hl=en&sa=X&gbv=1&tbm=isch&q=
      ${query}&oq=${query}&gs_l=img`, { headers, responseType: 'text' })
      .pipe(map(res => {
        let imgUrl;
        const div = document.createElement('div');
        div.innerHTML = res;
        const images = div.querySelectorAll('img');
        // tslint:disable-next-line:prefer-for-of

        for (let j = 0; j < images.length; j++) {
          console.log("Here");
          const img = images[j];
          if (img.alt !== 'Google') {
            const maxTrial = 3;
            let trial = 0;
            let elem = img as HTMLElement;
            while (!imgUrl && trial < maxTrial) {
              const links = elem.parentElement.querySelectorAll('a');
              console.log(links);
              for (let i = 0; i < links.length; i++) {
                const link = links.item(i);
                if (link.href && link.href !== '') {
                  try {
                    imgUrl = link.href.replace(window.location.origin, '');
                    console.log(imgUrl);
                    imgUrl = imgUrl.substring(imgUrl.indexOf('http'), imgUrl.indexOf('&'));
                    if (imgUrl.indexOf('jpg') === -1 && imgUrl.indexOf('png') && imgUrl.indexOf('jpeg') && imgUrl.indexOf('gif')) {
                      imgUrl = undefined;
                    }
                    break;
                  } catch (err) {
                    imgUrl = undefined;
                  }
                }
              }
              elem = elem.parentElement;
              trial++;
            }
            if (imgUrl) {
              break;
            }
          }
        }
        return imgUrl;
      }));
  }
  changeHeading(heading: string) {
    this.commentFor.next(heading);
  }
}

