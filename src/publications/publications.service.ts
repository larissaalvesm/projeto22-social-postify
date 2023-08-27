import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { MediasRepository } from '../medias/medias.repository';
import { PostsRepository } from '../posts/posts.repository';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationsRepository: PublicationsRepository,
    private readonly mediasRepository: MediasRepository,
    private readonly postsRepository: PostsRepository
    ) {}

  async create(createPublicationDto: CreatePublicationDto) {
    const media = await this.mediasRepository.findMediaById(createPublicationDto.mediaId);
    const post = await this.postsRepository.findOne(createPublicationDto.postId);
    if(!media || !post){
      throw new NotFoundException();
    }
    return await this.publicationsRepository.create(createPublicationDto);
  }

  async findAll(published: boolean | null, after: string | null) {
    return await this.publicationsRepository.findAll(published, after);
  }

  async findOne(id: number) {
    const publication =  await this.publicationsRepository.findOne(id);
    if(!publication){
      throw new NotFoundException();
    }
    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const publication =  await this.publicationsRepository.findOne(id);
    const media = await this.mediasRepository.findMediaById(updatePublicationDto.mediaId);
    const post = await this.postsRepository.findOne(updatePublicationDto.postId);
    if(!publication || !media || !post) {
      throw new NotFoundException();
    }
    if(publication.date < new Date()){
      throw new HttpException("Can't update an already published publication", HttpStatus.FORBIDDEN);
    }
    return await this.publicationsRepository.update(id, updatePublicationDto);
  }

  async remove(id: number) {
    const publication =  await this.publicationsRepository.findOne(id);
    if(!publication){
      throw new NotFoundException();
    }
    return await this.publicationsRepository.remove(id);
  }
}
