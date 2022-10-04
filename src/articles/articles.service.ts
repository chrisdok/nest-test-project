import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotFoundError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {

  constructor(private prisma: PrismaService) { }

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto });
  }

  findAll() {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  findOne(id: number) {
    return this.prisma.article.findUniqueOrThrow({ where: { id } });
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto
    })
  };

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
