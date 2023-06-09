import { Controller, Get, Header, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Config } from '../config';
import { CovidLogService } from './covid-log.service';

@Controller('covid-log')
export class CovidLogController {
  constructor(private readonly covidLogService: CovidLogService) {}

  @Get('/time-series')
  @Header('Cache-Control', `public, max-age=${Config.MAX_AGE}`)
  @ApiQuery({
    name: 'locations[]',
    type: 'string',
    required: true,
    isArray: true,
    description:
      'Comma separated list of ISO 3166-1 alpha-3 codes of the locations with some custom codes for continents. Please use the locations endpoint to get the list of available locations.',
  })
  @ApiQuery({
    name: 'fields[]',
    type: 'string',
    required: true,
    isArray: true,
    description:
      'Comma separated list of fields to return. Please use the fields endpoint to get the list of available fields.',
  })
  @ApiQuery({
    name: 'from',
    type: 'string',
    required: false,
    description:
      'The date from which to return the data. The date should be in ISO 8601 format (YYYY-MM-DD).',
  })
  @ApiQuery({
    name: 'to',
    type: 'string',
    required: false,
    description:
      'The date to which to return the data. The date should be in ISO 8601 format (YYYY-MM-DD).',
  })
  async getSeries(@Query() query) {
    const { locations = [], fields = [], from, to } = query;
    return this.covidLogService.getSeries(locations, fields, from, to);
  }

  @Get('/location-options')
  @Header('Cache-Control', 'public, max-age=86400')
  async getLocations() {
    return this.covidLogService.getLocations();
  }

  @Get('/field-options')
  @Header('Cache-Control', `public, max-age=${Config.MAX_AGE}`)
  async getFields() {
    return this.covidLogService.getFields();
  }
}
