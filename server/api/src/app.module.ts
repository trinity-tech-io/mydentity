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
import { CredentialsModule } from './credentials/credentials.module';
import { DevicesModule } from './devices/devices.module';
import { DIDModule } from './did/did.module';
import { CommonEmailingModule } from "./emailing/emailing.module";
import { AppExceptionGraphQLInterceptor } from './exceptions/app-exception-gql-interceptor';
import { IdentityModule } from './identity/identity.module';
import { IntentsModule } from './intents/intents.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

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
    DevicesModule
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
