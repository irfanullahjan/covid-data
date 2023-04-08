import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
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
  @ApiQuery({ name: 'region', type: 'string' })
  @ApiQuery({ name: 'field', type: 'string' })
  async getSeries(@Query() query) {
    const { regionType, region, field } = query;
    return this.covidLogService.getTimeSeries(regionType, region, field);
  }

  @Get('/fields')
  async getFields() {
    return this.covidLogService.getFields();
  }
}
