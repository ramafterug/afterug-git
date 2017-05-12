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
    export class QuestionIDArrayAndUserID {
        UserID: number;
        QuestionIDArray: number[];


    }
}