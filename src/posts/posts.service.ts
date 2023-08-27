import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto) {
    return await this.postsRepository.create(createPostDto);
  }

  async findAll() {
    return await this.postsRepository.findAll();
  }

  async findOne(id: number) {
    const post =  await this.postsRepository.findOne(id);
    if(!post){
      throw new NotFoundException();
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post =  await this.postsRepository.findOne(id);
    if(!post){
      throw new NotFoundException();
    }
    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post =  await this.postsRepository.findOne(id);
    if(!post){
      throw new NotFoundException();
    }
    const publicationPost = await this.postsRepository.findPublicationsByPostId(id);
    if(publicationPost){
      throw new HttpException("Can't delete post that is in a publication", HttpStatus.FORBIDDEN);
    }
    return await this.postsRepository.remove(id);
  }
}
