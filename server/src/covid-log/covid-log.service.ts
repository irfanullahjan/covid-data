import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { fieldsConfig } from '../common/fields';
import { CreateCovidLogDto } from './dto/create-covid-log.dto';
import { CovidLog } from './entities/covid-log.entity';

@Injectable()
export class CovidLogService {
  constructor(
    @InjectRepository(CovidLog)
    private readonly covidLogRepository: Repository<CovidLog>,
  ) {}

  async getTimeSeriesSingleRegion(
    regionType: string,
    region: string,
    fields: string[],
  ) {
    try {
      this.validateFields(fields);
      const dateSelect = "TO_CHAR(date, 'YYYY-MM-DD') AS date";
      let qb = this.covidLogRepository
        .createQueryBuilder()
        .select([dateSelect, regionType, ...fields])
        .where(`${regionType} = :region`, { region })
        .orderBy(`date, ${regionType}`);
      if (regionType === 'continent') {
        qb = qb
          .select([
            dateSelect,
            regionType,
            ...fields.map((f) => `${fieldsConfig[f].aggregate}(${f})`),
          ])
          .groupBy(`date, ${regionType}`);
      }
      const data = await qb.getRawMany();
      const datesArr = this.getUniqueDates(data);
      return datesArr.map((date) => {
        const row = { date };
        data.forEach((d) => {
          if (d.date === date) {
            fields.forEach((f) => {
              row[f] = d[f];
            });
          }
        });
        return row;
      });
    } catch (e) {
      if (e.driverError) {
        throw new BadRequestException('Query failed');
      } else {
        throw e;
      }
    }
  }

  async getFields() {
    return Object.keys(fieldsConfig).map((key) => ({
      name: fieldsConfig[key].name,
      value: key,
    }));
  }

  async getContinents() {
    const data = await this.covidLogRepository
      .createQueryBuilder()
      .select('continent')
      .distinct(true)
      .orderBy('continent')
      .getRawMany();
    return data.map((d) => d.continent);
  }

  async getCountries() {
    const data = await this.covidLogRepository
      .createQueryBuilder()
      .select('location')
      .distinct(true)
      .orderBy('location')
      .getRawMany();
    return data.map((d) => d.location);
  }

  create(createCovidLogDto: CreateCovidLogDto) {
    return this.covidLogRepository.save(new CovidLog(createCovidLogDto));
  }

  async removeAll() {
    await this.covidLogRepository.clear();
    await this.covidLogRepository.manager.query(
      'ALTER SEQUENCE covid_log_id_seq RESTART WITH 1',
    );
  }

  private validateFields(fields: string[]) {
    fields.forEach((field) => {
      if (!fieldsConfig[field]) {
        throw new BadRequestException(`Invalid field: ${field}`);
      }
    });
  }

  private getUniqueDates(data: any[]) {
    const datesMap = {};
    data.forEach((row) => {
      datesMap[row.date] = true;
    });
    return Object.keys(datesMap);
  }
}
