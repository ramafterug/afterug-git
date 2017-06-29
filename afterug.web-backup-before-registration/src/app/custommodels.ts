/// <reference path = "./models.ts" />
import * as afterUGExtended from "./models";

export namespace afterugExtended {

    export class TestMarkAQuestion {
        QuestionID: number;
        QuestionsAfterUG: afterUGExtended.afterugExtended.QuestionsAfterUG;
        TestMarkID: number;
        UserID: number;
        Users: afterUGExtended.afterugExtended.Users;
    }

    export class TokenFromServer {
        Token: string;

    }
    export class QuestionIDArrayAndUserIDAndTestMode {
        UserID: number;
        TestMode:string;
        QuestionIDArray: number[];


    }

    export class QuestionObjectISR{
        TimeTaken:number;
         QuestionsAfterUG: afterUGExtended.afterugExtended.QuestionsAfterUG;
         UserChoiceID:number;
         UserChoiceText:string;
         IncorrectChoicesChoiceIDArray:number[];
         IsMarked:boolean = false;
         IsDontShowQuestion:boolean = false;
         HardMediumOrEasy:number;
    }

    export class CurrentQuestionDifficultySort{
        DifficultyLevel:number;
        DifficultyCount:number;
        TotalCount:number;
        DifficultyPercentage:number;
    }

    export class CurrentQuestionPercentageCorrectIncorrect{
        
        CorrectCount:number;
        IncorrectCount:number;
        TotalCount:number;
        CorrectPercentage:number;
        IncorrectPercentage:number;
    }

    export class DataToBeSavedObject{
        AttemptsToBeSaved:afterUGExtended.afterugExtended.Attempts[][];//NewAttempts: afterUGExtended.afterugExtended.Attempts[][];
        MarkedQuestionsToBeSaved:number[]; //MarkedQuestions: number[];
        UnMarkedQuestionsToBeSaved:number[]; //UnMarkedQuestions: number[];
        DontShowQuestionsToBeSaved: number[];//DontShowQuestions: number[];
        QuestionDifficultiesToBeSaved:afterUGExtended.afterugExtended.QuestionDifficulty[];//FinalUserDifficultyRatingArray
        UserID:number;
    }

    export class UserNotes {
		ApprovedByAdminUserID: number;
		ForgetNotes: afterUGExtended.afterugExtended.ForgetNotes[];
		IsApprovedForPublicDisplay: boolean;
		IsToBeDisplayed: boolean;
		NoteText: string;
		QuestionID: number;
		QuestionsAfterUG: afterUGExtended.afterugExtended.QuestionsAfterUG;
		UserID: number;
		UserNotesID: number;
		Users: afterUGExtended.afterugExtended.Users;
		
	}
}