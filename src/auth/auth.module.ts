import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schema/auth.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Auth', schema: AuthSchema}])],
    providers:[AuthService],
    controllers: [AuthController] 
})
export class AuthModule {}
