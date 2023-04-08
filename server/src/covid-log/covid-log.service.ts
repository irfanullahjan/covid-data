import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCovidLogDto } from './dto/create-covid-log.dto';
import { CovidLog } from './entities/covid-log.entity';

@Injectable()
export class CovidLogService {
  constructor(
    @InjectRepository(CovidLog)
    private readonly covidLogRepository: Repository<CovidLog>,
  ) {}

  async getSeries({
    regionType,
    regions,
    field,
  }: {
    regionType: string;
    regions: string[];
    field: string;
  }) {
    try {
      const dateSelect = "TO_CHAR(date, 'YYYY-MM-DD') AS date";
      let qb = this.covidLogRepository
        .createQueryBuilder()
        .select([dateSelect, regionType, field])
        .where(`${regionType} IN (:...regions)`, { regions })
        .orderBy(`date, ${regionType}`);
      if (regionType === 'continent') {
        qb = qb
          .select([dateSelect, 'continent', `SUM(${field}) AS ${field}`])
          .groupBy('date, continent');
      }
      const data = await qb.getRawMany();
      const datesMap = {};
      data.forEach((row) => {
        datesMap[row.date] = true;
      });
      const datesArr = Object.keys(datesMap);
      return datesArr.map((date) => {
        const row = {
          date,
        };
        data.forEach((dataRow) => {
          if (dataRow.date === date) {
            row[dataRow[regionType]] = dataRow[field];
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

  create(createCovidLogDto: CreateCovidLogDto) {
    return this.covidLogRepository.save(new CovidLog(createCovidLogDto));
  }

  async removeAll() {
    await this.covidLogRepository.clear();
    await this.covidLogRepository.manager.query(
      'ALTER SEQUENCE covid_log_id_seq RESTART WITH 1',
    );
  }
}
