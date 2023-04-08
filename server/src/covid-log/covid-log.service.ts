import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCovidLogDto } from './dto/create-covid-log.dto';
import { UpdateCovidLogDto } from './dto/update-covid-log.dto';
import { CovidLog } from './entities/covid-log.entity';

@Injectable()
export class CovidLogService {
  constructor(
    @InjectRepository(CovidLog)
    private readonly covidLogRepository: Repository<CovidLog>,
  ) {}

  create(createCovidLogDto: CreateCovidLogDto) {
    return this.covidLogRepository.save(new CovidLog(createCovidLogDto));
  }

  findAll() {
    return `This action returns all covidLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} covidLog`;
  }

  update(id: number, updateCovidLogDto: UpdateCovidLogDto) {
    return `This action updates a #${id} covidLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} covidLog`;
  }
}
