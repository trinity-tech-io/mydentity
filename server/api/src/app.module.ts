import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ActivityModule } from './activity/activity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthProvidersModule } from './auth-providers/auth-providers.module';
import { AuthModule } from './auth/auth.module';
import { BrowsersModule } from './browsers/browsers.module';
import { CredentialsModule } from './credentials/credentials.module';
import { DIDPublishingModule } from './did-publishing/did-publishing.module';
import { DIDModule } from './did/did.module';
import { CommonEmailingModule } from "./emailing/emailing.module";
import { AppExceptionGraphQLInterceptor } from './exceptions/app-exception-gql-interceptor';
import { IdentityModule } from './identity/identity.module';
import { IntentsModule } from './intents/intents.module';
import { KeyRingModule } from './key-ring/key-ring.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AppInteractionModule } from './app-interaction/app-interaction.module';
import { CommonWsModule } from "./websockets/ws.module";


@Module({
  imports: [
    DIDModule,
    IdentityModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Use true to work in serveless environments, to not get a FS read only error. join(__dirname, 'schema.gql'),
      sortSchema: true,
      allowBatchedHttpRequests: true
    }),
    AuthModule,
    AuthProvidersModule,
    UserModule,
    CommonEmailingModule,
    CredentialsModule,
    IntentsModule,
    ScheduleModule.forRoot(),
    ActivityModule,
    BrowsersModule,
    KeyRingModule,
    DIDPublishingModule,
    AppInteractionModule,
    CommonWsModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppExceptionGraphQLInterceptor,
    },
  ],
})
export class AppModule { }
