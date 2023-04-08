import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CovidLogService } from '../../covid-log/covid-log.service';
import { CovidLog } from '../../covid-log/entities/covid-log.entity';

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
    await this.covidLogService.removeAll();
    console.log('DataImportService: Existing CovidLog records removed');
    console.log('DataImportService: Importing CovidLog...');
    const columns = await this.getCsvColumns(this.owidCovidDataCsv);
    const reader = readline.createInterface({
      input: fs.createReadStream(this.owidCovidDataCsv),
    });
    let recordsCount = 0;
    for await (const line of reader) {
      if (recordsCount === 0) {
        recordsCount++;
        continue;
      }
      const values = line.split(',');
      const covidLog = {};
      for (let i = 0; i < columns.length; i++) {
        let value = values[i];
        if (i > 2) {
          if (isNaN(parseFloat(value))) {
            value = null;
          }
        }
        covidLog[columns[i]] = value;
      }
      this.covidLogService.create(new CovidLog(covidLog));
      recordsCount++;
      if (Math.random() < 0.1) {
        // increase the setTimeout value to slow down the import, in case you run into memory issues
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
      process.stdout.write(`\r${recordsCount} records imported`);
    }
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
