import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class DataproviderService {
  private address = '';

  constructor(private _http: Http) { }

  getWeekPlan() {
    //return
    // let author = new Author(firstName, surname);
    // var headers = new Headers();
    // headers.append("Content-Type", 'application/json');
    // var requestoptions = new RequestOptions({
    //   method: RequestMethod.Post,
    //   url: this.address + 'searchNew/',
    //   headers: headers,
    //   body: JSON.stringify(author)
    // })
  }

}
