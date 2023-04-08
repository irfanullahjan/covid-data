import { Catch, ArgumentsHost, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class TypeOrmExceptionFilter extends BaseExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
    super.catch(new NotFoundException(exception.name), host);
  }
}
