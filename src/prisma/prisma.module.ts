import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // opcional
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }