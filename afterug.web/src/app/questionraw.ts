//import { Choices } from './choices';
/// <reference path = "./models.ts" />
import * as afterUGExtended from "./models";


export class QuestionRawExtended extends afterUGExtended.afterugExtended.QuestionsAfterUg {

  NewAttempt: afterUGExtended.afterugExtended.Attempts;
  IsCorrectChoiceVerified: boolean;
  //CorrectChoiceId: number;
  OriginalChoiceOrder: afterUGExtended.afterugExtended.Choices[];
  RandomChoiceOrder: afterUGExtended.afterugExtended.Choices[];
  FinalFourShuffledChoices: afterUGExtended.afterugExtended.Choices[];
  difficultyLevelsForAQuestionRatedByAllUsers: any[];
  percentageCorrectIncorrect: any[];
}

