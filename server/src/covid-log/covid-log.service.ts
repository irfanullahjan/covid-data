import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { INCOME_GROUP_ISO } from 'src/common/constants';
import {
  Between,
  FindOneOptions,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { fieldsConfig } from '../common/fields';
import { CreateCovidLogDto } from './dto/create-covid-log.dto';
import { CovidLog } from './entities/covid-log.entity';

@Injectable()
export class CovidLogService {
  constructor(
    @InjectRepository(CovidLog)
    private readonly covidLogRepository: Repository<CovidLog>,
  ) {}

  async getSeries(
    locations: string[],
    fields: Array<keyof CovidLog>,
    from?: string,
    to?: string,
  ) {
    this.validateLocations(locations);
    this.validateFields(fields);
    this.validateDates(from, to);
    const where: FindOneOptions<CovidLog>['where'] = {
      iso_code: In(locations),
    };
    if (from && to) {
      where.date = Between(new Date(from), new Date(to));
    } else if (from) {
      where.date = MoreThanOrEqual(new Date(from));
    } else if (to) {
      where.date = LessThanOrEqual(new Date(to));
    }
    try {
      return await this.covidLogRepository.find({
        select: ['date', 'iso_code', 'location', ...fields],
        where,
        order: {
          date: 'ASC',
        },
      });
    } catch (e) {
      if (e.driverError) {
        throw new BadRequestException('Quering covid logs failed');
      } else {
        throw e;
      }
    }
  }

  async getLocations() {
    const locations = await this.covidLogRepository
      .createQueryBuilder()
      .select(['iso_code', 'continent', 'location'])
      .distinct(true)
      .orderBy('continent', 'ASC')
      .addOrderBy('location', 'ASC')
      .getRawMany();
    return locations.map((location) => {
      const isIncomeGroup = !!INCOME_GROUP_ISO[location.iso_code];
      // empty continent means the location itself is a continent
      const isContinent = !isIncomeGroup && !location.continent;
      return {
        ...location,
        isIncomeGroup,
        isContinent,
      };
    });
  }

  async getFields() {
    return Object.keys(fieldsConfig).map((key) => ({
      name: fieldsConfig[key].name,
      value: key,
    }));
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

  private validateFields(fields: Array<keyof CovidLog>) {
    if (fields.length === 0) {
      throw new BadRequestException('At least one field is required');
    }
    fields.forEach((field) => {
      if (!fieldsConfig[field]) {
        throw new BadRequestException(`Invalid field: ${field}`);
      }
    });
  }

  private validateLocations(locations: string[]) {
    if (locations.length === 0) {
      throw new BadRequestException('At least one location is required');
    }
    locations.forEach((location) => {
      if (location.length !== 3) {
        throw new BadRequestException(`Invalid location: ${location}`);
      }
    });
  }

  private validateDates(from?: string, to?: string) {
    if (from && !this.isValidDate(from)) {
      throw new BadRequestException(`Invalid from date: ${from}`);
    }
    if (to && !this.isValidDate(to)) {
      throw new BadRequestException(`Invalid to date: ${to}`);
    }
  }

  private isValidDate(date: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  }
}
