
 
 

 

/// <reference path="Enums.ts" />

declare namespace afterug.core.middlelayer {
	interface AfterUGNotePoints {
		AfterUGNotePointID: number;
		AfterUGNotePointsTags: afterug.core.middlelayer.AfterUGNotePointsTags[];
		AfterUGNotePointText: string;
	}
	interface AfterUGNotePointsTags {
		AfterUGNotePointID: number;
		AfterUGNotePoints: afterug.core.middlelayer.AfterUGNotePoints;
		AfterUGNotePointsTagsID: number;
		TagID: number;
		Tags: afterug.core.middlelayer.Tags;
	}
	interface Attempts {
		AttemptID: number;
		AttemptNumber: number;
		Hits: afterug.core.middlelayer.Hits[];
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		TestOrStudySession: string;
		TimeTaken: number;
		UserFinalHitAnswer: number;
		UserID: number;
		Users: afterug.core.middlelayer.Users;
	}
	interface Choices {
		ChoiceID: number;
		ChoiceText: string;
		IsChoiceReviewed: boolean;
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
	}
	interface ForgetNotes {
		ForgetNotesID: number;
		ForgetStatus: boolean;
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		UserAfterUGNotes: afterug.core.middlelayer.UserAfterUGNotes;
		UserAfterUGNotesID: number;
		Users: afterug.core.middlelayer.Users;
		UserWhoWantsToForgetNotesID: number;
	}
	interface Hits {
		AttemptID: number;
		Attempts: afterug.core.middlelayer.Attempts;
		HitID: number;
		UserAnswerForTheHit: number;
		WhichNoOfHit: number;
	}
	interface QuestionsAfterUG {
		Attempts: afterug.core.middlelayer.Attempts[];
		Choices: afterug.core.middlelayer.Choices[];
		CorrectChoiceID: number;
		ForgetNotes: afterug.core.middlelayer.ForgetNotes[];
		IsCorrectChoiceVerified: boolean;
		IsQuestionReviewed: boolean;
		IsQuestionSpinned: boolean;
		Question: string;
		QuestionID: number;
		QuestionTags: afterug.core.middlelayer.QuestionTags[];
		QuestionType: number;
		TestMarkAQuestion: afterug.core.middlelayer.TestMarkAQuestion[];
		UserAfterUGNotes: afterug.core.middlelayer.UserAfterUGNotes[];
		UserNotes: afterug.core.middlelayer.UserNotes[];
	}
	interface QuestionTags {
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		QuestionTagsID: number;
		TagID: number;
		Tags: afterug.core.middlelayer.Tags;
	}
	interface Tags {
		AfterUGNotePointsTags: afterug.core.middlelayer.AfterUGNotePointsTags[];
		Description: string;
		QuestionTags: afterug.core.middlelayer.QuestionTags[];
		TagID: number;
		TagName: string;
	}
	interface TestMarkAQuestion {
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		TestMarkID: number;
		UserID: number;
		Users: afterug.core.middlelayer.Users;
	}
	interface UserAfterUGNotes {
		ForgetNotes: afterug.core.middlelayer.ForgetNotes[];
		IsToBeDisplayed: boolean;
		NoteText: string;
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		UserAfterUGNotesID: number;
		Users: afterug.core.middlelayer.Users;
		UserWhoCreatedNotesID: number;
	}
	interface UserNotes {
		IsToBeDisplayed: boolean;
		NoteText: string;
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		UserID: number;
		UserNotesID: number;
		Users: afterug.core.middlelayer.Users;
	}
	interface Users {
		Attempts: afterug.core.middlelayer.Attempts[];
		ForgetNotes: afterug.core.middlelayer.ForgetNotes[];
		Password: string;
		TestMarkAQuestion: afterug.core.middlelayer.TestMarkAQuestion[];
		UserAfterUGNotes: afterug.core.middlelayer.UserAfterUGNotes[];
		UserID: number;
		UserNameOrEmailAddress: string;
		UserNotes: afterug.core.middlelayer.UserNotes[];
	}
}


