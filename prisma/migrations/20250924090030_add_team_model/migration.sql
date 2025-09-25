-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `arena` VARCHAR(191) NOT NULL,
    `arenaCapacity` INTEGER NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `manager` VARCHAR(191) NOT NULL,
    `premierleagueTitles` INTEGER NOT NULL,
    `faCupTitles` INTEGER NOT NULL,
    `marathonTablePlacement` INTEGER NOT NULL,
    `marathonTablePoints` INTEGER NOT NULL,
    `recordGoalscorer` VARCHAR(191) NOT NULL,
    `recordGoals` INTEGER NOT NULL,
    `homeshirtsColor` VARCHAR(191) NOT NULL,
    `awayshirtsColor` VARCHAR(191) NOT NULL,
    `clubStarted` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
