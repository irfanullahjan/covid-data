import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CovidLogService } from './covid-log.service';

@Controller('covid-log')
export class CovidLogController {
  constructor(private readonly covidLogService: CovidLogService) {}

  @Get('/time-series/single-region')
  @ApiQuery({
    name: 'regionType',
    type: 'string',
    enum: ['continent', 'location'],
  })
  @ApiQuery({ name: 'region', type: 'string' })
  @ApiQuery({ name: 'fields', type: 'string' })
  async getSeries(@Query() query) {
    const { regionType, region, fields } = query;
    return this.covidLogService.getTimeSeriesSingleRegion(
      regionType,
      region,
      fields.split(','),
    );
  }

  @Get('/fields')
  async getFields() {
    return this.covidLogService.getFields();
  }

  @Get('/continents')
  async getContinents() {
    return this.covidLogService.getContinents();
  }

  @Get('/countries')
  async getCountries() {
    return this.covidLogService.getCountries();
  }
}
