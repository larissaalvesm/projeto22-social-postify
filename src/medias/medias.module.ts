import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediasRepository } from './medias.repository';

@Module({
  controllers: [MediasController],
  providers: [MediasService, MediasRepository, PrismaService],
})
export class MediasModule {}
