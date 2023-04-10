import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Config } from '../../config';
import { CovidLogService } from '../../covid-log/covid-log.service';
import { CovidLog } from '../../covid-log/entities/covid-log.entity';

@Injectable()
export class DataImportService implements OnModuleInit {
  constructor(
    @Inject(CovidLogService)
    private readonly covidLogService: CovidLogService,
  ) {}

  private readonly CSV_FILE = path.join(
    __dirname,
    '..',
    '..',
    'owid-covid-data.csv',
  );

  async onModuleInit() {
    if (Config.DATA_IMPORT_DISABLED) {
      return;
    }
    console.log('DataImportService: Importing data...');
    try {
      await this.importCovidLog();
    } catch (e) {
      console.error('DataImportService: Import failed');
      console.error('Try adjusting import parameters in src/config.ts');
      throw e;
    }
  }

  private async importCovidLog() {
    await this.covidLogService.removeAll();
    console.log('DataImportService: Existing CovidLog records removed');
    console.log('DataImportService: Importing CovidLog...');
    const columns: string[] = await this.getCsvColumns(
      this.CSV_FILE,
      Config.DATA_IMPORT_CSV_SEPARATOR,
    );
    const reader = readline.createInterface({
      input: fs.createReadStream(this.CSV_FILE),
    });
    let recordsCount = 0;
    let batch = [];
    for await (const line of reader) {
      if (recordsCount === 0) {
        recordsCount++;
        continue;
      }
      const row: string[] = line.split(Config.DATA_IMPORT_CSV_SEPARATOR);
      if (row.length !== columns.length) {
        console.log('DataImportService: Skipping invalid row: ');
        continue;
      }
      if (batch.length === Config.DATA_IMPORT_BATCH_SIZE) {
        await this.covidLogService.createMany(batch);
        batch = [this.getCovidLogObj(row, columns)];
      } else {
        batch.push(this.getCovidLogObj(row, columns));
      }
      process.stdout.write(
        `\r${recordsCount} covid records parsed and saved to database`,
      );
      recordsCount++;
    }
    if (batch.length > 0) {
      await this.covidLogService.createMany(batch);
    }
    console.log('\nDataImportService: CovidLog import completed.');
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
      // first 3 columns are strings, the rest are floats
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
