/// <reference path = "../models.ts" />
import * as afterUGExtended from "../models";
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { QuestionRawExtended } from '../questionraw';

@Injectable()
export class TestQuestionService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  //private testQuestionUrl = '/api/Question/Test/';

  private testQuestionUrl = 'http://localhost:1980/api/Question/Test/';
  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


  getQuestions(testNo: Number, userID: Number): Observable<QuestionRawExtended[]> {

    return this.http.get(this.testQuestionUrl + testNo + '/User/' + userID)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));

      

  }
   getQuestionsByQuestionIDArrayAndUserID(questionIDArrayAndUserID: afterUGExtended.afterugExtended.QuestionIDArrayAndUserID): Observable<QuestionRawExtended[]> {

    /*return this.http.get(this.testQuestionUrl + testNo + '/User/' + userID)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));*/
   var loadQuestionsURL = 'http://localhost:1980/api/Questions'; 
 let bodyString = JSON.stringify(questionIDArrayAndUserID); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); 
    
    return this.http.post(loadQuestionsURL, bodyString, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error || 'Server error'));


  }

getChapterWiseQuestionButtons(userID:Number):Observable<any[]>{
  var chapterButtonsUrl = 'http://localhost:1980/api/Test/User/'; 
 return this.http.get(chapterButtonsUrl +  userID)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
}

  saveAttemptsToDB(attemptsToSave: afterUGExtended.afterugExtended.Attempts[][]): Observable<string> {
    var attemptsUrl = 'http://localhost:54347/api/Attempts'; 
 let bodyString = JSON.stringify(attemptsToSave); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json','Accept': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); 
    
    return this.http.post(attemptsUrl, bodyString, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }


}




/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/