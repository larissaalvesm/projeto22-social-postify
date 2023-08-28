import { Controller, Get, Post, Body, Param, Delete, Query, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationsService.create(createPublicationDto);
  }

  @Get()
  findAll(
    @Query('published') published: boolean | null,
    @Query('after') after: string | null
    ) {
    return this.publicationsService.findAll(published, after);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.update(+id, updatePublicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationsService.remove(+id);
  }
}
