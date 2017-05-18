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
    }
}