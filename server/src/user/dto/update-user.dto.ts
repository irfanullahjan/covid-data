import { Allow } from 'class-validator';

export class UpdateUserDto {
  @Allow()
  savedFilters: string;
}
