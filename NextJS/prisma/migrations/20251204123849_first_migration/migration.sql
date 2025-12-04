-- CreateExtension
CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateTable
CREATE TABLE "Provincia" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "provinciaId" INTEGER NOT NULL,

    CONSTRAINT "Municipio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parcela" (
    "id" SERIAL NOT NULL,
    "geom" geometry(Polygon, 4326) NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "provinciaId" INTEGER NOT NULL,
    "municipioId" INTEGER NOT NULL,

    CONSTRAINT "Parcela_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recinto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cultivo" TEXT NOT NULL,
    "fechaSiembra" TIMESTAMP(3) NOT NULL,
    "fechaCosecha" TIMESTAMP(3),
    "geom" geometry(Polygon, 4326) NOT NULL,

    CONSTRAINT "Recinto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Provincia_name_key" ON "Provincia"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Parcela_geom_idx" ON "Parcela" USING GIST ("geom");

-- CreateIndex
CREATE UNIQUE INDEX "Recinto_nombre_key" ON "Recinto"("nombre");

-- CreateIndex
CREATE INDEX "Recinto_geom_idx" ON "Recinto" USING GIST ("geom");

-- AddForeignKey
ALTER TABLE "Municipio" ADD CONSTRAINT "Municipio_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "Provincia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcela" ADD CONSTRAINT "Parcela_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcela" ADD CONSTRAINT "Parcela_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
