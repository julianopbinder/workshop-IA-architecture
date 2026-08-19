CREATE TABLE `quiz_participants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roundId` int NOT NULL,
	`participantName` varchar(60) NOT NULL,
	`participantKey` varchar(64) NOT NULL,
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quiz_participants_id` PRIMARY KEY(`id`),
	CONSTRAINT `quiz_participants_round_participant_key_unique` UNIQUE(`roundId`,`participantKey`)
);
--> statement-breakpoint
ALTER TABLE `quiz_participants` ADD CONSTRAINT `quiz_participants_roundId_quiz_rounds_id_fk` FOREIGN KEY (`roundId`) REFERENCES `quiz_rounds`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `quiz_participants_round_id_idx` ON `quiz_participants` (`roundId`);