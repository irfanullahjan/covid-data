import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class CovidLog extends BaseEntity {
  @Column({ type: 'varchar', length: 64 })
  iso_code: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  continent: string;

  @Column({ type: 'varchar', length: 128 })
  location: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'double precision', nullable: true })
  total_cases: number;

  @Column({ type: 'double precision', nullable: true })
  new_cases: number;

  @Column({ type: 'double precision', nullable: true })
  new_cases_smoothed: number;

  @Column({ type: 'double precision', nullable: true })
  total_deaths: number;

  @Column({ type: 'double precision', nullable: true })
  new_deaths: number;

  @Column({ type: 'double precision', nullable: true })
  new_deaths_smoothed: number;

  @Column({ type: 'double precision', nullable: true })
  total_cases_per_million: number;

  @Column({ type: 'double precision', nullable: true })
  new_cases_per_million: number;

  @Column({ type: 'double precision', nullable: true })
  new_cases_smoothed_per_million: number;

  @Column({ type: 'double precision', nullable: true })
  total_deaths_per_million: number;

  @Column({ type: 'double precision', nullable: true })
  new_deaths_per_million: number;

  @Column({ type: 'double precision', nullable: true })
  new_deaths_smoothed_per_million: number;

  @Column({ type: 'double precision', nullable: true })
  reproduction_rate: number;

  @Column({ type: 'double precision', nullable: true })
  icu_patients: number;

  @Column({ type: 'double precision', nullable: true })
  icu_patients_per_million: number;

  @Column({ type: 'double precision', nullable: true })
  hosp_patients: number;

  @Column({ type: 'double precision', nullable: true })
  hosp_patients_per_million: number;

  @Column({ type: 'double precision', nullable: true })
  weekly_icu_admissions: number;

  @Column({ type: 'double precision', nullable: true })
  weekly_icu_admissions_per_million: number;

  @Column({ type: 'double precision', nullable: true })
  weekly_hosp_admissions: number;

  @Column({ type: 'double precision', nullable: true })
  weekly_hosp_admissions_per_million: number;

  @Column({ type: 'double precision', nullable: true })
  total_tests: number;

  @Column({ type: 'double precision', nullable: true })
  new_tests: number;

  @Column({ type: 'double precision', nullable: true })
  total_tests_per_thousand: number;

  @Column({ type: 'double precision', nullable: true })
  new_tests_per_thousand: number;

  @Column({ type: 'double precision', nullable: true })
  new_tests_smoothed: number;

  @Column({ type: 'double precision', nullable: true })
  new_tests_smoothed_per_thousand: number;

  @Column({ type: 'double precision', nullable: true })
  positive_rate: number;

  @Column({ type: 'double precision', nullable: true })
  tests_per_case: number;

  @Column({ type: 'double precision', nullable: true })
  tests_units: number;

  @Column({ type: 'double precision', nullable: true })
  total_vaccinations: number;

  @Column({ type: 'double precision', nullable: true })
  people_vaccinated: number;

  @Column({ type: 'double precision', nullable: true })
  people_fully_vaccinated: number;

  @Column({ type: 'double precision', nullable: true })
  total_boosters: number;

  @Column({ type: 'double precision', nullable: true })
  new_vaccinations: number;

  @Column({ type: 'double precision', nullable: true })
  new_vaccinations_smoothed: number;

  @Column({ type: 'double precision', nullable: true })
  total_vaccinations_per_hundred: number;

  @Column({ type: 'double precision', nullable: true })
  people_vaccinated_per_hundred: number;

  @Column({ type: 'double precision', nullable: true })
  people_fully_vaccinated_per_hundred: number;

  @Column({ type: 'double precision', nullable: true })
  total_boosters_per_hundred: number;

  @Column({ type: 'double precision', nullable: true })
  new_vaccinations_smoothed_per_million: number;

  @Column({ type: 'double precision', nullable: true })
  new_people_vaccinated_smoothed: number;

  @Column({ type: 'double precision', nullable: true })
  new_people_vaccinated_smoothed_per_hundred: number;

  @Column({ type: 'double precision', nullable: true })
  stringency_index: number;

  @Column({ type: 'double precision', nullable: true })
  population_density: number;

  @Column({ type: 'double precision', nullable: true })
  median_age: number;

  @Column({ type: 'double precision', nullable: true })
  aged_65_older: number;

  @Column({ type: 'double precision', nullable: true })
  aged_70_older: number;

  @Column({ type: 'double precision', nullable: true })
  gdp_per_capita: number;

  @Column({ type: 'double precision', nullable: true })
  extreme_poverty: number;

  @Column({ type: 'double precision', nullable: true })
  cardiovasc_death_rate: number;

  @Column({ type: 'double precision', nullable: true })
  diabetes_prevalence: number;

  @Column({ type: 'double precision', nullable: true })
  female_smokers: number;

  @Column({ type: 'double precision', nullable: true })
  male_smokers: number;

  @Column({ type: 'double precision', nullable: true })
  handwashing_facilities: number;

  @Column({ type: 'double precision', nullable: true })
  hospital_beds_per_thousand: number;

  @Column({ type: 'double precision', nullable: true })
  life_expectancy: number;

  @Column({ type: 'double precision', nullable: true })
  human_development_index: number;

  @Column({ type: 'double precision', nullable: true })
  population: number;

  @Column({ type: 'double precision', nullable: true })
  excess_mortality_cumulative_absolute: number;

  @Column({ type: 'double precision', nullable: true })
  excess_mortality_cumulative: number;

  @Column({ type: 'double precision', nullable: true })
  excess_mortality: number;

  @Column({ type: 'double precision', nullable: true })
  excess_mortality_cumulative_per_million: number;

  constructor(data: Partial<CovidLog>) {
    super();
    Object.assign(this, data);
  }
}
