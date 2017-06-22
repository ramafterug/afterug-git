//import { Choices } from './choices';
/// <reference path = "./models.ts" />
import * as afterUGExtended from "./models";


export class QuestionRawExtended extends afterUGExtended.afterugExtended.QuestionsAfterUG {

  NewAttempt: afterUGExtended.afterugExtended.Attempts;
  IsCorrectChoiceVerified: boolean;
  CorrectChoiceID: number;
  OriginalChoiceOrder: afterUGExtended.afterugExtended.Choices[];
  RandomChoiceOrder: afterUGExtended.afterugExtended.Choices[];
  FinalFourShuffledChoices: afterUGExtended.afterugExtended.Choices[];
  DifficultyLevelsForAQuestionRatedByAllUsers: any[];
  PercentageCorrectIncorrect: any[];
}

