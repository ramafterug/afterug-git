export namespace afterugExtended {
	export class AfterUgnotePoints {
		afterUgnotePointId: number;
		afterUgnotePointsTags: afterugExtended.AfterUgnotePointsTags[];
		afterUgnotePointText: string;
	}

	export class AfterUgnotePointsTags {
		afterUgnotePoint: afterugExtended.AfterUgnotePoints;
		afterUgnotePointId: number;
		afterUgnotePointsTagsId: number;
		tag: afterugExtended.Tags;
		tagId: number;
	}

	export class Attempts {
		answerStatus: number;
		attemptId: number;
		attemptNumber: number;
		correctAnswer: string;
		hits: afterugExtended.Hits[];
		question: afterugExtended.QuestionsAfterUg;
		questionId: number;
		testOrStudySession: string;
		timeTaken: number;
		user: afterugExtended.Users;
		userFinalHitAnswer: number;
		userId: number;
	}
	export class Augnotes {
		augnotePointText: string;
		augnotesAddedByEmployeeUser: afterugExtended.Users;
		augnotesAddedByEmployeeUserId: number;
		augnotesApprovedByEmployeeUser: afterugExtended.Users;
		augnotesApprovedByEmployeeUserId: number;
		augnotesId: number;
		isToBeDisplayed: boolean;
		question: afterugExtended.QuestionsAfterUg;
		questionId: number;
	}
	export class Chapter {
		chapterDescription: string;
		chapterId: number;
		chapterName: string;
		cuestionsAfterUg: afterugExtended.QuestionsAfterUg[];
	}
	export class Choices {
		choiceId: number;
		choiceText: string;
		isChoiceReviewed: boolean;
		question: afterugExtended.QuestionsAfterUg;
		questionId: number;
	}
	export class DontShowQuestion {
		dontShowQuestionId: number;
		questionId: number;
		userId: number;
	}
	export class ForgetNotes {
		forgetNotesId: number;
		forgetStatus: boolean;
		question: afterugExtended.QuestionsAfterUg;
		questionId: number;
		userNotes: afterugExtended.UserNotes;
		userNotesId: number;
		userWhoWantsToForgetNotes: afterugExtended.Users;
		userWhoWantsToForgetNotesId: number;
	}
	export class GlobalSettings {
		globalSettingsId: number;
		noOfChoicesPerQuestion: number;
		noOfQuestionsPerTest: number;
		noOfRepetitionsCorrect: number;
		noOfRepetitionsIncorrect: number;
	}
	export class Hits {
		attempt: afterugExtended.Attempts;
		attemptId: number;
		hitId: number;
		userChoiceIdforTheHit: number;
		userChoiceTextForTheHit: string;
		whichNoOfHit: number;
	}
	export class QuestionDifficulty {
		difficultyLevel: number;
		question: afterugExtended.QuestionsAfterUg;
		questionId: number;
		userWhoRatedDifficulty: afterugExtended.Users;
		userWhoRatedDifficultyId: number;
	}
	export class QuestionsAfterUg {
		attempts: afterugExtended.Attempts[];
		augnotes: afterugExtended.Augnotes[];
		chapter: afterugExtended.Chapter;
		chapterId: number;
		choices: afterugExtended.Choices[];
		correctChoiceId: number;
		forgetNotes: afterugExtended.ForgetNotes[];
		isCorrectChoiceVerified: boolean;
		isQuestionReviewed: boolean;
		isQuestionSpinned: boolean;
		question: string;
		questionDifficulty: afterugExtended.QuestionDifficulty[];
		questionId: number;
		questionTags: afterugExtended.QuestionTags[];
		questionType: number;
		testMarkAQuestion: afterugExtended.TestMarkAquestion[];
		userNotes: afterugExtended.UserNotes[];
	}
	
	export class QuestionTags {
		question: afterugExtended.QuestionsAfterUg;
		questionId: number;
		questionTagsId: number;
		tag: afterugExtended.Tags;
		tagId: number;
	}
	export class Tags {
		afterUgnotePointsTags: afterugExtended.AfterUgnotePointsTags[];
		description: string;
		questionTags: afterugExtended.QuestionTags[];
		tagId: number;
		tagName: string;
	}
	export class TestChild {
		isQuestionAttended: boolean;
		questionId: number;
		testId: number;
		userId: number;
	}
	export class TestMarkAquestion {
		question: afterugExtended.QuestionsAfterUg;
		questionId: number;
		testMarkId: number;
		user: afterugExtended.Users;
		userId: number;
	}

	export class TestMaster {
		isReview: boolean;
		isTestComplete: boolean;
		isTestOrStudySession: boolean;
		testId: number;
		user: afterugExtended.Users;
		userId: number;
	}
	export class UserNotes {
		approvedByAdminUser: afterugExtended.Users;
		approvedByAdminUserId: number;
		forgetNotes: afterugExtended.ForgetNotes[];
		isApprovedForPublicDisplay: boolean;
		isToBeDisplayed: boolean;
		noteText: string;
		question: afterugExtended.QuestionsAfterUg;
		questionId: number;
		user: afterugExtended.Users;
		userId: number;
		userNotesId: number;
	}
	export class Users {
		attempts: afterugExtended.Attempts[];
		augnotesAugnotesAddedByEmployeeUser: afterugExtended.Augnotes[];
		augnotesAugnotesApprovedByEmployeeUser: afterugExtended.Augnotes[];
		emailVerificationStatus: boolean;
		firstName: string;
		forgetNotes: afterugExtended.ForgetNotes[];
		lastName: string;
		mobile: string;
		passwordHash: number[];
		passwordSalt: number[];
		questionDifficulty: afterugExtended.QuestionDifficulty[];
		testMarkAquestion: afterugExtended.TestMarkAquestion[];
		testMaster: afterugExtended.TestMaster[];
		userId: number;
		userNameOrEmailAddress: string;
		userNotesApprovedByAdminUser: afterugExtended.UserNotes[];
		userNotesUser: afterugExtended.UserNotes[];
		userSettings: afterugExtended.UserSettings[];
	}
	export class UserSettings {
		noOfChoicesPerQuestion: number;
		noOfQuestionsPerTest: number;
		noOfRepetitionsCorrect: number;
		noOfRepetitionsIncorrect: number;
		user: afterugExtended.Users;
		userId: number;
		userSettingsId: number;
	}
}


