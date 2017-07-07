export namespace afterugExtended {
	export class AfterUgnotePoints {
		AfterUgnotePointId: number;
		AfterUgnotePointsTags: afterugExtended.AfterUgnotePointsTags[];
		AfterUgnotePointText: string;
	}

	export class AfterUgnotePointsTags {
		AfterUgnotePoint: afterugExtended.AfterUgnotePoints;
		AfterUgnotePointId: number;
		AfterUgnotePointsTagsId: number;
		Tag: afterugExtended.Tags;
		TagId: number;
	}

	export class Attempts {
		AnswerStatus: number;
		AttemptId: number;
		AttemptNumber: number;
		CorrectAnswer: string;
		Hits: afterugExtended.Hits[];
		Question: afterugExtended.QuestionsAfterUg;
		QuestionId: number;
		TestOrStudySession: string;
		TimeTaken: number;
		User: afterugExtended.Users;
		UserFinalHitAnswer: number;
		UserId: number;
	}
	export class Augnotes {
		AugnotePointText: string;
		AugnotesAddedByEmployeeUser: afterugExtended.Users;
		AugnotesAddedByEmployeeUserId: number;
		AugnotesApprovedByEmployeeUser: afterugExtended.Users;
		AugnotesApprovedByEmployeeUserId: number;
		AugnotesId: number;
		IsToBeDisplayed: boolean;
		Question: afterugExtended.QuestionsAfterUg;
		QuestionId: number;
	}
	export class Chapter {
		ChapterDescription: string;
		ChapterId: number;
		ChapterName: string;
		QuestionsAfterUg: afterugExtended.QuestionsAfterUg[];
	}
	export class Choices {
		ChoiceId: number;
		ChoiceText: string;
		IsChoiceReviewed: boolean;
		Question: afterugExtended.QuestionsAfterUg;
		QuestionId: number;
	}
	export class DontShowQuestion {
		DontShowQuestionId: number;
		QuestionId: number;
		UserId: number;
	}
	export class ForgetNotes {
		ForgetNotesId: number;
		ForgetStatus: boolean;
		Question: afterugExtended.QuestionsAfterUg;
		QuestionId: number;
		UserNotes: afterugExtended.UserNotes;
		UserNotesId: number;
		UserWhoWantsToForgetNotes: afterugExtended.Users;
		UserWhoWantsToForgetNotesId: number;
	}
	export class GlobalSettings {
		GlobalSettingsId: number;
		NoOfChoicesPerQuestion: number;
		NoOfQuestionsPerTest: number;
		NoOfRepetitionsCorrect: number;
		NoOfRepetitionsIncorrect: number;
	}
	export class Hits {
		Attempt: afterugExtended.Attempts;
		AttemptId: number;
		HitId: number;
		UserChoiceIdforTheHit: number;
		UserChoiceTextForTheHit: string;
		WhichNoOfHit: number;
	}
	export class QuestionDifficulty {
		DifficultyLevel: number;
		Question: afterugExtended.QuestionsAfterUg;
		QuestionId: number;
		UserWhoRatedDifficulty: afterugExtended.Users;
		UserWhoRatedDifficultyId: number;
	}
	export class QuestionsAfterUg {
		Attempts: afterugExtended.Attempts[];
		Augnotes: afterugExtended.Augnotes[];
		Chapter: afterugExtended.Chapter;
		ChapterId: number;
		Choices: afterugExtended.Choices[];
		CorrectChoiceId: number;
		ForgetNotes: afterugExtended.ForgetNotes[];
		IsCorrectChoiceVerified: boolean;
		IsQuestionReviewed: boolean;
		IsQuestionSpinned: boolean;
		Question: string;
		QuestionDifficulty: afterugExtended.QuestionDifficulty[];
		QuestionId: number;
		QuestionTags: afterugExtended.QuestionTags[];
		QuestionType: number;
		TestMarkAquestion: afterugExtended.TestMarkAquestion[];
		UserNotes: afterugExtended.UserNotes[];
	}
	
	export class QuestionTags {
		Question: afterugExtended.QuestionsAfterUg;
		QuestionId: number;
		QuestionTagsId: number;
		Tag: afterugExtended.Tags;
		TagId: number;
	}
	export class Tags {
		AfterUgnotePointsTags: afterugExtended.AfterUgnotePointsTags[];
		Description: string;
		QuestionTags: afterugExtended.QuestionTags[];
		TagId: number;
		TagName: string;
	}
	export class TestChild {
		IsQuestionAttended: boolean;
		QuestionId: number;
		TestId: number;
		UserId: number;
	}
	export class TestMarkAquestion {
		Question: afterugExtended.QuestionsAfterUg;
		QuestionId: number;
		TestMarkId: number;
		User: afterugExtended.Users;
		UserId: number;
	}

	export class TestMaster {
		IsReview: boolean;
		IsTestComplete: boolean;
		IsTestOrStudySession: boolean;
		TestId: number;
		User: afterugExtended.Users;
		UserId: number;
	}
	export class UserNotes {
		ApprovedByAdminUser: afterugExtended.Users;
		ApprovedByAdminUserId: number;
		ForgetNotes: afterugExtended.ForgetNotes[];
		IsApprovedForPublicDisplay: boolean;
		IsToBeDisplayed: boolean;
		NoteText: string;
		Question: afterugExtended.QuestionsAfterUg;
		QuestionId: number;
		User: afterugExtended.Users;
		UserId: number;
		UserNotesId: number;
	}
	export class Users {
		Attempts: afterugExtended.Attempts[];
		AugnotesAugnotesAddedByEmployeeUser: afterugExtended.Augnotes[];
		AugnotesAugnotesApprovedByEmployeeUser: afterugExtended.Augnotes[];
		EmailVerificationStatus: boolean;
		FirstName: string;
		ForgetNotes: afterugExtended.ForgetNotes[];
		LastName: string;
		Mobile: string;
		PasswordHash: number[];
		PasswordSalt: number[];
		QuestionDifficulty: afterugExtended.QuestionDifficulty[];
		TestMarkAquestion: afterugExtended.TestMarkAquestion[];
		TestMaster: afterugExtended.TestMaster[];
		UserId: number;
		UserNameOrEmailAddress: string;
		UserNotesApprovedByAdminUser: afterugExtended.UserNotes[];
		UserNotesUser: afterugExtended.UserNotes[];
		UserSettings: afterugExtended.UserSettings[];
	}
	export class UserSettings {
		NoOfChoicesPerQuestion: number;
		NoOfQuestionsPerTest: number;
		NoOfRepetitionsCorrect: number;
		NoOfRepetitionsIncorrect: number;
		User: afterugExtended.Users;
		UserId: number;
		UserSettingsId: number;
	}
}


