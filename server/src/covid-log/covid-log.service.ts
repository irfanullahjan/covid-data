import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCovidLogDto } from './dto/create-covid-log.dto';
import { UpdateCovidLogDto } from './dto/update-covid-log.dto';
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
      let data;
      if (regionType === 'continent') {
        qb = qb
          .select([dateSelect, 'continent', `SUM(${field}) AS ${field}`])
          .groupBy('date, continent');
        data = await qb.getRawMany();
      } else {
        data = await qb.getRawMany();
      }
      return data.reduce((acc, curr) => {
        if (!acc[curr.date]) {
          acc[curr.date] = {};
        }
        acc[curr.date][curr[regionType]] = curr[field];
        return acc;
      }, {});
    } catch (e) {
      if (e.driverError) {
        throw new BadRequestException("Invalid query parameters");
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
