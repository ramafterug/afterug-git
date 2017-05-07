  
export namespace afterugExtended {
  
	export class AfterUGNotePoints {
		AfterUGNotePointID: number;
		AfterUGNotePointsTags: afterugExtended.AfterUGNotePointsTags[];
		AfterUGNotePointText: string;
	}
	export class AfterUGNotePointsTags {
		AfterUGNotePointID: number;
		AfterUGNotePoints: afterugExtended.AfterUGNotePoints;
		AfterUGNotePointsTagsID: number;
		TagID: number;
		Tags: afterugExtended.Tags;
	}
	export class Attempts {
		AttemptID: number;
		AttemptNumber: number;
		Hits: afterugExtended.Hits[];
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		TestOrStudySession: string;
		TimeTaken: number;
		UserFinalHitAnswer: number;
		UserID: number;
		Users: afterugExtended.Users;
	}
	export class Choices {
		ChoiceID: number;
		ChoiceText: string;
		IsChoiceReviewed: boolean;
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
	}
	export class ForgetNotes {
		ForgetNotesID: number;
		ForgetStatus: boolean;
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		UserAfterUGNotes: afterugExtended.UserAfterUGNotes;
		UserAfterUGNotesID: number;
		Users: afterugExtended.Users;
		UserWhoWantsToForgetNotesID: number;
	}
	export class Hits {
		AttemptID: number;
		Attempts: afterugExtended.Attempts;
		HitID: number;
		UserAnswerForTheHit: number;
		WhichNoOfHit: number;
	}
	export class QuestionsAfterUG {
		Attempts: afterugExtended.Attempts[];
		Choices: afterugExtended.Choices[];
		CorrectChoiceID: number;
		ForgetNotes: afterugExtended.ForgetNotes[];
		IsCorrectChoiceVerified: boolean;
		IsQuestionReviewed: boolean;
		IsQuestionSpinned: boolean;
		Question: string;
		QuestionID: number;
		QuestionTags: afterugExtended.QuestionTags[];
		QuestionType: number;
		UserAfterUGNotes: afterugExtended.UserAfterUGNotes[];
		UserNotes: afterugExtended.UserNotes[];
	}
	export class QuestionTags {
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		QuestionTagsID: number;
		TagID: number;
		Tags: afterugExtended.Tags;
	}
	export class Tags {
		AfterUGNotePointsTags: afterugExtended.AfterUGNotePointsTags[];
		Description: string;
		QuestionTags: afterugExtended.QuestionTags[];
		TagID: number;
		TagName: string;
	}
	export class UserAfterUGNotes {
		ForgetNotes: afterugExtended.ForgetNotes[];
		IsToBeDisplayed: boolean;
		NoteText: string;
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		UserAfterUGNotesID: number;
		Users: afterugExtended.Users;
		UserWhoCreatedNotesID: number;
	}
	export class UserNotes {
		IsToBeDisplayed: boolean;
		NoteText: string;
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		UserID: number;
		UserNotesID: number;
		Users: afterugExtended.Users;
	}
	export class Users {
		Attempts: afterugExtended.Attempts[];
		ForgetNotes: afterugExtended.ForgetNotes[];
		Password: string;
		UserAfterUGNotes: afterugExtended.UserAfterUGNotes[];
		UserID: number;
		UserNameOrEmailAddress: string;
		UserNotes: afterugExtended.UserNotes[];
	}
	export class TestMarkAQuestion {
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		TestMarkID: number;
		UserID: number;
		Users: afterugExtended.Users;
	}

	export class TokenFromServer {
		Token: string;
		
	}
export class QuestionIDArrayAndUserID {
		UserID: number;
		QuestionIDArray: number[];

		
	}

	
    }



