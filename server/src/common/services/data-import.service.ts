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

  private readonly importEnabled = false;

  async onModuleInit() {
    if (!this.importEnabled) {
      console.log('DataImportService: Import disabled');
      return;
    }
    console.log('DataImportService: Importing data...');
    await this.importCovidLog();
    console.log('DataImportService: All done!');
  }

  private async importCovidLog() {
    console.log('DataImportService: Importing CovidLog...');
    await this.covidLogService.removeAll();
    console.log('DataImportService: Existing CovidLog records removed');
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
      await this.covidLogService.create(new CovidLog(covidLog));
      recordsCount++;
      process.stdout.write(`\r${recordsCount} records imported`);
    }
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
