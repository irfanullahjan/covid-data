import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CovidLogController } from './covid-log.controller';
import { CovidLogService } from './covid-log.service';
import { CovidLog } from './entities/covid-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CovidLog])],
  controllers: [CovidLogController],
  providers: [CovidLogService],
  exports: [CovidLogService],
})
export class CovidLogModule {}
