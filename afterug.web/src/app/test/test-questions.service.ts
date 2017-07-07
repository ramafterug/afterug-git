/// <reference path = "../models.ts" />
import * as afterUGExtended from "../models";
/// <reference path = "../custommodels.ts" />
import * as afterUGExtendedCustom from "../custommodels";
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

  private testQuestionUrl = 'http://localhost:5000/api/Question/Test/';
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
  getQuestionsByQuestionIDArrayAndUserID(questionIDArrayAndUserID: afterUGExtendedCustom.afterugExtended.QuestionIdArrayAndUserIdAndTestMode): Observable<QuestionRawExtended[]> {

    /*return this.http.get(this.testQuestionUrl + testNo + '/User/' + userID)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));*/
    var loadQuestionsURL = 'http://localhost:5000/api/Questions';
    let bodyString = JSON.stringify(questionIDArrayAndUserID); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });

    return this.http.post(loadQuestionsURL, bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error || 'Server error'));


  }

  getChapterWiseQuestionButtons(userID: Number, qType: Number): Observable<any[]> {
var chapterButtonsUrl = "";
    if (qType == 1) {
      //Marked
      chapterButtonsUrl = 'http://localhost:5000/api/Test/Marked/User/';

    } else if (qType == 2) {
      //SelfHard
      chapterButtonsUrl = 'http://localhost:5000/api/Test/SelfHard/User/';

    } else if (qType == 3) {
      //OthersHard
      chapterButtonsUrl = 'http://localhost:5000/api/Test/OthersHard/User/';

    } else if (qType == 4) {
      //SelfMedium
      chapterButtonsUrl = 'http://localhost:5000/api/Test/SelfMedium/User/';

    } else if (qType == 5) {
      //OthersMedium
      chapterButtonsUrl = 'http://localhost:5000/api/Test/OthersMedium/User/';

    } else if (qType == 6) {
      //SelfMostTimeTaken
      chapterButtonsUrl = 'http://localhost:5000/api/Test/SelfMostTimeTaken/User/';

    } else if (qType == 7) {
      //OthersMostTimeTaken
      chapterButtonsUrl = 'http://localhost:5000/api/Test/OthersMostTimeTaken/User/';

    } else if (qType == 8) {
      //DontShowQuestions
      chapterButtonsUrl = 'http://localhost:5000/api/Test/DontShowQuestions/User/';

    }else if (qType == 9) {
      //Normal Chapter List
      chapterButtonsUrl = 'http://localhost:5000/api/Test/User/';

    }
    
    return this.http.get(chapterButtonsUrl + userID)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

 

  saveAttemptsToDB(attemptsToSave: afterUGExtended.afterugExtended.Attempts[][]): Observable<string> {
    var attemptsUrl = 'http://localhost:5000/api/Attempts';
    let bodyString = JSON.stringify(attemptsToSave); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });

    return this.http.post(attemptsUrl, bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  ISRCompleteSaveData(finalData: afterUGExtendedCustom.afterugExtended.DataToBeSavedObject): Observable<string> {
    var saveURL = 'http://localhost:5000/api/SaveTTOrSSAndISRData';
    let bodyString = JSON.stringify(finalData); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });

    return this.http.post(saveURL, bodyString, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

}




/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/