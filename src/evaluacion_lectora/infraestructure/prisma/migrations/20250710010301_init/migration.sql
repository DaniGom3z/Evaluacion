-- CreateTable
CREATE TABLE `Quiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idLibro` INTEGER NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `pagina` INTEGER NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paginaInicio` INTEGER NOT NULL,
    `paginaFin` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pregunta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idQuiz` INTEGER NOT NULL,
    `textoPregunta` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuesta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPregunta` INTEGER NOT NULL,
    `textoRespuesta` TEXT NOT NULL,
    `esCorrecta` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IntentoQuiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idQuiz` INTEGER NOT NULL,
    `fechaIntento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `puntajeObtenido` INTEGER NOT NULL,
    `aprobado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pregunta` ADD CONSTRAINT `Pregunta_idQuiz_fkey` FOREIGN KEY (`idQuiz`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_idPregunta_fkey` FOREIGN KEY (`idPregunta`) REFERENCES `Pregunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IntentoQuiz` ADD CONSTRAINT `IntentoQuiz_idQuiz_fkey` FOREIGN KEY (`idQuiz`) REFERENCES `Quiz`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
