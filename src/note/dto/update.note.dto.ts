import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNoteDTO {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  url: string;
}
