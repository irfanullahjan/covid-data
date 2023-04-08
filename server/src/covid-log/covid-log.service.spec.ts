import { Test, TestingModule } from '@nestjs/testing';
import { CovidLogService } from './covid-log.service';

describe('CovidLogService', () => {
  let service: CovidLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CovidLogService],
    }).compile();

    service = module.get<CovidLogService>(CovidLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
