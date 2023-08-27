import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediasRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(createMediaDto: CreateMediaDto) {
        return this.prisma.media.create({
            data: createMediaDto
        });
    }

    findAll() {
        return this.prisma.media.findMany();
    }

    findMedia(media: CreateMediaDto | UpdateMediaDto) {
        return this.prisma.media.findFirst({
            where: {
                title: media.title,
                username: media.username
            }
        });
    }

    findMediaById(id: number) {
        return this.prisma.media.findFirst({
            where: {
                id
            }
        });
    }

    update(id: number, updateMedia: UpdateMediaDto) {
        return this.prisma.media.update({
            where: {
                id
            },
            data: {
                title: updateMedia.title,
                username: updateMedia.username
            }
        });
    }

    remove(id: number) {
        return this.prisma.media.delete({
            where: {
                id
            }
        });
    }

    findPublicationsByMediaId(id: number){
        return this.prisma.publication.findFirst({
            where: {
                mediaId: id
            }
        });
    }
}