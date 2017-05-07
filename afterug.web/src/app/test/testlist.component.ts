/// <reference path = "../models.ts" />
import * as afterUGExtended from "../models";
//import afterugExtended = require('../models');
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
//import { Location } from '@angular/common';
//import { Observable } from 'rxjs/Observable';
//import {CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TestQuestionService } from './test-questions.service';
import {TestComponent} from './test.component';
@Component({
    moduleId: module.id,
    selector: 'testlist',
    templateUrl: 'testlist.component.html',
    styleUrls: ['testlist.component.css'],


})

@NgModule({
  imports: [

    FormsModule
  ],
  
  

})

export class TestListComponent implements OnInit {


    userID: number;
    chapterButtonsList: any[];
    questionIDArrayCurrentButton: number[];
    ClickedButtonArray: number[];
    showTest:boolean = false;
questionIDArrayAndUserIDObject:afterUGExtended.afterugExtended.QuestionIDArrayAndUserID;
    ngOnInit(): void {
        this.getUserId();
        this.loadChapterButtons();
    }
    constructor(
         private router: Router,
        private testQuestionService: TestQuestionService,
        private route: ActivatedRoute,
        // private location: Location
    ) {
        //Randomise here
       //this.ClickedButtonName = "Name";

    }

    TestButtonClicked(btnValueArray:number[]) {
        /*for (var i=0;i<this.chapterButtonsList.length;i++){
            for(var j=0;j<this.chapterButtonsList[i].length;j++){
               // console.log(this.chapterButtonsList[i][j].Key);
                if(this.chapterButtonsList[i][j].Key == btnValueArray){
                    this.questionIDArrayCurrentButton = this.chapterButtonsList[i][j].Value;
                    //console.log(this.chapterButtonsList[i][j].Value);
                }
            }

        }*/
        //console.log(btnValueArray);
        this.showTest = true;
        this.questionIDArrayCurrentButton = btnValueArray; 
        this.questionIDArrayAndUserIDObject = new afterUGExtended.afterugExtended.QuestionIDArrayAndUserID();
        this.questionIDArrayAndUserIDObject.QuestionIDArray = btnValueArray;
        this.questionIDArrayAndUserIDObject.UserID = this.userID;
         //this.router.navigate(['/']);
    }
    loadChapterButtons() {
        this.testQuestionService.getChapterWiseQuestionButtons(this.userID)
            .subscribe(
            chapterButtons => {


                this.chapterButtonsList = chapterButtons;
                //bind questions ids to button. or pass the array when button is clicked


            },
            err => {
                console.log(err);
            });


    }

    getUserId() {
        this.route.params.forEach((params: Params) => {

            this.userID = +params['userID'];
        });
    }
}