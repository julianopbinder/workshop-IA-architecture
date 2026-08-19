CREATE TABLE `quiz_scores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`participantName` varchar(60) NOT NULL,
	`participantKey` varchar(64) NOT NULL,
	`totalScore` int NOT NULL,
	`skillScore` int NOT NULL,
	`mcpScore` int NOT NULL,
	`subagentsScore` int NOT NULL,
	`ragScore` int NOT NULL,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quiz_scores_id` PRIMARY KEY(`id`),
	CONSTRAINT `quiz_scores_participantKey_unique` UNIQUE(`participantKey`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
