import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [PrismaModule, ArticlesModule, AuthenticationModule],
})
export class AppModule {}
