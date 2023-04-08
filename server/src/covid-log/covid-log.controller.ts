import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CovidLogService } from './covid-log.service';
import { CreateCovidLogDto } from './dto/create-covid-log.dto';
import { UpdateCovidLogDto } from './dto/update-covid-log.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('covid-log')
export class CovidLogController {
  constructor(private readonly covidLogService: CovidLogService) {}

  @Get('/totals-series-by-region')
  @ApiQuery({ name: 'regionType', type: 'string', enum: ['continent', 'location'] })
  @ApiQuery({ name: 'regions', type: 'string', isArray: true })
  @ApiQuery({ name: 'field', type: 'string' })
  async getSeries(@Query() query) {
    return this.covidLogService.getSeries({
      regionType: query.regionType,
      regions: query.regions.split(','),
      field: query.field,
    });
  }
}
