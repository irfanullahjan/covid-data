import { Test, TestingModule } from '@nestjs/testing';
import { CovidLogController } from './covid-log.controller';
import { CovidLogService } from './covid-log.service';

describe('CovidLogController', () => {
  let controller: CovidLogController;

  const mockCovidLogService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CovidLogController],
      providers: [CovidLogService],
    })
      .overrideProvider(CovidLogService)
      .useValue(mockCovidLogService)
      .compile();

    controller = module.get<CovidLogController>(CovidLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
