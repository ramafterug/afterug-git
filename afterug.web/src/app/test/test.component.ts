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
  questionDifficultyArray: afterUGExtended.afterugExtended.QuestionDifficulty[];
  currentQuestionDifficulty: afterUGExtended.afterugExtended.QuestionDifficulty;
  percentageCorrectIncorrectForCurrentQuestion: afterUGExtendedCustom.afterugExtended.CurrentQuestionPercentageCorrectIncorrect;
  MarkedQuestions: number[];
  DontShowQuestions: number[];//This will the final array will be added to CompleteDataObjectToSave object//A new class has to be created in both web and Webapi project
  FinalUserDifficultyRatingArray: afterUGExtended.afterugExtended.QuestionDifficulty[];
  UnMarkedQuestionIDArray: number[];
  isTTOrSSComplete: boolean = false;
  isISRComplete: boolean = false;
  difficultyTotalCount: number = 0;
  percentageCorrectIncorrectTotalCount: number = 0;
  questionDifficulty: number = 0;
  ISRIsMarked: boolean = false;
  FinalDataToBeSaved: afterUGExtendedCustom.afterugExtended.DataToBeSavedObject;
  addUserNote: boolean = false;
  usrNote: string;
  UserNotesArray: afterUGExtendedCustom.afterugExtended.UserNotes[];
  //ISRMarkedArray: number[];

  //Single question difficulty levels
  currentQuestionDifficultySortArray: afterUGExtendedCustom.afterugExtended.CurrentQuestionDifficultySort[];
  singleDifficulty: afterUGExtendedCustom.afterugExtended.CurrentQuestionDifficultySort;
  //Single question difficulty levels

  //ISR
  unansweredQuestionsList: afterUGExtendedCustom.afterugExtended.QuestionObjectISR[];
  incorrectQuestionsList: afterUGExtendedCustom.afterugExtended.QuestionObjectISR[];
  correctQuestionsList: afterUGExtendedCustom.afterugExtended.QuestionObjectISR[];
  mostTimeTakenQuestionsList: afterUGExtendedCustom.afterugExtended.QuestionObjectISR[];
  markedQuestionsList: afterUGExtendedCustom.afterugExtended.QuestionObjectISR[];
  //ISR

  IsMarked: boolean = false;
  IsDontShowQuestion: boolean = false;
  TestMode: string; //TT for test. SS for StudySession
  //Timer Code
  counter0 = 0;
  timer0Id: string;
  timer0button = 'Subscribe';
  //Timer Code
  @Input() questionIDArrayAndUserIDAndTestMode: afterUGExtendedCustom.afterugExtended.QuestionIdArrayAndUserIdAndTestMode;

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
    this.DontShowQuestions = [];

    //ISR
    this.unansweredQuestionsList = [];
    this.incorrectQuestionsList = [];
    this.correctQuestionsList = [];
    this.mostTimeTakenQuestionsList = [];
    this.markedQuestionsList = [];
    this.UserNotesArray = [];
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
    // //console.log(radioValue);
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
    currentHit.UserChoiceIdforTheHit = this.userChoiceID;
    currentHit.UserChoiceTextForTheHit = this.fetchChoiceTextObjectByChoiceIDFromCurrentQuestion(this.userChoiceID);
    ////console.log("UserAnswerForTheHit:-> " + currentHit.UserAnswerForTheHit);
    ////console.log("userChoiceID:-> " + this.userChoiceID);
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
    //console.log("What to Display Value : " + this.toDisplayISR);
  }
  AddUserNotes() {
    this.addUserNote = true;
  }

  SaveUserNotes() {
    // GEt note text

    // Create usernotes object
    var CurrentUserNotes = new afterUGExtendedCustom.afterugExtended.UserNotes();
    CurrentUserNotes.ApprovedByAdminUserId = 2;
    CurrentUserNotes.IsApprovedForPublicDisplay = true;
    CurrentUserNotes.IsToBeDisplayed = true;
    CurrentUserNotes.NoteText = this.usrNote;
    CurrentUserNotes.QuestionId = this.test.currentQuestion.QuestionId;
    CurrentUserNotes.UserId = this.userID;

    //Fill necessary parameteres like notetext, QID, UID is to be displayed and all
    //Add it to an array
    this.UserNotesArray.push(CurrentUserNotes);
    this.addUserNote = false;
    //console.log("UserNotesArray: ");
    //console.log(this.UserNotesArray);

  }
  prepareISR() {
    var uniqMarked = this.MarkedQuestions.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
    this.MarkedQuestions = uniqMarked;
    var countForQuestionObjectLoad;




    this.NewAttempts.forEach(MasterElement => {

      var averageTimeTakenForAttempt = 0;
      var correctCount = 0; var incorrectCount = 0; var unansweredCount = 0;
      countForQuestionObjectLoad = 0;
      var QuestionID_ISR;
      var ActualAnswer_ISR;
      var QuestionObject = new afterUGExtendedCustom.afterugExtended.QuestionObjectISR();
      QuestionObject.IncorrectChoicesChoiceIdArray = [];
      var timeTakenForAttempt = 0;


      var correctCount: number = 0;
      var incorrectCount: number = 0;

      //FinalUserDifficultyRatingArray. Gett question difficulty from question listy
      this.FinalUserDifficultyRatingArray = [];
      this.test.QuestionList.forEach(question => {
        if (question.QuestionDifficulty.length != 0) {
          this.FinalUserDifficultyRatingArray.push(question.QuestionDifficulty[0]);
        }

      });
      //console.log("ISR Difficulty LOg");
      //console.log(this.FinalUserDifficultyRatingArray)
      MasterElement.forEach(ChildElement => {


        timeTakenForAttempt = timeTakenForAttempt + ChildElement.TimeTaken;
        if (countForQuestionObjectLoad == 0) {

          QuestionID_ISR = ChildElement.QuestionId;
          ActualAnswer_ISR = ChildElement.CorrectAnswer;

          QuestionObject.QuestionsAfterUg = this.fetchQuestionObjectByQuestionID(QuestionID_ISR);
          //Start Here update marked status, dont show question and difficulty Start
          this.MarkedQuestions.forEach(markedQID => {
            if (markedQID == QuestionID_ISR) {
              QuestionObject.IsMarked = true;
            }
          });
          this.DontShowQuestions.forEach(dontShowQID => {
            if (dontShowQID == QuestionID_ISR) {
              QuestionObject.IsDontShowQuestion = true;
            }
          });

          this.FinalUserDifficultyRatingArray.forEach(difficultyObject => {
            if (difficultyObject.QuestionId == QuestionObject.QuestionsAfterUg.QuestionId) {
              QuestionObject.HardMediumOrEasy = difficultyObject.DifficultyLevel;
            }
          });

          //End Here update marked status, dont show question and difficulty End



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
            userAnswerChoiceID = ChildElement.Hits[0].UserChoiceIdforTheHit;
          } else {
            userAnswer = ChildElement.Hits[hitsLength - 1].UserChoiceTextForTheHit;
            userAnswerChoiceID = ChildElement.Hits[hitsLength - 1].UserChoiceIdforTheHit;
          }
        }



        if (userAnswer == ChildElement.CorrectAnswer) {

          //Increment CorrectCount
          correctCount++;

        } else {
          //Increment IncorrectCount
          incorrectCount++;
          QuestionObject.IncorrectChoicesChoiceIdArray.push(userAnswerChoiceID);

        }




        //if(){} // Check for Answer status 0 - incorrect, 1 for unanswered, 2 for correct // Check for marked array too // Add question objects to respective arrays
        // Bind to the HTML UI
      });



      var uniq = QuestionObject.IncorrectChoicesChoiceIdArray.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
      QuestionObject.IncorrectChoicesChoiceIdArray = uniq;

      if (incorrectCount >= correctCount) {
        this.incorrectQuestionsList.push(QuestionObject);

      } else {
        this.correctQuestionsList.push(QuestionObject);
      }


      averageTimeTakenForAttempt = timeTakenForAttempt / MasterElement.length;
      QuestionObject.TimeTaken = averageTimeTakenForAttempt;

      this.mostTimeTakenQuestionsList.push(QuestionObject);
      ////console.log("Before Sort: " +  this.mostTimeTakenQuestionsList);

      this.MarkedQuestions.forEach(markedQID => {
        if (markedQID == QuestionObject.QuestionsAfterUg.QuestionId) {
          this.markedQuestionsList.push(QuestionObject);
        }
      });

    });
    /*var uniqMarked = this.MarkedQuestions.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
    this.MarkedQuestions = uniqMarked;
    for (var i = 0; i < this.MarkedQuestions.length; i++) {
      var tempMarkedISR = new afterUGExtendedCustom.afterugExtended.QuestionObjectISR();
      tempMarkedISR.QuestionsAfterUg = this.fetchQuestionObjectByQuestionID(this.MarkedQuestions[i]);

      tempMarkedISR.IsMarked = true;
      this.DontShowQuestions.forEach(dontShowQID => {
        if (dontShowQID == this.MarkedQuestions[i]) {
          tempMarkedISR.IsDontShowQuestion = true;
        }
      });
      this.markedQuestionsList.push(tempMarkedISR);
    }*/
    //console.log("Most time taken before sort");
    //console.log(this.mostTimeTakenQuestionsList);
    var sortedArray = this.mostTimeTakenQuestionsList.sort(this.compareTimeTaken);
    this.mostTimeTakenQuestionsList = sortedArray;
    //console.log("Most time taken after sort");
    //console.log(this.mostTimeTakenQuestionsList);



    //console.log("incorrectQuestionsList: ");
    //console.log(this.incorrectQuestionsList);
    //console.log("correctQuestionsList: ");
    //console.log(this.correctQuestionsList);
    //console.log("markedQuestionsList: ");
    //console.log(this.markedQuestionsList);

    this.NewAttempts.forEach(attemptArray => {
      attemptArray.forEach(element => {



        // Start - For answer status

        var userAnswer: string;
        var userAnswerChoiceID: number;
        var hitsLength = element.Hits.length;
        if (hitsLength == 0) {
          userAnswer = "0";
          userAnswerChoiceID = 0;
        } else {
          if (this.TestMode == "SS") {

            userAnswer = element.Hits[0].UserChoiceTextForTheHit;
            userAnswerChoiceID = element.Hits[0].UserChoiceIdforTheHit;
          } else {
            userAnswer = element.Hits[hitsLength - 1].UserChoiceTextForTheHit;
            userAnswerChoiceID = element.Hits[hitsLength - 1].UserChoiceIdforTheHit;
          }
        }



        if (userAnswer == element.CorrectAnswer) {

          //Increment CorrectCount
          element.AnswerStatus = 1;


        } else {
          //Increment IncorrectCount
          element.AnswerStatus = 0;

        }




        // End - For answer status


      });
    });

  }

  getAverageTimeTakenFromAttemptsByQuestionID(qID: number): number {

    return 0;
  }



  calculatePercentageCorrectIncorrectForAllQuestionsForUI() {

  }


  compareTimeTaken(a, b) {
    if (a.TimeTaken > b.TimeTaken)
      return -1;
    if (a.TimeTaken < b.TimeTaken)
      return 1;
    return 0;
  }

  compareDifficultyLevel(a, b) {
    if (a.DifficultyCount > b.DifficultyCount)
      return -1;
    if (a.DifficultyCount < b.DifficultyCount)
      return 1;
    return 0;
  }

  //objs.sort(compare);


  fetchQuestionObjectByQuestionID(questionID: number): afterUGExtended.afterugExtended.QuestionsAfterUg {
    var objQuestion = new afterUGExtended.afterugExtended.QuestionsAfterUg();
    this.test.QuestionList.forEach(question => {
      if (question.QuestionId == questionID) {
        objQuestion = question;


      }

    });
    return objQuestion;
  }

  fetchChoiceTextObjectByChoiceIDFromCurrentQuestion(choiceID: number): string {
    var choiceText = "";
    this.test.currentQuestion.Choices.forEach(choice => {
      if (choice.ChoiceId == choiceID) {
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
    currentAttempt.QuestionId = this.test.currentQuestion.QuestionId;
    ////console.log("QID:->" +  currentAttempt.QuestionId);
    currentAttempt.TestOrStudySession = this.TestMode;//Make it dynamic later based on it is a test or TestOrStudySession
    currentAttempt.TimeTaken = this.counter0;// Start the time when question loads and stop before this statement and then compute difference and Assign
    currentAttempt.UserFinalHitAnswer = this.userChoiceID;//Current choiceID. GEt the value from radio click
    var correctAnswerFromDB = this.fetchChoiceTextObjectByChoiceIDFromCurrentQuestion(this.test.currentQuestion.CorrectChoiceId);
    currentAttempt.CorrectAnswer = correctAnswerFromDB;
    currentAttempt.UserId = this.userID;//Make it dynamic later
    var CorrectChoiceId = this.test.currentQuestion.CorrectChoiceId;

    this.test.currentQuestion.Choices.forEach(choice => {
      if (choice.ChoiceId == CorrectChoiceId) {
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
      //console.log(this.test.QuestionOrder);
      //console.log(this.test.QuestionOrder[0]);
      ////console.log("Current Question Number" + currentQuestionNumber);
      return this.test.QuestionOrder[0];

    } else {

      questionCount = this.test.questionCount - 1;
      return currentQuestionNumber = this.test.QuestionOrder[questionCount];
    }

  }

  CorrectSoRemove(): void {

    if (this.test.QuestionOrder.length == 1) {
      this.isTTOrSSComplete = true;
    }
    //Remove value from index
    if (this.TestMode == "SS") {
      this.test.QuestionOrder.splice(0, 1);
      //console.log("Correct After Splice Before Shuffle: " + this.test.QuestionOrder);
      this.test.QuestionOrder = this.shuffle(this.test.QuestionOrder);
      //console.log("Correct After Splice After Shuffle: " + this.test.QuestionOrder);

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
      //console.log("Incorrect After Push and Before shuffle: " + this.test.QuestionOrder);
      this.test.QuestionOrder = this.shuffle(this.test.QuestionOrder);
      //console.log("Incorrect After Push and After shuffle: " + this.test.QuestionOrder);
    }

  }

  SSCorrectOrIncorrect(): void {
    if (this.userChoiceID == this.test.currentQuestion.CorrectChoiceId) {
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
    //console.log("Current Question Number before setting time: " + this.test.QuestionOrder[0]);
    //console.log("Question no: " + this.getCurrentQuestionNumber());
    var attemptIndex = this.test.QuestionOrder[0] - 1;
    //console.log(this.NewAttempts);
    //console.log("Attempt Index: " + attemptIndex);

    var currentAttemptsLength = this.NewAttempts[attemptIndex].length;
    /*  if (currentAttemptsLength == 0) {
        this.NewAttempts[attemptIndex][currentAttemptsLength].TimeTaken = this.counter0;
      } else {
        this.NewAttempts[attemptIndex][currentAttemptsLength - 1].TimeTaken = this.counter0;
      }*/
    this.NewAttempts[attemptIndex][currentAttemptsLength - 1].TimeTaken = this.counter0;
  }

  ISRMarkOrUnmarkQuestion(value: number, state: boolean, question: afterUGExtendedCustom.afterugExtended.QuestionObjectISR) {
    var qID = Number(value);
    if (state == true) {
      //console.log("marked");
      this.MarkedQuestions.push(qID);
      //console.log(this.MarkedQuestions);
      question.IsMarked = true;
    } else {
      var uniqMarked = this.MarkedQuestions.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
      this.MarkedQuestions = uniqMarked;
      for (var i = 0; i < this.MarkedQuestions.length; i++) {
        if (qID == this.MarkedQuestions[i]) {
          this.MarkedQuestions.splice(i, 1);

          this.UnMarkedQuestionIDArray.push(value);
          //console.log("UnMarked");
          //console.log(this.UnMarkedQuestionIDArray);
          question.IsMarked = false;
          //To do . FInally reduce markedQuestions and UnMarkedQuestionIDArray
        }
      }

    }

  }

  MarkOrUnmarkQuestion() {
    this.IsMarked = !this.IsMarked;
    if (this.IsMarked == true) {
      this.MarkedQuestions.push(this.test.currentQuestion.QuestionId);
      alert("Word is marked");
      //console.log(this.MarkedQuestions);
    } else {
      for (var i = 0; i < this.MarkedQuestions.length; i++) {
        if (this.MarkedQuestions[i] == this.test.currentQuestion.QuestionId) {
          this.MarkedQuestions.splice(i, 1);
          this.UnMarkedQuestionIDArray.push(this.test.currentQuestion.QuestionId);
          //console.log(this.MarkedQuestions);
          alert("Word is Unmarked");
          //console.log("UnMarked");
          //console.log(this.UnMarkedQuestionIDArray);
        }
      }
    }
  }

  ISRDontShowQuestionChecked(value: number, state: boolean, question: afterUGExtendedCustom.afterugExtended.QuestionObjectISR) {
    var qID = Number(value);
    if (state == true) {
      //console.log("Dont Show this question");
      this.DontShowQuestions.push(qID);

      //console.log(this.DontShowQuestions);
      question.IsDontShowQuestion = true;
    } else {
      var uniqDontShow = this.DontShowQuestions.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
      this.DontShowQuestions = uniqDontShow;
      for (var i = 0; i < this.DontShowQuestions.length; i++) {
        if (qID == this.DontShowQuestions[i]) {
          this.DontShowQuestions.splice(i, 1);


          //console.log("Will show question");
          //console.log(this.DontShowQuestions);
          question.IsDontShowQuestion = false;
          //To do . FInally reduce markedQuestions and UnMarkedQuestionIDArray
        }
      }

    }
  }

  DontShowQuestionChecked() {
    this.IsDontShowQuestion = !this.IsDontShowQuestion;
    if (this.IsDontShowQuestion == true) {
      this.DontShowQuestions.push(this.test.currentQuestion.QuestionId);
      //Dummy comment for git testing develop branch another commit
      alert("This question will not be shown in future");
      //console.log(this.DontShowQuestions);
    } else {
      for (var i = 0; i < this.DontShowQuestions.length; i++) {
        if (this.DontShowQuestions[i] == this.test.currentQuestion.QuestionId) {
          this.DontShowQuestions.splice(i, 1);
          //this.UnMarkedQuestionIDArray.push(this.test.currentQuestion.QuestionId);
          //console.log(this.DontShowQuestions);
          alert("Dont show disabled. SO this question will be shown in future");
        }
      }
    }
  }

  SaveTTOrSSAndISRData() {
    alert("We are now going to save data");
    this.isISRComplete = true;
    this.ISRCompleteSaveData(this.FinalDataToBeSaved);
    alert("Done");
  }
  NextQuestion(): void {
    this.newQuestion++;
    if ((this.test.questionCount != this.test.QuestionList.length && this.TestMode == "TT") || (this.test.QuestionOrder.length != 1 && !(this.test.QuestionOrder.length <= 0) && this.TestMode == "SS")) {
      this.TaskForCurrentAttempt();
      this.RateDifficulty();
      this.TasksForNextAttempt();
    } else {
      if (this.TestMode = "TT") {
        this.TaskForCurrentAttempt();
        this.RateDifficulty();
        this.isTTOrSSComplete = true;
        this.TTOrSSCompleteDoFormalities();
      } else {
        if (this.test.QuestionOrder.length == 1) {

          this.TaskForCurrentAttempt();
          this.RateDifficulty();
          if (this.isTTOrSSComplete == false) {
            this.TasksForNextAttempt();
          } else {
            this.isTTOrSSComplete = true;
            this.TTOrSSCompleteDoFormalities();
          }
        }
      }

    }
  }

  ISRRateDifficulty(value: number, state: boolean, question: afterUGExtendedCustom.afterugExtended.QuestionObjectISR) {
    var qID = Number(value);
    ////console.log("From RateDifficulty Function: " + this.questionDifficulty);

    this.FinalUserDifficultyRatingArray.forEach(difficultyFromISR => {
      if (difficultyFromISR.QuestionId == question.QuestionsAfterUg.QuestionId) {
        difficultyFromISR.DifficultyLevel = value;
      }
    });
    ////console.log("ISR From Review Click FinalUserDifficultyRatingArray");
    ////console.log(this.FinalUserDifficultyRatingArray);
  }

  RateDifficulty() {
    ////console.log("From RateDifficulty Function: " + this.questionDifficulty);

    if (this.test.currentQuestion.QuestionDifficulty.length != 0) {
      this.test.currentQuestion.QuestionDifficulty[0].DifficultyLevel = this.questionDifficulty;
      ////console.log(this.test.currentQuestion.QuestionDifficulty[0]);
    } else {
      //create new question difficulty object and add it to the current question
      var newQuestionDifficulty = new afterUGExtended.afterugExtended.QuestionDifficulty();
      newQuestionDifficulty.QuestionId = this.test.currentQuestion.QuestionId;
      newQuestionDifficulty.UserWhoRatedDifficultyId = this.userID;
      newQuestionDifficulty.DifficultyLevel = this.questionDifficulty;
      this.test.currentQuestion.QuestionDifficulty.push(newQuestionDifficulty);
      ////console.log(this.test.currentQuestion.QuestionDifficulty[0]);
    }

  }

  getPercenTageCorrectAndIncorrectForAQuestion() {
    this.percentageCorrectIncorrectForCurrentQuestion = new afterUGExtendedCustom.afterugExtended.CurrentQuestionPercentageCorrectIncorrect();
    //percentageCorrectIncorrectTotalCount
    var TotalCount: number = 0;

    this.test.currentQuestion.PercentageCorrectIncorrect.forEach(element => {
      TotalCount = TotalCount + element.Count;

    });


    this.percentageCorrectIncorrectTotalCount = TotalCount;
    this.test.currentQuestion.PercentageCorrectIncorrect.forEach(element => {

      if (element.AnswerStatus == 0) {
        this.percentageCorrectIncorrectForCurrentQuestion.IncorrectCount = element.Count;
        this.percentageCorrectIncorrectForCurrentQuestion.IncorrectPercentage = ((element.Count * 100) / TotalCount);
      } else if (element.AnswerStatus == 1) {
        this.percentageCorrectIncorrectForCurrentQuestion.CorrectCount = element.Count;
        this.percentageCorrectIncorrectForCurrentQuestion.CorrectPercentage = ((element.Count * 100) / TotalCount);
      }
    });



  }
  getDifficultyForAQuestion() {
    this.currentQuestionDifficultySortArray = [];

    var TotalCount: number = 0;

    this.test.currentQuestion.DifficultyLevelsForAQuestionRatedByAllUsers.forEach(element => {
      TotalCount = TotalCount + element.Count;

    });
    this.difficultyTotalCount = TotalCount;

    for (var i = 0; i < this.test.currentQuestion.DifficultyLevelsForAQuestionRatedByAllUsers.length; i++) {

      var tempDifficultyLevel = this.test.currentQuestion.DifficultyLevelsForAQuestionRatedByAllUsers[i];
      var singleDifficulty = new afterUGExtendedCustom.afterugExtended.CurrentQuestionDifficultySort();
      singleDifficulty.TotalCount = this.difficultyTotalCount;
      singleDifficulty.DifficultyLevel = tempDifficultyLevel.DifficultyLevel;
      singleDifficulty.DifficultyCount = tempDifficultyLevel.Count;
      singleDifficulty.DifficultyPercentage = ((singleDifficulty.DifficultyCount * 100) / singleDifficulty.TotalCount);
      this.currentQuestionDifficultySortArray.push(singleDifficulty);
    }
    var sortedArray = this.currentQuestionDifficultySortArray.sort(this.compareDifficultyLevel);
    this.currentQuestionDifficultySortArray = sortedArray;
    if (this.currentQuestionDifficultySortArray.length != 0) {
      this.questionDifficulty = this.currentQuestionDifficultySortArray[0].DifficultyLevel;
    } else {
      this.questionDifficulty = 1;
    }




    //currentQuestionDifficultySort
  }
  TasksForNextAttempt() {

    this.test.questionCount = this.test.questionCount + 1;
    this.test.currentQuestion = this.test.QuestionList[this.getCurrentQuestionNumber() - 1];


    this.getDifficultyForAQuestion();
    this.getPercenTageCorrectAndIncorrectForAQuestion();
    this.randomizeChoices();
    this.setCurrentAttempt();
    this.resetTimer();
    this.IsMarked = false;
    this.IsDontShowQuestion = false;

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

  ISRCompleteSaveData(FinalDataToBeSavedToService: afterUGExtendedCustom.afterugExtended.DataToBeSavedObject) {
    this.testQuestionService.ISRCompleteSaveData(FinalDataToBeSavedToService)
      .subscribe(
      status => {
        alert(status);
      },
      err => {
        alert(err);
        ////console.log(err);
      });
  }

  prepareFinalDataForSaving() {
    this.FinalDataToBeSaved = new afterUGExtendedCustom.afterugExtended.DataToBeSavedObject();
    this.FinalDataToBeSaved.AttemptsToBeSaved = this.NewAttempts;
    this.FinalDataToBeSaved.DontShowQuestionsToBeSaved = this.DontShowQuestions;
    this.FinalDataToBeSaved.MarkedQuestionsToBeSaved = this.MarkedQuestions;
    this.FinalDataToBeSaved.UnMarkedQuestionsToBeSaved = this.UnMarkedQuestionIDArray;
    this.FinalDataToBeSaved.QuestionDifficultiesToBeSaved = this.FinalUserDifficultyRatingArray;
    this.FinalDataToBeSaved.UserId = this.userID;
  }

  saveDataAfterTest() {
    this.markedQuestionsCRUDDetermine();
    //this.saveMarkedData();
    //this.saveAttempsts(); // Uncomment later. This has to be called after ISR Ends
    this.prepareFinalDataForSaving();
    //this.ISRCompleteSaveData(this.FinalDataToBeSaved);
  }

  saveAttempsts() {
    this.testQuestionService.saveAttemptsToDB(this.NewAttempts)
      .subscribe(
      status => {
        alert(status);
      },
      err => {
        alert(err);
        ////console.log(err);
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
    //this.questionIDArrayAndUserIDObject.UserId = 
  }

  initialMarkedWordsPush() {
    for (var i = 0; i < this.test.QuestionList.length; i++) {
      if (this.test.QuestionList[i].TestMarkAquestion.length != 0) {

        this.MarkedQuestions.push(this.test.QuestionList[i].QuestionId);
      }
      ////console.log("Marked Questions from initial push");
      ////console.log(this.MarkedQuestions);
    }
    this.UnMarkedQuestionIDArray = [];
  }

  markedQuestionsCRUDDetermine() {
    var uniqMarked = this.MarkedQuestions.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
    this.MarkedQuestions = uniqMarked;
    var uniqUnMarked = this.UnMarkedQuestionIDArray.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
    this.UnMarkedQuestionIDArray = uniqUnMarked;

    ////console.log("Unmarked to delete");
    ////console.log(this.UnMarkedQuestionIDArray);
    ////console.log("marked to update");
    ////console.log(this.MarkedQuestions);
  }
  markOrUnMarkTheCurrentQuestion() {
    if (this.test.currentQuestion.TestMarkAquestion.length == 0) {
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
        this.userID = this.questionIDArrayAndUserIDAndTestMode.UserId;
        this.test.questionCount = 1;
        
        this.test.QuestionList = questions;
        console.log("questions json: ");
        console.log(questions);
        console.log("questions object: ");
        console.log(this.test.QuestionList);
        this.randomizeQuestions();
        //////console.log("FirstQuestionLoad: " + this.test.QuestionOrder);
        ////console.log("Question to pick first in the array question order: " + this.getCurrentQuestionNumber());
        for (var i = 0; i < this.test.QuestionList.length; i++) {
          ////console.log("QuestionList: " + this.test.QuestionList[i].QuestionId);
        }
        ////console.log("corresponding Element in question LIst: " + this.test.QuestionList[this.getCurrentQuestionNumber() - 1].QuestionId);
        this.test.currentQuestion = this.test.QuestionList[this.getCurrentQuestionNumber() - 1];
        this.randomizeChoices();
        this.NewAttempts = [];
        //this.ISRMarkedArray = [];
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

        this.getDifficultyForAQuestion();
        this.getPercenTageCorrectAndIncorrectForAQuestion();
      },
      err => {
        ////console.log(err);
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
      ////console.log('timer 0 Unsubscribed.');
    } else {
      // Subscribe if timer Id is undefined
      this.timer0Id = this.st.subscribe('1sec', e => this.timer0callback());
      this.timer0button = 'Unsubscribe';
      ////console.log('timer 0 Subscribed.');
    }
    ////console.log(this.st.getSubscription());
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
      ////console.log("FirstQuestionLoad before shuffle: " + this.test.QuestionOrder);
      this.shuffle(this.test.QuestionOrder);
      ////console.log("FirstQuestionLoad after shuffle: " + this.test.QuestionOrder);

    }

  }

  randomizeChoices() {

    this.test.currentQuestion.OriginalChoiceOrder = [];
    this.test.currentQuestion.RandomChoiceOrder = [];
    this.test.currentQuestion.FinalFourShuffledChoices = [];
    console.log("Choices for question");
    console.log(this.test.currentQuestion.Choices);
    console.log("Choices length");
    console.log(this.test.currentQuestion.Choices.length);
    for (var i = 1; i <= this.test.currentQuestion.Choices.length; i++) {
      var choice = new afterUGExtended.afterugExtended.Choices();
      choice = this.test.currentQuestion.Choices[i - 1];
      this.test.currentQuestion.OriginalChoiceOrder.push(choice);
    }


    // Assign originalChoice order to randomchoice order
    this.test.currentQuestion.RandomChoiceOrder = this.test.currentQuestion.OriginalChoiceOrder;
    console.log("Random Choice Order Before Shuffle");
    console.log(this.test.currentQuestion.RandomChoiceOrder);
    //Shuffle the randomchoiceorder array
    this.shuffle(this.test.currentQuestion.RandomChoiceOrder);
    console.log("Random Choice Order After Shuffle");
    console.log(this.test.currentQuestion.RandomChoiceOrder);
    //Remove the correctchoiceid from random choice order array
    //var indexDummy = this.test.currentQuestion.RandomChoiceOrder.indexOf(this.test.currentQuestion.CorrectChoiceId, 0);

    var index: number;
    var correctChoice: afterUGExtended.afterugExtended.Choices;
    for (var i = 1; i <= this.test.currentQuestion.Choices.length; i++) {
      var tempChoice: afterUGExtended.afterugExtended.Choices;
      tempChoice = this.test.currentQuestion.RandomChoiceOrder[i - 1];
      if (this.test.currentQuestion.CorrectChoiceId == tempChoice.ChoiceId) {
        index = i - 1;
        correctChoice = tempChoice;
        console.log("CorrectChoice: ");
        console.log(correctChoice);
      }
    }
    console.log("index: " + index);
    //if (index > -1) {
      this.test.currentQuestion.RandomChoiceOrder.splice(index, 1);
    //}
    console.log("Random Choice Order After Shuffle and after splice removing correct choice");
    console.log(this.test.currentQuestion.RandomChoiceOrder);
    //insert correctchoiceid in the beginning of finalfourchoices array. Add other 3 choices from first 3 elements of randomchoiceorder
    for (var i = 1; i <= 4; i++) {
      if (i == 1) {
        this.test.currentQuestion.FinalFourShuffledChoices[i - 1] = correctChoice;
      } else {
        this.test.currentQuestion.FinalFourShuffledChoices.push(this.test.currentQuestion.RandomChoiceOrder[i - 2]);
      }

    }
    console.log("Final four choice before shuffle");
    console.log(this.test.currentQuestion.FinalFourShuffledChoices);
    //shuffle the final4 choiceorder array
    this.shuffle(this.test.currentQuestion.FinalFourShuffledChoices);
    console.log("Final four choice after shuffle");
    console.log(this.test.currentQuestion.FinalFourShuffledChoices);
    //Bind to the UI
    ////console.log(this.test.currentQuestion.FinalFourShuffledChoices);
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