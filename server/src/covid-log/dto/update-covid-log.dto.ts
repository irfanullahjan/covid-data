import { PartialType } from '@nestjs/swagger';
import { CreateCovidLogDto } from './create-covid-log.dto';

export class UpdateCovidLogDto extends PartialType(CreateCovidLogDto) {}
