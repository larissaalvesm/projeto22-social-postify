import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationsRepository {
    constructor(private readonly prisma: PrismaService) { }

    create(createPublication: CreatePublicationDto) {
        return this.prisma.publication.create({
            data: {
                ...createPublication
            }
        });
      }
    
      findAll(published: boolean | null, after: string | null) {
        return this.prisma.publication.findMany({
            where: {
                date: {
                    lt: published ? new Date() : undefined,
                    gte: after ? new Date(after) : undefined
                }
            }
        });
    }
    
      findOne(id: number) {
        return this.prisma.publication.findFirst({
            where: {
                id
            }
        })
      }
    
      update(id: number, updatePublication: UpdatePublicationDto) {
        return this.prisma.publication.update({
            where: {
                id
            },
            data: {
                ...updatePublication
            }
        });
      }
    
      remove(id: number) {
        return this.prisma.publication.delete({
            where: {
                id
            }
        })
      }
}