"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path = "../models.ts" />
var afterUGExtended = require("../models");
//import afterugExtended = require('../models');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var test_1 = require('./test');
var core_2 = require('@angular/core');
var forms_1 = require('@angular/forms');
var radio_value_accessor_1 = require("../radio_value_accessor");
//import { Choices } from '../models';
var test_questions_service_1 = require('./test-questions.service');
var TestComponent = (function () {
    function TestComponent(testQuestionService, route) {
        this.testQuestionService = testQuestionService;
        this.route = route;
        //Properties
        this.test = new test_1.Test();
        this.userChoiceID = 0;
        this.singleQuestionHitCount = 0;
        this.IsMarked = false;
        this.newQuestion = 0;
        //Randomise here
        this.test.IsQuestionRandom = true;
        this.MarkedQuestions = [];
    }
    TestComponent.prototype.Existing = function () {
        this.IsMarked = !this.IsMarked;
        // var tempUserID = 
        var tempMarked = new afterUGExtended.afterugExtended.TestMarkAQuestion();
        tempMarked.QuestionID = this.test.currentQuestion.QuestionID;
        tempMarked.UserID = this.userID;
        if (this.IsMarked == true) {
            //this.MarkedQuestions.push
            this.MarkedQuestions.push(tempMarked);
            alert("Word is marked");
            console.log(this.MarkedQuestions);
        }
        else {
            //this.test.currentQuestion.QuestionID;
            for (var i = 0; i < this.MarkedQuestions.length; i++) {
                if (this.MarkedQuestions[i].QuestionID == this.test.currentQuestion.QuestionID) {
                    this.MarkedQuestions.splice(i, 1);
                    console.log(this.MarkedQuestions);
                    alert("Word is Unmarked");
                }
            }
        }
    };
    TestComponent.prototype.ComputeScoreForAQuestion = function () {
    };
    TestComponent.prototype.PreviousQuestion = function () {
        if (this.test.questionCount != 1) {
            //Evaluate Answer
            // Move to next question
            this.test.questionCount = this.test.questionCount - 1;
            this.test.currentQuestion = this.test.QuestionList[this.getCurrentQuestionNumber() - 1];
            this.randomizeChoices();
        }
        else {
            alert('Cannot go previous this is the first question');
        }
    };
    TestComponent.prototype.updateAndAddCurrentHit = function (radioValue) {
        // console.log(radioValue);
        var attemptIndex = this.getCurrentQuestionNumber() - 1;
        if (this.singleQuestionHitCount == 0) {
            this.NewAttempts[attemptIndex].Hits = [];
        }
        this.singleQuestionHitCount++;
        var currentHit = new afterUGExtended.afterugExtended.Hits();
        //this.currentHit.AttemptID = this.currentAttempt.AttemptID;// Confusion on this attempt id will be generated only on insert
        currentHit.UserAnswerForTheHit = this.userChoiceID;
        console.log("UserAnswerForTheHit:-> " + currentHit.UserAnswerForTheHit);
        console.log("userChoiceID:-> " + this.userChoiceID);
        var currentAttemptHit = new afterUGExtended.afterugExtended.Hits();
        var currentAttemptHitsWhichNoOfHit = 0;
        var currentHitArrayLength = this.NewAttempts[attemptIndex].Hits.length;
        if (this.NewAttempts[attemptIndex].Hits.length == 0) {
            currentAttemptHitsWhichNoOfHit = 0;
        }
        else {
            currentAttemptHit = (this.NewAttempts[attemptIndex].Hits[currentHitArrayLength - 1]);
            currentAttemptHitsWhichNoOfHit = currentAttemptHit.WhichNoOfHit;
        }
        currentHit.WhichNoOfHit = currentAttemptHitsWhichNoOfHit + 1;
        this.NewAttempts[attemptIndex].Hits[currentHitArrayLength] = currentHit;
    };
    TestComponent.prototype.CalculateNextAttemptNumber = function () {
        return ((this.test.currentQuestion.Attempts[(this.test.currentQuestion.Attempts.length - 1)].AttemptNumber) + 1); //Change this
    };
    TestComponent.prototype.setCurrentAttempt = function () {
        //set current attempt and add current attempt
        this.singleQuestionHitCount = 0;
        var currentAttempt = new afterUGExtended.afterugExtended.Attempts();
        var currentQuestionLastAttempt = new afterUGExtended.afterugExtended.Attempts();
        var currentQuestionLastAttemptNumber = 0;
        var alreadyExistingAttemptsInDB = this.test.currentQuestion.Attempts.length;
        if (alreadyExistingAttemptsInDB == 0) {
            //currentAttemptHitsWhichNoOfHit = currentAttemptHit.WhichNoOfHit;
            currentQuestionLastAttemptNumber = 0;
        }
        else {
            currentQuestionLastAttempt = this.test.currentQuestion.Attempts[(alreadyExistingAttemptsInDB - 1)];
            currentQuestionLastAttemptNumber = currentQuestionLastAttempt.AttemptNumber;
        }
        currentAttempt.AttemptNumber = currentQuestionLastAttemptNumber + 1;
        currentAttempt.QuestionID = this.test.currentQuestion.QuestionID;
        //console.log("QID:->" +  currentAttempt.QuestionID);
        currentAttempt.TestOrStudySession = "PreTest"; //Make it dynamic later based on it is a test or TestOrStudySession
        currentAttempt.TimeTaken = 0; // Start the time when question loads and stop before this statement and then compute difference and Assign
        currentAttempt.UserFinalHitAnswer = 1; //Current choiceID. GEt the value from radio click
        currentAttempt.UserID = 1; //Make it dynamic later
        //    this.currentAttempt.Hits = this.currentAttemptHits;
        var tempCurrentAttempt = currentAttempt;
        var attemptIndex = this.getCurrentQuestionNumber() - 1;
        this.NewAttempts[attemptIndex] = tempCurrentAttempt;
    };
    TestComponent.prototype.NextQuestion = function () {
        this.newQuestion++;
        if (this.test.questionCount != this.test.QuestionList.length) {
            if (this.userChoiceID == this.test.currentQuestion.CorrectChoiceID) {
                this.test.Score = this.test.Score + 1;
            }
            this.test.questionCount = this.test.questionCount + 1;
            this.test.currentQuestion = this.test.QuestionList[this.getCurrentQuestionNumber() - 1];
            this.randomizeChoices();
            this.setCurrentAttempt();
            this.IsMarked = false;
        }
        else {
            if (this.userChoiceID == this.test.currentQuestion.CorrectChoiceID) {
                this.test.Score = this.test.Score + 1;
            }
            this.IsMarked = false;
            //this.setCurrentAttempt();
            this.saveAttempsts();
            alert('Cannot go further this is the last question');
        }
    };
    TestComponent.prototype.saveAttempsts = function () {
        this.testQuestionService.saveAttemptsToDB(this.NewAttempts)
            .subscribe(function (status) {
            alert(status);
        }, function (err) {
            alert(err);
            console.log(err);
        });
    };
    TestComponent.prototype.getTestId = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.idNo = +params['id'];
            _this.userID = +params['userID'];
        });
    };
    TestComponent.prototype.loadQuestions = function () {
        var _this = this;
        this.testQuestionService.getQuestions(this.idNo, this.userID)
            .subscribe(function (questions) {
            _this.test.questionCount = 1;
            _this.test.QuestionList = questions;
            _this.randomizeQuestions();
            _this.test.currentQuestion = _this.test.QuestionList[_this.getCurrentQuestionNumber() - 1];
            _this.randomizeChoices();
            _this.NewAttempts = [];
            var i = 0;
            var finalLoopValue = _this.test.QuestionList.length;
            for (i = 0; i < finalLoopValue; i++) {
                _this.NewAttempts[i] = new afterUGExtended.afterugExtended.Attempts();
                _this.NewAttempts[i].Hits = [];
            }
            _this.setCurrentAttempt();
        }, function (err) {
            console.log(err);
        });
    };
    TestComponent.prototype.saveNewQuestionAttempt = function () {
    };
    TestComponent.prototype.randomizeQuestions = function () {
        this.test.QuestionOrder = [];
        for (var i = 1; i <= this.test.QuestionList.length; i++) {
            this.test.QuestionOrder.push(i);
        }
        if (this.test.IsQuestionRandom == true) {
            //Random true
            this.shuffle(this.test.QuestionOrder);
            console.log(this.test.QuestionOrder);
        }
    };
    TestComponent.prototype.randomizeChoices = function () {
        this.test.currentQuestion.OriginalChoiceOrder = [];
        this.test.currentQuestion.RandomChoiceOrder = [];
        this.test.currentQuestion.FinalFourShuffledChoices = [];
        for (var i = 1; i <= this.test.currentQuestion.Choices.length; i++) {
            var choice;
            choice = this.test.currentQuestion.Choices[i - 1];
            this.test.currentQuestion.OriginalChoiceOrder.push(choice);
        }
        // Assign originalChoice order to randomchoice order
        this.test.currentQuestion.RandomChoiceOrder = this.test.currentQuestion.OriginalChoiceOrder;
        //Shuffle the randomchoiceorder array
        this.shuffle(this.test.currentQuestion.RandomChoiceOrder);
        //Remove the correctchoiceid from random choice order array
        //var indexDummy = this.test.currentQuestion.RandomChoiceOrder.indexOf(this.test.currentQuestion.CorrectChoiceID, 0);
        var index;
        var correctChoice;
        for (var i = 1; i <= this.test.currentQuestion.Choices.length; i++) {
            var tempChoice;
            tempChoice = this.test.currentQuestion.RandomChoiceOrder[i - 1];
            if (this.test.currentQuestion.CorrectChoiceID == tempChoice.ChoiceID) {
                index = i - 1;
                correctChoice = tempChoice;
            }
        }
        if (index > -1) {
            this.test.currentQuestion.RandomChoiceOrder.splice(index, 1);
        }
        //insert correctchoiceid in the beginning of finalfourchoices array. Add other 3 choices from first 3 elements of randomchoiceorder
        for (var i = 1; i <= 4; i++) {
            if (i == 1) {
                this.test.currentQuestion.FinalFourShuffledChoices[i - 1] = correctChoice;
            }
            else {
                this.test.currentQuestion.FinalFourShuffledChoices.push(this.test.currentQuestion.RandomChoiceOrder[i - 2]);
            }
        }
        //shuffle the final4 choiceorder array
        this.shuffle(this.test.currentQuestion.FinalFourShuffledChoices);
        //Bind to the UI
        console.log(this.test.currentQuestion.FinalFourShuffledChoices);
    };
    TestComponent.prototype.getCurrentQuestionNumber = function () {
        var currentQuestionNumber;
        var questionCount;
        questionCount = this.test.questionCount - 1;
        return currentQuestionNumber = this.test.QuestionOrder[questionCount];
    };
    TestComponent.prototype.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
    TestComponent.prototype.ngOnInit = function () {
        this.getTestId();
        this.test.QuestionList = [];
        this.loadQuestions();
    };
    TestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'test',
            templateUrl: 'test.component.html',
            styleUrls: ['test.component.css'],
        }),
        core_2.NgModule({
            imports: [
                forms_1.FormsModule
            ],
            declarations: [radio_value_accessor_1.RadioControlValueAccessor]
        }), 
        __metadata('design:paramtypes', [test_questions_service_1.TestQuestionService, router_1.ActivatedRoute])
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=test.component.js.map