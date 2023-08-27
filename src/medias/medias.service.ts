import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository) {}

  async create(createMediaDto: CreateMediaDto) {
    const media = await this.mediasRepository.findMedia(createMediaDto);
    if(media){
      throw new HttpException("Media already registered", HttpStatus.CONFLICT);
    }
    return await this.mediasRepository.create(createMediaDto);
  }

  async findAll() {
    return await this.mediasRepository.findAll();
  }

  async findOne(id: number) {
    const media = await this.mediasRepository.findMediaById(id);
    if(!media){
      throw new NotFoundException();
    }
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const media = await this.mediasRepository.findMediaById(id);
    if(!media){
      throw new NotFoundException();
    }
    const mediaAlreadyRegisteredCheck = await this.mediasRepository.findMedia(updateMediaDto);
    if(mediaAlreadyRegisteredCheck){
      throw new HttpException("Media already registered", HttpStatus.CONFLICT);
    }
    return await this.mediasRepository.update(id, updateMediaDto);
  }

  async remove(id: number) {
    const media = await this.mediasRepository.findMediaById(id);
    if(!media){
      throw new NotFoundException();
    }
    const publicationMedia = await this.mediasRepository.findPublicationsByMediaId(id);
    if(publicationMedia){
      throw new HttpException("Can't delete media that is in a publication", HttpStatus.FORBIDDEN);
    }
    return await this.mediasRepository.remove(id);
  }
}
