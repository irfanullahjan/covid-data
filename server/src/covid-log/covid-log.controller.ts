import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CovidLogService } from './covid-log.service';

@Controller('covid-log')
export class CovidLogController {
  constructor(private readonly covidLogService: CovidLogService) {}

  @Get('/time-series')
  @ApiQuery({
    name: 'regionType',
    type: 'string',
    enum: ['continent', 'location'],
  })
  @ApiQuery({ name: 'regions', type: 'string', isArray: true })
  @ApiQuery({ name: 'field', type: 'string' })
  async getSeries(@Query() query) {
    return this.covidLogService.getTimeSeries({
      regionType: query.regionType,
      regions: query.regions.split(','),
      field: query.field,
    });
  }

  @Get('/fields')
  async getFields() {
    return this.covidLogService.getFields();
  }
}
