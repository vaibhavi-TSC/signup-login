import { Controller, Post , Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice : AuthService ) {}

    @Post('signup')
    async signup(@Body() body:{ name: string, password: string, email: string}) {
       const  Signedup = await  this.authservice.create(body);  
       return Signedup;
    }

    @Post('login')
    async login(@Body() body: {email: string, password: string, name: string}){
        const Loggedin = await this.authservice.login(body);
        return Loggedin;
    }
    
}
