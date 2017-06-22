
 
 

 

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
		AnswerStatus: number;
		AttemptID: number;
		AttemptNumber: number;
		CorrectAnswer: string;
		Hits: afterug.core.middlelayer.Hits[];
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		TestOrStudySession: string;
		TimeTaken: number;
		UserFinalHitAnswer: number;
		UserID: number;
		Users: afterug.core.middlelayer.Users;
	}
	interface AUGNotes {
		AUGNotePointText: string;
		AUGNotesAddedByEmployeeUserID: number;
		AUGNotesApprovedByEmployeeUserID: number;
		AUGNotesID: number;
		IsToBeDisplayed: boolean;
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		Users: afterug.core.middlelayer.Users;
		Users1: afterug.core.middlelayer.Users;
	}
	interface Chapter {
		ChapterDescription: string;
		ChapterID: number;
		ChapterName: string;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG[];
	}
	interface Choices {
		ChoiceID: number;
		ChoiceText: string;
		IsChoiceReviewed: boolean;
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
	}
	interface DontShowQuestion {
		DontShowQuestionID: number;
		QuestionID: number;
		UserID: number;
	}
	interface ForgetNotes {
		ForgetNotesID: number;
		ForgetStatus: boolean;
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		UserNotes: afterug.core.middlelayer.UserNotes;
		UserNotesID: number;
		Users: afterug.core.middlelayer.Users;
		UserWhoWantsToForgetNotesID: number;
	}
	interface GlobalSettings {
		GlobalSettingsID: number;
		NoOfChoicesPerQuestion: number;
		NoOfQuestionsPerTest: number;
		NoOfRepetitionsCorrect: number;
		NoOfRepetitionsIncorrect: number;
	}
	interface Hits {
		AttemptID: number;
		Attempts: afterug.core.middlelayer.Attempts;
		HitID: number;
		UserChoiceIDForTheHit: number;
		UserChoiceTextForTheHit: string;
		WhichNoOfHit: number;
	}
	interface QuestionDifficulty {
		DifficultyLevel: number;
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		Users: afterug.core.middlelayer.Users;
		UserWhoRatedDifficultyID: number;
	}
	interface QuestionsAfterUG {
		Attempts: afterug.core.middlelayer.Attempts[];
		AUGNotes: afterug.core.middlelayer.AUGNotes[];
		Chapter: afterug.core.middlelayer.Chapter;
		ChapterID: number;
		Choices: afterug.core.middlelayer.Choices[];
		CorrectChoiceID: number;
		ForgetNotes: afterug.core.middlelayer.ForgetNotes[];
		IsCorrectChoiceVerified: boolean;
		IsQuestionReviewed: boolean;
		IsQuestionSpinned: boolean;
		Question: string;
		QuestionDifficulty: afterug.core.middlelayer.QuestionDifficulty[];
		QuestionID: number;
		QuestionTags: afterug.core.middlelayer.QuestionTags[];
		QuestionType: number;
		TestMarkAQuestion: afterug.core.middlelayer.TestMarkAQuestion[];
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
	interface TestChild {
		IsQuestionAttended: boolean;
		QuestionID: number;
		TestID: number;
		UserID: number;
	}
	interface TestMarkAQuestion {
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		TestMarkID: number;
		UserID: number;
		Users: afterug.core.middlelayer.Users;
	}
	interface TestMaster {
		IsReview: boolean;
		IsTestComplete: boolean;
		IsTestOrStudySession: boolean;
		TestID: number;
		UserID: number;
		Users: afterug.core.middlelayer.Users;
	}
	interface UserNotes {
		ApprovedByAdminUserID: number;
		ForgetNotes: afterug.core.middlelayer.ForgetNotes[];
		IsApprovedForPublicDisplay: boolean;
		IsToBeDisplayed: boolean;
		NoteText: string;
		QuestionID: number;
		QuestionsAfterUG: afterug.core.middlelayer.QuestionsAfterUG;
		UserID: number;
		UserNotesID: number;
		Users: afterug.core.middlelayer.Users;
		Users1: afterug.core.middlelayer.Users;
	}
	interface Users {
		Attempts: afterug.core.middlelayer.Attempts[];
		AUGNotes: afterug.core.middlelayer.AUGNotes[];
		AUGNotes1: afterug.core.middlelayer.AUGNotes[];
		ForgetNotes: afterug.core.middlelayer.ForgetNotes[];
		Password: string;
		QuestionDifficulty: afterug.core.middlelayer.QuestionDifficulty[];
		TestMarkAQuestion: afterug.core.middlelayer.TestMarkAQuestion[];
		TestMaster: afterug.core.middlelayer.TestMaster[];
		UserID: number;
		UserNameOrEmailAddress: string;
		UserNotes: afterug.core.middlelayer.UserNotes[];
		UserNotes1: afterug.core.middlelayer.UserNotes[];
		UserSettings: afterug.core.middlelayer.UserSettings[];
	}
	interface UserSettings {
		NoOfChoicesPerQuestion: number;
		NoOfQuestionsPerTest: number;
		NoOfRepetitionsCorrect: number;
		NoOfRepetitionsIncorrect: number;
		UserID: number;
		Users: afterug.core.middlelayer.Users;
		UserSettingsID: number;
	}
}


