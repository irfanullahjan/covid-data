import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CovidLogService } from './covid-log.service';
import { CreateCovidLogDto } from './dto/create-covid-log.dto';
import { UpdateCovidLogDto } from './dto/update-covid-log.dto';

@Controller('covid-log')
export class CovidLogController {
  constructor(private readonly covidLogService: CovidLogService) {}

  @Post()
  create(@Body() createCovidLogDto: CreateCovidLogDto) {
    return this.covidLogService.create(createCovidLogDto);
  }

  @Get()
  findAll() {
    return this.covidLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.covidLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCovidLogDto: UpdateCovidLogDto) {
    return this.covidLogService.update(+id, updateCovidLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.covidLogService.remove(+id);
  }
}
