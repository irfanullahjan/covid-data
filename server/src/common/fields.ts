export const fieldsConfig: Record<string, { name: string; aggregate: string }> =
  {
    total_cases: {
      name: 'Total Cases',
      aggregate: 'SUM',
    },
    new_cases: {
      name: 'New Cases',
      aggregate: 'SUM',
    },
    new_cases_smoothed: {
      name: 'New Cases Smoothed',
      aggregate: 'SUM',
    },
    total_deaths: {
      name: 'Total Deaths',
      aggregate: 'SUM',
    },
    new_deaths: {
      name: 'New Deaths',
      aggregate: 'SUM',
    },
    new_deaths_smoothed: {
      name: 'New Deaths Smoothed',
      aggregate: 'SUM',
    },
    total_cases_per_million: {
      name: 'Total Cases Per Million',
      aggregate: 'AVG',
    },
    new_cases_per_million: {
      name: 'New Cases Per Million',
      aggregate: 'AVG',
    },
    new_cases_smoothed_per_million: {
      name: 'New Cases Smoothed Per Million',
      aggregate: 'AVG',
    },
    total_deaths_per_million: {
      name: 'Total Deaths Per Million',
      aggregate: 'AVG',
    },
    new_deaths_per_million: {
      name: 'New Deaths Per Million',
      aggregate: 'AVG',
    },
    new_deaths_smoothed_per_million: {
      name: 'New Deaths Smoothed Per Million',
      aggregate: 'AVG',
    },
    reproduction_rate: {
      name: 'Reproduction Rate',
      aggregate: 'AVG',
    },
    icu_patients: {
      name: 'ICU Patients',
      aggregate: 'SUM',
    },
    icu_patients_per_million: {
      name: 'ICU Patients Per Million',
      aggregate: 'AVG',
    },
    hosp_patients: {
      name: 'Hosp Patients',
      aggregate: 'SUM',
    },
    hosp_patients_per_million: {
      name: 'Hosp Patients Per Million',
      aggregate: 'AVG',
    },
    weekly_icu_admissions: {
      name: 'Weekly ICU Admissions',
      aggregate: 'SUM',
    },
    weekly_icu_admissions_per_million: {
      name: 'Weekly ICU Admissions Per Million',
      aggregate: 'AVG',
    },
    weekly_hosp_admissions: {
      name: 'Weekly Hosp Admissions',
      aggregate: 'SUM',
    },
    weekly_hosp_admissions_per_million: {
      name: 'Weekly Hosp Admissions Per Million',
      aggregate: 'AVG',
    },
    total_tests: {
      name: 'Total Tests',
      aggregate: 'SUM',
    },
    new_tests: {
      name: 'New Tests',
      aggregate: 'SUM',
    },
    total_tests_per_thousand: {
      name: 'Total Tests Per Thousand',
      aggregate: 'AVG',
    },
    new_tests_per_thousand: {
      name: 'New Tests Per Thousand',
      aggregate: 'AVG',
    },
    new_tests_smoothed: {
      name: 'New Tests Smoothed',
      aggregate: 'SUM',
    },
    new_tests_smoothed_per_thousand: {
      name: 'New Tests Smoothed Per Thousand',
      aggregate: 'AVG',
    },
    positive_rate: {
      name: 'Positive Rate',
      aggregate: 'AVG',
    },
    tests_per_case: {
      name: 'Tests Per Case',
      aggregate: 'AVG',
    },
    tests_units: {
      name: 'Tests Units',
      aggregate: 'AVG',
    },
    total_vaccinations: {
      name: 'Total Vaccinations',
      aggregate: 'SUM',
    },
    people_vaccinated: {
      name: 'People Vaccinated',
      aggregate: 'SUM',
    },
    people_fully_vaccinated: {
      name: 'People Fully Vaccinated',
      aggregate: 'SUM',
    },
    total_boosters: {
      name: 'Total Boosters',
      aggregate: 'SUM',
    },
    new_vaccinations: {
      name: 'New Vaccinations',
      aggregate: 'SUM',
    },
    new_vaccinations_smoothed: {
      name: 'New Vaccinations Smoothed',
      aggregate: 'SUM',
    },
    total_vaccinations_per_hundred: {
      name: 'Total Vaccinations Per Hundred',
      aggregate: 'AVG',
    },
    people_vaccinated_per_hundred: {
      name: 'People Vaccinated Per Hundred',
      aggregate: 'AVG',
    },
    people_fully_vaccinated_per_hundred: {
      name: 'People Fully Vaccinated Per Hundred',
      aggregate: 'AVG',
    },
    total_boosters_per_hundred: {
      name: 'Total Boosters Per Hundred',
      aggregate: 'AVG',
    },
    new_vaccinations_smoothed_per_million: {
      name: 'New Vaccinations Smoothed Per Million',
      aggregate: 'AVG',
    },
    new_people_vaccinated_smoothed: {
      name: 'New People Vaccinated Smoothed',
      aggregate: 'SUM',
    },
    new_people_vaccinated_smoothed_per_hundred: {
      name: 'New People Vaccinated Smoothed Per Hundred',
      aggregate: 'AVG',
    },
    stringency_index: {
      name: 'Stringency Index',
      aggregate: 'AVG',
    },
    population_density: {
      name: 'Population Density',
      aggregate: 'AVG',
    },
    median_age: {
      name: 'Median Age',
      aggregate: 'AVG',
    },
    aged_65_older: {
      name: 'Aged 65 Older',
      aggregate: 'AVG',
    },
    aged_70_older: {
      name: 'Aged 70 Older',
      aggregate: 'AVG',
    },
    gdp_per_capita: {
      name: 'GDP Per Capita',
      aggregate: 'AVG',
    },
    extreme_poverty: {
      name: 'Extreme Poverty',
      aggregate: 'AVG',
    },
    cardiovasc_death_rate: {
      name: 'Cardiovasc Death Rate',
      aggregate: 'AVG',
    },
    diabetes_prevalence: {
      name: 'Diabetes Prevalence',
      aggregate: 'AVG',
    },
    female_smokers: {
      name: 'Female Smokers',
      aggregate: 'AVG',
    },
    male_smokers: {
      name: 'Male Smokers',
      aggregate: 'AVG',
    },
    handwashing_facilities: {
      name: 'Handwashing Facilities',
      aggregate: 'AVG',
    },
    hospital_beds_per_thousand: {
      name: 'Hospital Beds Per Thousand',
      aggregate: 'AVG',
    },
    life_expectancy: {
      name: 'Life Expectancy',
      aggregate: 'AVG',
    },
    human_development_index: {
      name: 'Human Development Index',
      aggregate: 'AVG',
    },
    population: {
      name: 'Population',
      aggregate: 'SUM',
    },
    excess_mortality_cumulative_absolute: {
      name: 'Excess Mortality Cumulative Absolute',
      aggregate: 'SUM',
    },
    excess_mortality_cumulative: {
      name: 'Excess Mortality Cumulative',
      aggregate: 'AVG',
    },
    excess_mortality: {
      name: 'Excess Mortality',
      aggregate: 'SUM',
    },
    excess_mortality_cumulative_per_million: {
      name: 'Excess Mortality Cumulative Per Million',
      aggregate: 'AVG',
    },
  };
