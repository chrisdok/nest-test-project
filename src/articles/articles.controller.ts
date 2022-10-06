import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Options } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized'})
  @ApiOkResponse({type: ArticleEntity})
  @ApiCreatedResponse({type: ArticleEntity})
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get('drafts')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized'})
  @ApiOkResponse({type: ArticleEntity, isArray: true})
  findDraft() {
    return this.articlesService.findDrafts();
  }

  @Get()
  @ApiOkResponse({type: ArticleEntity, isArray: true})
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized'})
  @ApiOkResponse({type: ArticleEntity})
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized'})
  @ApiOkResponse({type: ArticleEntity})
  @ApiNotFoundResponse()
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized'})
  @ApiNotFoundResponse()
  @ApiOkResponse({type: ArticleEntity})
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
