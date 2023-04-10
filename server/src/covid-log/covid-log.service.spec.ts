import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CovidLogService } from './covid-log.service';
import { CovidLog } from './entities/covid-log.entity';

describe('CovidLogService', () => {
  let service: CovidLogService;

  const mockCovidLogRepository = {};

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
});
