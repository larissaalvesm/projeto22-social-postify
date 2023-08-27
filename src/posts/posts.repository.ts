import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsRepository {
    constructor(private readonly prisma: PrismaService) { }

    create(post: CreatePostDto) {
        return this.prisma.post.create({
            data: {
                ...post
            }
        });
    }

    findAll() {
        return  this.prisma.post.findMany();
    }

    findOne(id: number) {
        return this.prisma.post.findFirst({
            where: {
                id
            }
        });
    }

    update(id: number, updatePost: UpdatePostDto) {
        return this.prisma.post.update({
            where: {
                id
            },
            data: {
                ...updatePost
            }
        });
    }

    remove(id: number) {
        return this.prisma.post.delete({
            where: {
                id
            }
        });
    }

    findPublicationsByPostId(id: number){
        return this.prisma.publication.findFirst({
            where: {
                postId: id
            }
        });
    }
}