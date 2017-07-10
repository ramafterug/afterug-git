/// <reference path = "../models.ts" />
import * as afterUGExtended from "../models";
import { QuestionRawExtended } from '../questionraw';

export class Test {
    QuestionList: QuestionRawExtended[];
    Score: number = 0;
    questionCount: number;
    currentQuestion:  QuestionRawExtended;
    QuestionOrder: number[];
    
    IsQuestionRandom:boolean = false;
    IsChoiceRandom:boolean = true;
    CorrectNoOfTimesToShow:number;
    IncorrectNoOfTimesToAdd:number;
    
    
}