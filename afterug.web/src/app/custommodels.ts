/// <reference path = "./models.ts" />
import * as afterUGExtended from "./models";

export namespace afterugExtended {

    export class TestMarkAquestion {
        QuestionId: number;
        QuestionsAfterUg: afterUGExtended.afterugExtended.QuestionsAfterUg;
        TestMarkId: number;
        UserId: number;
        Users: afterUGExtended.afterugExtended.Users;
    }

    export class TokenFromServer {
        Token: string;

    }
    export class QuestionIdArrayAndUserIdAndTestMode {
        UserId: number;
        TestMode:string;
        QuestionIdArray: number[];


    }

    export class QuestionObjectISR{
        TimeTaken:number;
         QuestionsAfterUg: afterUGExtended.afterugExtended.QuestionsAfterUg;
         UserChoiceId:number;
         UserChoiceText:string;
         IncorrectChoicesChoiceIdArray:number[];
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
        UserId:number;
    }

    export class UserNotes {
		ApprovedByAdminUserId: number;
		ForgetNotes: afterUGExtended.afterugExtended.ForgetNotes[];
		IsApprovedForPublicDisplay: boolean;
		IsToBeDisplayed: boolean;
		NoteText: string;
		QuestionId: number;
		QuestionsAfterUg: afterUGExtended.afterugExtended.QuestionsAfterUg;
		UserId: number;
		UserNotesId: number;
		Users: afterUGExtended.afterugExtended.Users;
		
	}
}