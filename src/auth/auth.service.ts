import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel('Auth') private AuthModel : Model<Auth> ){}

    async create(auth: Auth): Promise<Auth > {
       
       if(!auth.email || !auth.password || !auth.name){
        throw new BadRequestException('Please fill all fields');
        }
       const salt = await bcrypt.genSalt();
       const hashedPassword = await bcrypt.hash(auth.password,salt);
        const createSignup = new this.AuthModel({...auth, password:hashedPassword,});

        console.log('User Created Successfully!');
        return createSignup.save();
    }
  async login(auth: Auth ) : Promise<Auth> {

    if( !auth.password || !auth.email) {
        throw new BadRequestException('Missing username or password');
    }
    const loggedin = await this.AuthModel.findOne({ email: auth.email });
       
        if (!loggedin) {
            throw new BadRequestException('Invalid credentials');
          }

           const isMatch = await bcrypt.compare(auth.password,loggedin.password);

           if(!isMatch){
            throw new NotFoundException('Password is not matching')
           }
        console.log('user logged in successfully!');
       // return loggedin;
       return loggedin;
    }
  
}
