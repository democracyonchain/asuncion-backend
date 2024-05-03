import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
  import { JwtService } from "@nestjs/jwt";
  import { Request } from "express";
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        
      
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.SECRE_TOKEN,
        });
        request.user = payload;
      } catch (error) {
        throw new UnauthorizedException();
      }
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request) {
      const [type, token] = request.headers.authorization?.split(" ") ?? [];
      return type === "Bearer" ? token : undefined;
    }
  }
  