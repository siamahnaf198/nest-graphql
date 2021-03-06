import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { join } from 'path';

//Module
import { UserModule } from "./user/user.module";
import { QuestionModule } from "./question/question.module";
//Custom Scalar
import { DateScalar } from "./date.scaler";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      playground: false,
      path: "/nestjs",
      context: ({ req }) => ({ headers: req.headers }),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_LOCAL),
    UserModule,
    QuestionModule
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule { }
