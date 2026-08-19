CREATE TABLE `quiz_rounds` (
	`id` int AUTO_INCREMENT NOT NULL,
	`status` enum('active','closed') NOT NULL DEFAULT 'active',
	`startedAt` timestamp NOT NULL,
	`endsAt` timestamp NOT NULL,
	`endedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quiz_rounds_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
INSERT INTO `quiz_rounds` (`status`, `startedAt`, `endsAt`, `endedAt`) VALUES ('closed', UTC_TIMESTAMP(), UTC_TIMESTAMP(), UTC_TIMESTAMP());
--> statement-breakpoint
SET @legacy_quiz_round_id = LAST_INSERT_ID();
--> statement-breakpoint
ALTER TABLE `quiz_scores` DROP INDEX `quiz_scores_participantKey_unique`;
--> statement-breakpoint
ALTER TABLE `quiz_scores` ADD `roundId` int NULL;
--> statement-breakpoint
UPDATE `quiz_scores` SET `roundId` = @legacy_quiz_round_id WHERE `roundId` IS NULL;
--> statement-breakpoint
ALTER TABLE `quiz_scores` MODIFY `roundId` int NOT NULL;
--> statement-breakpoint
ALTER TABLE `quiz_scores` ADD CONSTRAINT `quiz_scores_round_participant_key_unique` UNIQUE(`roundId`,`participantKey`);
--> statement-breakpoint
ALTER TABLE `quiz_scores` ADD CONSTRAINT `quiz_scores_roundId_quiz_rounds_id_fk` FOREIGN KEY (`roundId`) REFERENCES `quiz_rounds`(`id`) ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX `quiz_scores_round_id_idx` ON `quiz_scores` (`roundId`);
