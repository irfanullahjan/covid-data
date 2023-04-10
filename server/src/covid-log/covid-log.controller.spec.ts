import { Test, TestingModule } from '@nestjs/testing';
import { CovidLogController } from './covid-log.controller';
import { CovidLogService } from './covid-log.service';

describe('CovidLogController', () => {
  let controller: CovidLogController;

  const mockCovidLogService = {
    getSeries: jest.fn(),
    getLocations: jest.fn(),
    getFields: jest.fn(),
  };

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

  describe('getSeries', () => {
    it('should call covidLogService.getSeries', () => {
      controller.getSeries({});
      expect(mockCovidLogService.getSeries).toHaveBeenCalled();
    });

    it('should call covidLogService.getSeries with the correct arguments', () => {
      const query = {
        locations: ['USA', 'CAN'],
        fields: ['new_cases', 'new_deaths'],
        from: '2020-01-01',
        to: '2020-01-31',
      };
      controller.getSeries(query);
      expect(mockCovidLogService.getSeries).toHaveBeenCalledWith(
        query.locations,
        query.fields,
        query.from,
        query.to,
      );
    });

    it('should call covidLogService.getSeries with the correct default arguments', () => {
      const query = {};
      controller.getSeries(query);
      expect(mockCovidLogService.getSeries).toHaveBeenCalledWith(
        [],
        [],
        undefined,
        undefined,
      );
    });
  });

  describe('getLocations', () => {
    it('should call covidLogService.getLocations', () => {
      controller.getLocations();
      expect(mockCovidLogService.getLocations).toHaveBeenCalled();
    });
  });

  describe('getFields', () => {
    it('should call covidLogService.getFields', () => {
      controller.getFields();
      expect(mockCovidLogService.getFields).toHaveBeenCalled();
    });
  });
});
