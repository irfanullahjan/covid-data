import { BaseEntity } from 'src/common/entities/base.entity';
import { Column } from 'typeorm';

export class CovidLog extends BaseEntity {
  @Column({ type: 'varchar', length: 3 })
  iso_code: string;

  @Column({ type: 'varchar', length: 128 })
  continent: string;

  @Column({ type: 'varchar', length: 128 })
  location: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'double precision' })
  total_cases: number;

  @Column({ type: 'double precision' })
  new_cases: number;

  @Column({ type: 'double precision' })
  new_cases_smoothed: number;

  @Column({ type: 'double precision' })
  total_deaths: number;

  @Column({ type: 'double precision' })
  new_deaths: number;

  @Column({ type: 'double precision' })
  new_deaths_smoothed: number;

  @Column({ type: 'double precision' })
  total_cases_per_million: number;

  @Column({ type: 'double precision' })
  new_cases_per_million: number;

  @Column({ type: 'double precision' })
  new_cases_smoothed_per_million: number;

  @Column({ type: 'double precision' })
  total_deaths_per_million: number;

  @Column({ type: 'double precision' })
  new_deaths_per_million: number;

  @Column({ type: 'double precision' })
  new_deaths_smoothed_per_million: number;

  @Column({ type: 'double precision' })
  reproduction_rate: number;

  @Column({ type: 'double precision' })
  icu_patients: number;

  @Column({ type: 'double precision' })
  icu_patients_per_million: number;

  @Column({ type: 'double precision' })
  hosp_patients: number;

  @Column({ type: 'double precision' })
  hosp_patients_per_million: number;

  @Column({ type: 'double precision' })
  weekly_icu_admissions: number;

  @Column({ type: 'double precision' })
  weekly_icu_admissions_per_million: number;

  @Column({ type: 'double precision' })
  weekly_hosp_admissions: number;

  @Column({ type: 'double precision' })
  weekly_hosp_admissions_per_million: number;

  @Column({ type: 'double precision' })
  total_tests: number;

  @Column({ type: 'double precision' })
  new_tests: number;

  @Column({ type: 'double precision' })
  total_tests_per_thousand: number;

  @Column({ type: 'double precision' })
  new_tests_per_thousand: number;

  @Column({ type: 'double precision' })
  new_tests_smoothed: number;

  @Column({ type: 'double precision' })
  new_tests_smoothed_per_thousand: number;

  @Column({ type: 'double precision' })
  positive_rate: number;

  @Column({ type: 'double precision' })
  tests_per_case: number;

  @Column({ type: 'double precision' })
  tests_units: number;

  @Column({ type: 'double precision' })
  total_vaccinations: number;

  @Column({ type: 'double precision' })
  people_vaccinated: number;

  @Column({ type: 'double precision' })
  people_fully_vaccinated: number;

  @Column({ type: 'double precision' })
  total_boosters: number;

  @Column({ type: 'double precision' })
  new_vaccinations: number;

  @Column({ type: 'double precision' })
  new_vaccinations_smoothed: number;

  @Column({ type: 'double precision' })
  total_vaccinations_per_hundred: number;

  @Column({ type: 'double precision' })
  people_vaccinated_per_hundred: number;

  @Column({ type: 'double precision' })
  people_fully_vaccinated_per_hundred: number;

  @Column({ type: 'double precision' })
  total_boosters_per_hundred: number;

  @Column({ type: 'double precision' })
  new_vaccinations_smoothed_per_million: number;

  @Column({ type: 'double precision' })
  new_people_vaccinated_smoothed: number;

  @Column({ type: 'double precision' })
  new_people_vaccinated_smoothed_per_hundred: number;

  @Column({ type: 'double precision' })
  stringency_index: number;

  @Column({ type: 'double precision' })
  population_density: number;

  @Column({ type: 'double precision' })
  median_age: number;

  @Column({ type: 'double precision' })
  aged_65_older: number;

  @Column({ type: 'double precision' })
  aged_70_older: number;

  @Column({ type: 'double precision' })
  gdp_per_capita: number;

  @Column({ type: 'double precision' })
  extreme_poverty: number;

  @Column({ type: 'double precision' })
  cardiovasc_death_rate: number;

  @Column({ type: 'double precision' })
  diabetes_prevalence: number;

  @Column({ type: 'double precision' })
  female_smokers: number;

  @Column({ type: 'double precision' })
  male_smokers: number;

  @Column({ type: 'double precision' })
  handwashing_facilities: number;

  @Column({ type: 'double precision' })
  hospital_beds_per_thousand: number;

  @Column({ type: 'double precision' })
  life_expectancy: number;

  @Column({ type: 'double precision' })
  human_development_index: number;

  @Column({ type: 'double precision' })
  population: number;

  @Column({ type: 'double precision' })
  excess_mortality_cumulative_absolute: number;

  @Column({ type: 'double precision' })
  excess_mortality_cumulative: number;

  @Column({ type: 'double precision' })
  excess_mortality: number;

  @Column({ type: 'double precision' })
  excess_mortality_cumulative_per_million: number;

  constructor(data: Partial<CovidLog>) {
    super();
    Object.assign(this, data);
  }
}
