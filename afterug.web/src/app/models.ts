
 
 

 



export namespace afterugExtended {
	export class  AfterUGNotePoints {
		AfterUGNotePointID: number;
		AfterUGNotePointsTags: afterugExtended.AfterUGNotePointsTags[];
		AfterUGNotePointText: string;
	}
	export class  AfterUGNotePointsTags {
		AfterUGNotePointID: number;
		AfterUGNotePoints: afterugExtended.AfterUGNotePoints;
		AfterUGNotePointsTagsID: number;
		TagID: number;
		Tags: afterugExtended.Tags;
	}
	export class  Attempts {
		AnswerStatus: number;
		AttemptID: number;
		AttemptNumber: number;
		CorrectAnswer: string;
		Hits: afterugExtended.Hits[];
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		TestOrStudySession: string;
		TimeTaken: number;
		UserFinalHitAnswer: number;
		UserID: number;
		Users: afterugExtended.Users;
	}
	export class  Chapter {
		ChapterDescription: string;
		ChapterID: number;
		ChapterName: string;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG[];
	}
	export class  Choices {
		ChoiceID: number;
		ChoiceText: string;
		IsChoiceReviewed: boolean;
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
	}
	export class  DontShowQuestion {
		DontShowQuestionID: number;
		QuestionID: number;
		UserID: number;
	}
	export class  ForgetNotes {
		ForgetNotesID: number;
		ForgetStatus: boolean;
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		UserNotes: afterugExtended.UserNotes;
		UserNotesID: number;
		Users: afterugExtended.Users;
		UserWhoWantsToForgetNotesID: number;
	}
	export class  GlobalSettings {
		GlobalSettingsID: number;
		NoOfChoicesPerQuestion: number;
		NoOfQuestionsPerTest: number;
		NoOfRepetitionsCorrect: number;
		NoOfRepetitionsIncorrect: number;
	}
	export class  Hits {
		AttemptID: number;
		Attempts: afterugExtended.Attempts;
		HitID: number;
		UserChoiceIDForTheHit: number;
		UserChoiceTextForTheHit: string;
		WhichNoOfHit: number;
	}
	export class  QuestionDifficulty {
		DifficultyLevel: number;
		QuestionDifficultyID: number;
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		Users: afterugExtended.Users;
		UserWhoRatedDifficultyID: number;
	}
	export class  QuestionsAfterUG {
		Attempts: afterugExtended.Attempts[];
		Chapter: afterugExtended.Chapter;
		ChapterID: number;
		Choices: afterugExtended.Choices[];
		CorrectChoiceID: number;
		ForgetNotes: afterugExtended.ForgetNotes[];
		IsCorrectChoiceVerified: boolean;
		IsQuestionReviewed: boolean;
		IsQuestionSpinned: boolean;
		Question: string;
		QuestionDifficulty: afterugExtended.QuestionDifficulty[];
		QuestionID: number;
		QuestionTags: afterugExtended.QuestionTags[];
		QuestionType: number;
		TestMarkAQuestion: afterugExtended.TestMarkAQuestion[];
		UserNotes: afterugExtended.UserNotes[];
	}
	export class  QuestionTags {
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		QuestionTagsID: number;
		TagID: number;
		Tags: afterugExtended.Tags;
	}
	export class  Tags {
		AfterUGNotePointsTags: afterugExtended.AfterUGNotePointsTags[];
		Description: string;
		QuestionTags: afterugExtended.QuestionTags[];
		TagID: number;
		TagName: string;
	}
	export class  TestChild {
		IsQuestionAttended: boolean;
		QuestionID: number;
		TestID: number;
		UserID: number;
	}
	export class  TestMarkAQuestion {
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		TestMarkID: number;
		UserID: number;
		Users: afterugExtended.Users;
	}
	export class  TestMaster {
		IsReview: boolean;
		IsTestComplete: boolean;
		IsTestOrStudySession: boolean;
		TestID: number;
		UserID: number;
		Users: afterugExtended.Users;
	}
	export class  UserNotes {
		ApprovedByAdminUserID: number;
		ForgetNotes: afterugExtended.ForgetNotes[];
		IsApprovedForPublicDisplay: boolean;
		IsToBeDisplayed: boolean;
		NoteText: string;
		QuestionID: number;
		QuestionsAfterUG: afterugExtended.QuestionsAfterUG;
		UserID: number;
		UserNotesID: number;
		Users: afterugExtended.Users;
		Users1: afterugExtended.Users;
	}
	export class  Users {
		Attempts: afterugExtended.Attempts[];
		ForgetNotes: afterugExtended.ForgetNotes[];
		Password: string;
		QuestionDifficulty: afterugExtended.QuestionDifficulty[];
		TestMarkAQuestion: afterugExtended.TestMarkAQuestion[];
		TestMaster: afterugExtended.TestMaster[];
		UserID: number;
		UserNameOrEmailAddress: string;
		UserNotes: afterugExtended.UserNotes[];
		UserNotes1: afterugExtended.UserNotes[];
		UserSettings: afterugExtended.UserSettings[];
	}
	export class  UserSettings {
		NoOfChoicesPerQuestion: number;
		NoOfQuestionsPerTest: number;
		NoOfRepetitionsCorrect: number;
		NoOfRepetitionsIncorrect: number;
		UserID: number;
		Users: afterugExtended.Users;
		UserSettingsID: number;
	}
}


