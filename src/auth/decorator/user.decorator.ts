import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (
    key: string, // "id", "firstName", "lastName"
    context: ExecutionContext,
  ) => {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    return key ? user?.[key] : user;
  },
);
