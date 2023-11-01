import { ForbiddenException, Injectable } from '@nestjs/common';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}
  async getNotes(userId: number) {
    const notes = await this.prismaService.note.findMany({
      where: {
        userId,
      },
    });
    return notes;
  }

  async getNoteById(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Can not find any note!');
    }
    return note;
  }

  async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
    const note = await this.prismaService.note.create({
      data: {
        userId,
        ...insertNoteDTO,
      },
    });
    return note;
  }

  async updateNoteById(noteId: number, updateNoteDTO: UpdateNoteDTO) {
    const note = await this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Can not find any note to update!');
    }
    const noteUpdated = await this.prismaService.note.update({
      where: {
        id: noteId,
      },
      data: {
        ...updateNoteDTO,
      },
    });
    return noteUpdated;
  }

  async deleteNoteById(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Can not find any note to delete!');
    }
    return await this.prismaService.note.delete({
      where: {
        id: noteId,
      },
    });
  }
}
