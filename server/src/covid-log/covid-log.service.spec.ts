import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Between, In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { CovidLogService } from './covid-log.service';
import { CovidLog } from './entities/covid-log.entity';

describe('CovidLogService', () => {
  let service: CovidLogService;

  const mockCovidLogRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CovidLogService,
        {
          provide: getRepositoryToken(CovidLog),
          useValue: mockCovidLogRepository,
        },
      ],
    }).compile();

    service = module.get<CovidLogService>(CovidLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSeries', () => {
    it('should throw if locations or fields is empty array', async () => {
      await expect(service.getSeries([], ['new_cases'])).rejects.toThrow();
      await expect(service.getSeries(['USA'], [])).rejects.toThrow();
    });

    it('should reject incorrect fields', async () => {
      await expect(
        service.getSeries(query.locations, ['haha123' as keyof CovidLog]),
      ).rejects.toThrow();
    });

    const query = {
      locations: ['USA', 'CAN'],
      fields: ['new_cases' as keyof CovidLog, 'new_deaths' as keyof CovidLog],
      from: '2020-01-01',
      to: '2020-01-31',
    };

    const getQueryObject = (
      locations: string[],
      fields: (keyof CovidLog)[],
      from?: string,
      to?: string,
    ) => {
      const where: any = {
        iso_code: In(locations),
      };
      if (from) {
        where.date = MoreThanOrEqual(new Date(from));
      }
      if (to) {
        where.date = from
          ? Between(new Date(from), new Date(to))
          : LessThanOrEqual(new Date(to));
      }
      return {
        select: ['date', 'iso_code', 'location', ...fields],
        where,
        order: {
          date: 'ASC',
        },
      };
    };

    it('should call covidLogRepository.find with the correct arguments given locations, fields', async () => {
      await service.getSeries(query.locations, query.fields);
      expect(mockCovidLogRepository.find).toHaveBeenCalledWith(
        getQueryObject(query.locations, query.fields),
      );
    });

    it('should call covidLogRepository.find with the correct arguments given locations, fields, and from', async () => {
      await service.getSeries(query.locations, query.fields, query.from);
      expect(mockCovidLogRepository.find).toHaveBeenCalledWith(
        getQueryObject(query.locations, query.fields, query.from),
      );
    });

    it('should call covidLogRepository.find with the correct arguments given locations, fields, from, and to', async () => {
      await service.getSeries(
        query.locations,
        query.fields,
        query.from,
        query.to,
      );
      expect(mockCovidLogRepository.find).toHaveBeenCalledWith(
        getQueryObject(query.locations, query.fields, query.from, query.to),
      );
    });

    it('should call covidLogRepository.find with the correct arguments given locations, fields, to', async () => {
      await service.getSeries(
        query.locations,
        query.fields,
        undefined,
        query.to,
      );
      expect(mockCovidLogRepository.find).toHaveBeenCalledWith(
        getQueryObject(query.locations, query.fields, undefined, query.to),
      );
    });

    it('should throw if from date is after to date', async () => {
      await expect(
        service.getSeries(query.locations, query.fields, query.to, query.from),
      ).rejects.toThrow();
    });
  });
});
