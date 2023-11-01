import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InsertNoteDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

// id          Int      @id @default(autoincrement())
//   title       String
//   description String
//   url         String
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   userId      Int
//   user        User     @relation(fields: [userId], references: [id])

//   @@map("notes")
