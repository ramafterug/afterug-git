/// <reference path = "../models.ts" />
import * as afterUGExtended from "../models";
/// <reference path = "../custommodels.ts" />
import * as afterUGExtendedCustom from "../custommodels";
//import afterugExtended = require('../models');
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Test } from './test';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioControlValueAccessor } from "../radio_value_accessor";
//import { Choices } from '../models';
import { TestListComponent } from './testlist.component';
import { TestQuestionService } from './test-questions.service';

import { SimpleTimer } from 'ng2-simple-timer';
//import { ButtonRadioDirective } from 'ng2-bootstrap/components/buttons';

@Component({
  moduleId: module.id,
  selector: 'test',
  templateUrl: 'test.component.html',
  styleUrls: ['test.component.css'],


})

@NgModule({
  imports: [

    FormsModule
  ],
  declarations: [RadioControlValueAccessor]

})
export class TestComponent implements OnInit {

  //Properties
  private test = new Test();
  idNo: number;
  userID: number;
  userChoiceID: number = 0;
  toDisplayISR: number = 1;
  userChoiceText: string;
  singleQuestionHitCount: number = 0;
  NewAttempts: afterUGExtended.afterugExtended.Attempts[][];
  SSFinalAttempts: afterUGExtended.afterugExtended.Attempts[];
  MarkedQuestions: number[];
  FinalMarkUnMarkCRUDData: number[][];
  UnMarkedQuestionIDArray: number[];
  testOrSSComplete: boolean = false;

  //ISR
  unansweredQuestionsList: afterUGExtendedCustom.afterugExtended.QuestionObjectISR[];
  incorrectQuestionsList: afterUGExtendedCustom.afterugExtended.QuestionObjectISR[];
  correctQuestionsList: afterUGExtendedCustom.afterugExtended.QuestionObjectISR[];
  mostTimeTakenQuestionsList: afterUGExtendedCustom.afterugExtended.QuestionObjectISR[];
  markedQuestionsList: afterUGExtendedCustom.afterugExtended.QuestionObjectISR[];
  //ISR

  IsMarked: boolean = false;
  TestMode: string; //TT for test. SS for StudySession
  //Timer Code
  counter0 = 0;
  timer0Id: string;
  timer0button = 'Subscribe';
  //Timer Code
  @Input() questionIDArrayAndUserIDAndTestMode: afterUGExtendedCustom.afterugExtended.QuestionIDArrayAndUserIDAndTestMode;

  newQuestion: number = 0;
  constructor(
    private testQuestionService: TestQuestionService,
    private route: ActivatedRoute,
    private st: SimpleTimer,
    // private location: Location
  ) {
    //Randomise here
    this.test.IsQuestionRandom = true;
    this.MarkedQuestions = [];

    //ISR
    this.unansweredQuestionsList = [];
    this.incorrectQuestionsList = [];
    this.correctQuestionsList = [];
    this.mostTimeTakenQuestionsList = [];
    this.markedQuestionsList = [];
    //ISR
  }
  updateModel() {
    //this.QuestionIDArrayFromParent;
  }

  ComputeScoreForAQuestion() {

  }
  PreviousQuestion(): void {

    if (this.test.questionCount != 1) {
      //Evaluate Answer

      // Move to next question
      this.test.questionCount = this.test.questionCount - 1;
      this.test.currentQuestion = this.test.QuestionList[this.getCurrentQuestionNumber() - 1];
      this.randomizeChoices();

    } else {
      alert('Cannot go previous this is the first question');
    }

  }

  getCurrentAttemptArrayLength(): number {
    var attemptIndex = this.getCurrentQuestionNumber() - 1;
    var currentAttemptsLength = this.NewAttempts[attemptIndex].length;
    return currentAttemptsLength;
  }

  updateAndAddCurrentHit(radioValue: number) {
    // console.log(radioValue);
    var attemptIndex = this.getCurrentQuestionNumber() - 1;
    var currentAttemptsLength = this.NewAttempts[attemptIndex].length;

    if (this.singleQuestionHitCount == 0) {
      // this.NewAttempts[attemptIndex] = new afterUGExtended.afterugExtended.Attempts()[];
      //this.NewAttempts[attemptIndex] = [];
      //this.NewAttempts[attemptIndex][currentAttemptsLength] = new afterUGExtended.afterugExtended.Attempts;
      this.NewAttempts[attemptIndex][currentAttemptsLength - 1].Hits = [];
    }
    this.singleQuestionHitCount++;
    var currentHit = new afterUGExtended.afterugExtended.Hits();
    //this.currentHit.AttemptID = this.currentAttempt.AttemptID;// Confusion on this attempt id will be generated only on insert
    currentHit.UserChoiceIDForTheHit = this.userChoiceID;
    currentHit.UserChoiceTextForTheHit = this.fetchChoiceTextObjectByChoiceIDFromCurrentQuestion(this.userChoiceID);
    //console.log("UserAnswerForTheHit:-> " + currentHit.UserAnswerForTheHit);
    //console.log("userChoiceID:-> " + this.userChoiceID);
    var currentAttemptHit = new afterUGExtended.afterugExtended.Hits();
    var currentAttemptHitsWhichNoOfHit = 0;
    var currentHitArrayLength = this.NewAttempts[attemptIndex][currentAttemptsLength - 1].Hits.length;
    if (this.NewAttempts[attemptIndex][currentAttemptsLength - 1].Hits.length == 0) {
      currentAttemptHitsWhichNoOfHit = 0;
    } else {
      currentAttemptHit = (this.NewAttempts[attemptIndex][currentAttemptsLength - 1].Hits[currentHitArrayLength - 1]);
      currentAttemptHitsWhichNoOfHit = currentAttemptHit.WhichNoOfHit;
    }
    currentHit.WhichNoOfHit = currentAttemptHitsWhichNoOfHit + 1;

    this.NewAttempts[attemptIndex][currentAttemptsLength - 1].Hits[currentHitArrayLength] = currentHit;


  }

  CalculateNextAttemptNumber(): number {
    // if (typeof this.test.currentQuestion.Attempts[(this.test.currentQuestion.Attempts.length - 1)].AttemptNumber === 'undefined' || this.test.currentQuestion.Attempts[(this.test.currentQuestion.Attempts.length - 1)].AttemptNumber == null) {
    if (this.test.currentQuestion.Attempts.length == 0) {
      return 0
    } else {
      return ((this.test.currentQuestion.Attempts[(this.test.currentQuestion.Attempts.length - 1)].AttemptNumber));//Change this
    }
  }

  ShowISR() {
    console.log("What to Display Value : " + this.toDisplayISR);
  }

  prepareISR() {
    var countForQuestionObjectLoad;




    this.NewAttempts.forEach(MasterElement => {

      var averageTimeTakenForAttempt = 0;
      var correctCount = 0; var incorrectCount = 0; var unansweredCount = 0;
      countForQuestionObjectLoad = 0;
      var QuestionID_ISR;
      var ActualAnswer_ISR;
      var QuestionObject = new afterUGExtendedCustom.afterugExtended.QuestionObjectISR();
      QuestionObject.IncorrectChoicesChoiceIDArray = [];
      var timeTakenForAttempt = 0;


      var correctCount: number = 0;
      var incorrectCount: number = 0;


      MasterElement.forEach(ChildElement => {


        timeTakenForAttempt = timeTakenForAttempt + ChildElement.TimeTaken;
        if (countForQuestionObjectLoad == 0) {

          QuestionID_ISR = ChildElement.QuestionID;
          ActualAnswer_ISR = ChildElement.CorrectAnswer;

          QuestionObject.QuestionsAfterUG = this.fetchQuestionObjectByQuestionID(QuestionID_ISR);

          //          QuestionObject.UserChoiceText
        }
        countForQuestionObjectLoad++;
        var userAnswer: string;
        var userAnswerChoiceID: number;
        var hitsLength = ChildElement.Hits.length;
        if (hitsLength == 0) {
          userAnswer = "0";
          userAnswerChoiceID = 0;
        } else {
          if (this.TestMode == "SS") {

            userAnswer = ChildElement.Hits[0].UserChoiceTextForTheHit;
            userAnswerChoiceID = ChildElement.Hits[0].UserChoiceIDForTheHit;
          } else {
            userAnswer = ChildElement.Hits[hitsLength - 1].UserChoiceTextForTheHit;
            userAnswerChoiceID = ChildElement.Hits[hitsLength - 1].UserChoiceIDForTheHit;
          }
        }



        if (userAnswer == ChildElement.CorrectAnswer) {

          //Increment CorrectCount
          correctCount++;

        } else {
          //Increment IncorrectCount
          incorrectCount++;
          QuestionObject.IncorrectChoicesChoiceIDArray.push(userAnswerChoiceID);

        }



        //if(){} // Check for Answer status 0 - incorrect, 1 for unanswered, 2 for correct // Check for marked array too // Add question objects to respective arrays
        // Bind to the HTML UI
      });


      var uniq = QuestionObject.IncorrectChoicesChoiceIDArray.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
      QuestionObject.IncorrectChoicesChoiceIDArray = uniq;

      if (incorrectCount >= correctCount) {
        this.incorrectQuestionsList.push(QuestionObject);
      } else {
        this.correctQuestionsList.push(QuestionObject);
      }


      averageTimeTakenForAttempt = timeTakenForAttempt / MasterElement.length;
      QuestionObject.TimeTaken = averageTimeTakenForAttempt;

      this.mostTimeTakenQuestionsList.push(QuestionObject);
      //console.log("Before Sort: " +  this.mostTimeTakenQuestionsList);



    });
    var uniqMarked = this.MarkedQuestions.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
    this.MarkedQuestions = uniqMarked;
    for (var i = 0; i < this.MarkedQuestions.length; i++) {
      var tempMarkedISR = new afterUGExtendedCustom.afterugExtended.QuestionObjectISR();
      tempMarkedISR.QuestionsAfterUG = this.fetchQuestionObjectByQuestionID(this.MarkedQuestions[i]);

      this.markedQuestionsList.push(tempMarkedISR);
    }
    console.log("Most time taken before sort");
    console.log(this.mostTimeTakenQuestionsList);
    var sortedArray = this.mostTimeTakenQuestionsList.sort(this.compare);
    this.mostTimeTakenQuestionsList = sortedArray;
    console.log("Most time taken after sort");
    console.log(this.mostTimeTakenQuestionsList);



    console.log("incorrectQuestionsList: ");
    console.log(this.incorrectQuestionsList);
    console.log("correctQuestionsList: ");
    console.log(this.correctQuestionsList);
    console.log("markedQuestionsList: ");
    console.log(this.markedQuestionsList);

  }

  getAverageTimeTakenFromAttemptsByQuestionID(qID: number): number {

    return 0;
  }

  compare(a, b) {
    if (a.TimeTaken > b.TimeTaken)
      return -1;
    if (a.TimeTaken < b.TimeTaken)
      return 1;
    return 0;
  }

  //objs.sort(compare);


  fetchQuestionObjectByQuestionID(questionID: number): afterUGExtended.afterugExtended.QuestionsAfterUG {
    var objQuestion = new afterUGExtended.afterugExtended.QuestionsAfterUG();
    this.test.QuestionList.forEach(question => {
      if (question.QuestionID == questionID) {
        objQuestion = question;


      }

    });
    return objQuestion;
  }

  fetchChoiceTextObjectByChoiceIDFromCurrentQuestion(choiceID: number): string {
    var choiceText = "";
    this.test.currentQuestion.Choices.forEach(choice => {
      if (choice.ChoiceID == choiceID) {
        choiceText = choice.ChoiceText;


      }

    });
    return choiceText;
  }

  setCurrentAttempt() {


    //set current attempt and add current attempt
    this.singleQuestionHitCount = 0;

    var currentAttempt = new afterUGExtended.afterugExtended.Attempts();
    currentAttempt.Hits = [];
    var currentQuestionLastAttempt = new afterUGExtended.afterugExtended.Attempts();
    var currentQuestionLastAttemptNumber = 0;
    var alreadyExistingAttemptsInDBAndSS = this.CalculateNextAttemptNumber()//this.test.currentQuestion.Attempts.length;
    if (alreadyExistingAttemptsInDBAndSS == 0) {
      //currentAttemptHitsWhichNoOfHit = currentAttemptHit.WhichNoOfHit;
      currentQuestionLastAttemptNumber = 0;
    } else {

      currentQuestionLastAttempt = this.test.currentQuestion.Attempts[(alreadyExistingAttemptsInDBAndSS - 1)];
      currentQuestionLastAttemptNumber = currentQuestionLastAttempt.AttemptNumber;
    }
    currentAttempt.AttemptNumber = currentQuestionLastAttemptNumber + 1;
    currentAttempt.QuestionID = this.test.currentQuestion.QuestionID;
    //console.log("QID:->" +  currentAttempt.QuestionID);
    currentAttempt.TestOrStudySession = "PreTest";//Make it dynamic later based on it is a test or TestOrStudySession
    currentAttempt.TimeTaken = this.counter0;// Start the time when question loads and stop before this statement and then compute difference and Assign
    currentAttempt.UserFinalHitAnswer = this.userChoiceID;//Current choiceID. GEt the value from radio click
    var correctAnswerFromDB = this.fetchChoiceTextObjectByChoiceIDFromCurrentQuestion(this.test.currentQuestion.CorrectChoiceID);
    currentAttempt.CorrectAnswer = correctAnswerFromDB;
    currentAttempt.UserID = 1;//Make it dynamic later
    var CorrectChoiceID = this.test.currentQuestion.CorrectChoiceID;

    this.test.currentQuestion.Choices.forEach(choice => {
      if (choice.ChoiceID == CorrectChoiceID) {
        currentAttempt.CorrectAnswer = choice.ChoiceText;
      }
    });

    //    this.currentAttempt.Hits = this.currentAttemptHits;

    var tempCurrentAttempt = currentAttempt;
    var attemptIndex = this.getCurrentQuestionNumber() - 1;
    //this.NewAttempts[attemptIndex] = tempCurrentAttempt; //Older code
    this.NewAttempts[attemptIndex].push(tempCurrentAttempt);







  }



  getCurrentQuestionNumber(): number {
    var currentQuestionNumber: number;
    var questionCount: number;
    if (this.TestMode == "SS") {

      //questionCount = this.test.questionCount - 1;
      //console.log(this.test.QuestionOrder[0]);
      //console.log("Current Question Number" + currentQuestionNumber);
      return currentQuestionNumber = this.test.QuestionOrder[0];

    } else {

      questionCount = this.test.questionCount - 1;
      return currentQuestionNumber = this.test.QuestionOrder[questionCount];
    }

  }

  CorrectSoRemove(): void {
    //Remove value from index
    if (this.test.QuestionOrder.length == 1) {
      this.testOrSSComplete = true;
    }
    if (this.TestMode == "SS") {
      this.test.QuestionOrder.splice(0, 1);
      console.log("Correct After Splice Before Shuffle: " + this.test.QuestionOrder);
      this.test.QuestionOrder = this.shuffle(this.test.QuestionOrder);
      console.log("Correct After Splice After Shuffle: " + this.test.QuestionOrder);

    }


  }

  InCorrectSoAdd(): void {
    if (this.TestMode == "SS") {
      var questionNoToAdd = this.test.QuestionOrder[0];
      var ExistingCount: number = 0;
      var NoOfTimesToAdd: number;

      for (var i = 0; i < this.test.QuestionOrder.length; i++) {
        if (questionNoToAdd == this.test.QuestionOrder[i]) {
          ExistingCount++;
        }

      }
      NoOfTimesToAdd = this.test.IncorrectNoOfTimesToAdd - ExistingCount
      for (var i = 0; i < NoOfTimesToAdd; i++) {
        this.test.QuestionOrder.push(questionNoToAdd);


      }
      console.log("Incorrect After Push and Before shuffle: " + this.test.QuestionOrder);
      this.test.QuestionOrder = this.shuffle(this.test.QuestionOrder);
      console.log("Incorrect After Push and After shuffle: " + this.test.QuestionOrder);
    }

  }

  SSCorrectOrIncorrect(): void {
    if (this.userChoiceID == this.test.currentQuestion.CorrectChoiceID) {
      // Correct Answer
      // Remove 1 from Question Order
      this.CorrectSoRemove();
      this.test.Score = this.test.Score + 1;
    } else {
      //Incorrect Answer or Unanswered
      // Add 2 times from Question Order
      this.InCorrectSoAdd();
    }
  }

  setTimeTakenForTheCurrentAttempt() {
    console.log("Current Question Number before setting time: " + this.test.QuestionOrder[0]);
    console.log("Question no: " + this.getCurrentQuestionNumber());
    var attemptIndex = this.getCurrentQuestionNumber() - 1;
    console.log(this.NewAttempts);
    console.log("Attempt Index: " + attemptIndex);

    var currentAttemptsLength = this.NewAttempts[attemptIndex].length;
    /*  if (currentAttemptsLength == 0) {
        this.NewAttempts[attemptIndex][currentAttemptsLength].TimeTaken = this.counter0;
      } else {
        this.NewAttempts[attemptIndex][currentAttemptsLength - 1].TimeTaken = this.counter0;
      }*/
    this.NewAttempts[attemptIndex][currentAttemptsLength - 1].TimeTaken = this.counter0;
  }


  MarkOrUnmarkQuestion() {
    this.IsMarked = !this.IsMarked;
    // var tempUserID = 
    //var tempMarked = new afterUGExtendedCustom.afterugExtended.TestMarkAQuestion();


    if (this.IsMarked == true) {
      //this.MarkedQuestions.push

      this.MarkedQuestions.push(this.test.currentQuestion.QuestionID);
      //Dummy comment for git testing develop branch another commit
      alert("Word is marked");
      console.log(this.MarkedQuestions);
    } else {

      //this.test.currentQuestion.QuestionID;
      for (var i = 0; i < this.MarkedQuestions.length; i++) {
        if (this.MarkedQuestions[i] == this.test.currentQuestion.QuestionID) {
          this.MarkedQuestions.splice(i, 1);
          this.UnMarkedQuestionIDArray.push(this.test.currentQuestion.QuestionID);
          console.log(this.MarkedQuestions);
          alert("Word is Unmarked");


        }
      }

      /*var index = this.MarkedQuestions.indexOf(tempMarked, 0);
      console.log("index: " + index);
      if (index > -1) {
        this.MarkedQuestions.splice(index, 1);
         console.log(this.MarkedQuestions);
      }*/

    }
  }


  NextQuestion(): void {
    this.newQuestion++;
    if ((this.test.questionCount != this.test.QuestionList.length && this.TestMode == "TT") || (this.test.QuestionOrder.length != 1 && !(this.test.QuestionOrder.length <= 0) && this.TestMode == "SS")) {
      this.TaskForCurrentAttempt();
      this.TasksForNextAttempt();
    } else {
      if (this.TestMode = "TT") {
        this.TaskForCurrentAttempt();
        console.log("this.NewAttempts");
        console.log(this.NewAttempts);
        this.TTOrSSCompleteDoFormalities();
      } else {
        if (this.test.QuestionOrder.length == 1) {
          this.TaskForCurrentAttempt();
          if (this.testOrSSComplete == false) {
            this.TasksForNextAttempt();
          } else {
            console.log("this.NewAttempts");
            console.log(this.NewAttempts);
            this.TTOrSSCompleteDoFormalities();
          }
        }
      }

    }
  }

  TasksForNextAttempt() {
    this.test.questionCount = this.test.questionCount + 1;
    this.test.currentQuestion = this.test.QuestionList[this.getCurrentQuestionNumber() - 1];
    this.randomizeChoices();
    this.setCurrentAttempt();
    this.resetTimer();
    this.IsMarked = false;
    this.markOrUnMarkTheCurrentQuestion();
    this.userChoiceID = 0;
  }

  TaskForCurrentAttempt() {
    this.setTimeTakenForTheCurrentAttempt();
    this.SSCorrectOrIncorrect();
  }

  TTOrSSCompleteDoFormalities() {
    this.prepareISR();
    this.saveDataAfterTest();
    alert('Cannot go further this is the last question');
  }

  saveDataAfterTest() {
    this.markedQuestionsCRUDDetermine();
    //this.saveMarkedData();
    //this.saveAttempsts(); // Uncomment later. This has to be called after ISR Ends
  }

  saveAttempsts() {
    this.testQuestionService.saveAttemptsToDB(this.NewAttempts)
      .subscribe(
      status => {
        alert(status);
      },
      err => {
        alert(err);
        console.log(err);
      });

  }
  getTestId() {
    this.route.params.forEach((params: Params) => {
      this.idNo = +params['id'];
      this.userID = +params['userID'];
    });
  }
  loadQuestionIDArrayAndUserID(): void {
    // this.questionIDArrayAndUserIDObject = new afterUGExtended.afterugExtended.QuestionIDArrayAndUserID();
    // this.questionIDArrayAndUserIDObject.QuestionIDArray = 
    //this.questionIDArrayAndUserIDObject.UserID = 
  }

  initialMarkedWordsPush() {
    for (var i = 0; i < this.test.QuestionList.length; i++) {
      if (this.test.QuestionList[i].TestMarkAQuestion.length != 0) {

        this.MarkedQuestions.push(this.test.QuestionList[i].QuestionID);
      }
      console.log("Marked Questions from initial push");
      console.log(this.MarkedQuestions);
    }
    this.UnMarkedQuestionIDArray = [];
  }

  markedQuestionsCRUDDetermine() {
    var uniqMarked = this.MarkedQuestions.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
    this.MarkedQuestions = uniqMarked;
    var uniqUnMarked = this.UnMarkedQuestionIDArray.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
    this.UnMarkedQuestionIDArray = uniqUnMarked;

    console.log("Unmarked to delete");
    console.log(this.UnMarkedQuestionIDArray);
    console.log("marked to update");
    console.log(this.MarkedQuestions);
  }
  markOrUnMarkTheCurrentQuestion() {
    if (this.test.currentQuestion.TestMarkAQuestion.length == 0) {
      this.IsMarked = false;
    } else {
      this.IsMarked = true;
    }
  }

  loadQuestions() {
    this.testQuestionService.getQuestionsByQuestionIDArrayAndUserID(this.questionIDArrayAndUserIDAndTestMode)
      .subscribe(
      questions => {
        this.TestMode = this.questionIDArrayAndUserIDAndTestMode.TestMode;
        this.test.questionCount = 1;
        this.test.QuestionList = questions;
        this.randomizeQuestions();
        //console.log("FirstQuestionLoad: " + this.test.QuestionOrder);
        console.log("Question to pick first in the array question order: " + this.getCurrentQuestionNumber());
        for (var i = 0; i < this.test.QuestionList.length; i++) {
          console.log("QuestionList: " + this.test.QuestionList[i].QuestionID);
        }
        console.log("corresponding Element in question LIst: " + this.test.QuestionList[this.getCurrentQuestionNumber() - 1].QuestionID);
        this.test.currentQuestion = this.test.QuestionList[this.getCurrentQuestionNumber() - 1];
        this.randomizeChoices();
        this.NewAttempts = [];

        var i = 0;
        var finalLoopValue = this.test.QuestionList.length;

        for (i = 0; i < finalLoopValue; i++) {
          this.NewAttempts[i] = new Array<afterUGExtended.afterugExtended.Attempts>();

          //this.NewAttempts[i].Hits = [];
        }
        this.initialMarkedWordsPush();
        this.markOrUnMarkTheCurrentQuestion();

        this.st.newTimer('1sec', 1);
        this.subscribeTimer0();
        this.setCurrentAttempt();

      },
      err => {
        console.log(err);
      });


  }

  timer0callback() {
    this.counter0++;
  }

  resetTimer() {
    this.counter0 = 0;
  }
  subscribeTimer0() {
    if (this.timer0Id) {
      // Unsubscribe if timer Id is defined
      this.st.unsubscribe(this.timer0Id);
      this.timer0Id = undefined;
      this.timer0button = 'Subscribe';
      console.log('timer 0 Unsubscribed.');
    } else {
      // Subscribe if timer Id is undefined
      this.timer0Id = this.st.subscribe('1sec', e => this.timer0callback());
      this.timer0button = 'Unsubscribe';
      console.log('timer 0 Subscribed.');
    }
    console.log(this.st.getSubscription());
  }
  saveNewQuestionAttempt() {

  }
  randomizeQuestions() {
    this.test.QuestionOrder = [];
    if (this.TestMode == "SS") {
      for (var i = 1; i <= this.test.QuestionList.length; i++) {

        this.test.QuestionOrder.push(i);
        //this.test.QuestionOrder.push(i);
      }
    } else {
      for (var i = 1; i <= this.test.QuestionList.length; i++) {

        this.test.QuestionOrder.push(i);

      }
    }

    if (this.test.IsQuestionRandom == true) {
      //Random true
      console.log("FirstQuestionLoad before shuffle: " + this.test.QuestionOrder);
      this.shuffle(this.test.QuestionOrder);
      console.log("FirstQuestionLoad after shuffle: " + this.test.QuestionOrder);

    }

  }

  randomizeChoices() {
    this.test.currentQuestion.OriginalChoiceOrder = [];
    this.test.currentQuestion.RandomChoiceOrder = [];
    this.test.currentQuestion.FinalFourShuffledChoices = [];

    for (var i = 1; i <= this.test.currentQuestion.Choices.length; i++) {
      var choice: afterUGExtended.afterugExtended.Choices;
      choice = this.test.currentQuestion.Choices[i - 1];
      this.test.currentQuestion.OriginalChoiceOrder.push(choice);
    }


    // Assign originalChoice order to randomchoice order
    this.test.currentQuestion.RandomChoiceOrder = this.test.currentQuestion.OriginalChoiceOrder;

    //Shuffle the randomchoiceorder array
    this.shuffle(this.test.currentQuestion.RandomChoiceOrder);
    //Remove the correctchoiceid from random choice order array
    //var indexDummy = this.test.currentQuestion.RandomChoiceOrder.indexOf(this.test.currentQuestion.CorrectChoiceID, 0);

    var index: number;
    var correctChoice: afterUGExtended.afterugExtended.Choices;
    for (var i = 1; i <= this.test.currentQuestion.Choices.length; i++) {
      var tempChoice: afterUGExtended.afterugExtended.Choices;
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
      } else {
        this.test.currentQuestion.FinalFourShuffledChoices.push(this.test.currentQuestion.RandomChoiceOrder[i - 2]);
      }

    }
    //shuffle the final4 choiceorder array
    this.shuffle(this.test.currentQuestion.FinalFourShuffledChoices);
    //Bind to the UI
    //console.log(this.test.currentQuestion.FinalFourShuffledChoices);
  }



  shuffle(array) {
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
  }


  ngOnInit(): void {

    //this.getTestId();
    this.loadQuestionIDArrayAndUserID();
    this.test.QuestionList = [];
    this.loadQuestions();


  }

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/