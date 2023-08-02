import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    IdentityModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Use true to work in serveless environments, to not get a FS read only error. join(__dirname, 'schema.gql'),
      sortSchema: true,
      allowBatchedHttpRequests: true
    }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
