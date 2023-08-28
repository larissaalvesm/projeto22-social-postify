import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MediasRepository } from '../medias/medias.repository';
import { PostsRepository } from '../posts/posts.repository';
import { PublicationsRepository } from './publications.repository';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService, MediasRepository, PostsRepository, PrismaService, PublicationsRepository],
})
export class PublicationsModule {}
