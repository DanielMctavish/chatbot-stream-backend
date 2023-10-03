-- CreateEnum
CREATE TYPE "REQUEST_METHODS" AS ENUM ('GET', 'POST', 'PATCH', 'DELETE', 'PUT');

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "connection_status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamChat" (
    "id" TEXT NOT NULL,
    "stream_set" BOOLEAN NOT NULL,
    "stream_title" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "welcome_message" TEXT NOT NULL,

    CONSTRAINT "StreamChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinesResponse" (
    "id" TEXT NOT NULL,
    "intent_message" TEXT NOT NULL,
    "response_message" TEXT NOT NULL,
    "streamChat_id" TEXT,

    CONSTRAINT "LinesResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variables" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "api_url" TEXT,
    "request_method" "REQUEST_METHODS",
    "body_json" JSONB,

    CONSTRAINT "Variables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "StreamChat" ADD CONSTRAINT "StreamChat_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinesResponse" ADD CONSTRAINT "LinesResponse_streamChat_id_fkey" FOREIGN KEY ("streamChat_id") REFERENCES "StreamChat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
