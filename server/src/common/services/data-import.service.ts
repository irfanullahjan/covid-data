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

  private readonly CSV_SEPARATOR = ',';

  private readonly CSV_FILE = path.join(
    __dirname,
    '..',
    '..',
    'data',
    'owid-covid-data.csv',
  );

  async onModuleInit() {
    console.log('DataImportService: Importing data...');
    await this.importCovidLog();
    console.log('DataImportService: All done!');
  }

  private async importCovidLog() {
    await this.covidLogService.removeAll();
    console.log('DataImportService: Existing CovidLog records removed');
    console.log('DataImportService: Importing CovidLog...');
    const columns: string[] = await this.getCsvColumns(
      this.CSV_FILE,
      this.CSV_SEPARATOR,
    );
    const reader = readline.createInterface({
      input: fs.createReadStream(this.CSV_FILE),
    });
    let recordsCount = 0;
    for await (const line of reader) {
      if (recordsCount === 0) {
        recordsCount++;
        continue;
      }
      const row: string[] = line.split(this.CSV_SEPARATOR);
      if (row.length !== columns.length) {
        console.log('DataImportService: Skipping invalid row: ');
        continue;
      }
      this.covidLogService.create(
        new CovidLog(this.getCovidLogObj(row, columns)),
      );
      recordsCount++;
      if (Math.random() < 0.1) {
        // increase the setTimeout value to slow down the import, in case you run into memory issues
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
      process.stdout.write(`\r${recordsCount} records imported`);
    }
  }

  private async getCsvColumns(csvFilePath, separator = ',') {
    const reader = readline.createInterface({
      input: fs.createReadStream(csvFilePath),
    });
    for await (const line of reader) {
      return line.split(separator);
    }
  }

  private getCovidLogObj(row: string[], columns: string[]): Partial<CovidLog> {
    const covidLog: Partial<CovidLog> = {};
    for (const [i, cell] of row.entries()) {
      let sanitizedCell = cell;
      if (i > 2 && isNaN(parseFloat(cell))) {
        sanitizedCell = null;
      } else {
        sanitizedCell = cell ? cell.trim() : null;
      }
      covidLog[columns[i]] = sanitizedCell;
    }
    return covidLog;
  }
}
