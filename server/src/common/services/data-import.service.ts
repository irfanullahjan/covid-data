import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CovidLogService } from '../../covid-log/covid-log.service';

@Injectable()
export class DataImportService implements OnModuleInit {
  constructor(
    @Inject(CovidLogService)
    private readonly covidLogService: CovidLogService,
  ) {}

  async onModuleInit() {
    console.log('DataImportService: Importing data...');
    await this.importCovidLog();
    console.log('DataImportService: All done!');
  }

  private async importCovidLog() {
    console.log('DataImportService: Importing CovidLog...');
    const columns = await this.getCsvColumns(this.owidCovidDataCsv);
    console.log(columns);
  }

  private readonly owidCovidDataCsv = path.join(
    __dirname,
    '..',
    '..',
    'data',
    'owid-covid-data.csv',
  );

  private async getCsvColumns(csvFilePath) {
    const reader = readline.createInterface({
      input: fs.createReadStream(csvFilePath),
    });
    for await (const line of reader) {
      return line.split(',');
    }
  }
}
