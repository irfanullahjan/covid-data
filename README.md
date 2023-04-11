# Covid19 Data Visualization App

This is a data visualization app that allows to compare various regions and covid19 metrics.

The source data is provided by Our World in Data: https://github.com/owid/covid-19-data/blob/master/public/data/owid-covid-data.csv. The data is processed when the app starts and stored in the database. The import process may be configured in `server/src/config.ts` file. If you run into issues with the import process, you can try adjusting the `DATA_IMPORT_BATCH_SIZE`. Import may also be disabled by setting `DATA_IMPORT_DISABLED` to `true`.

This app is built with React (Next.js), Nest.js, and PostgreSQL.

To run the application, open the terminal and type the following commands:
```
docker compose up db -d
cd server
npm i
npm start
```
Open a new terminal at `/client` directory and run:
```
npm i
npm run dev
```

## Issues and possible improvements

- Database normalization: the dataset is imported as is, with things such as aggregated data (e.g. continents, income groups). With database normalization, the aggregations would be calculated on the fly but this would require more complex queries.

- Data parsing and import: There is room for improved data data parsing and sanitization e.g. date ranges checked to ensure no gaps. Recharts library expects the time series data to be sorted by date, and any gaps in the data will cause the chart to break. This could be fixed by adding a date range to the query and filling in the missing dates with null values.

- Data integration: The data is imported from a CSV file. Possible improvement would be to integrate it with source via HTTP directly. Then the data could be updated on a regular basis e.g. hourly, daily, weekly using a cron job.

- Performance: Frontedn and backend testing. The test coverage is very low. The frontend has no tests at all. The backend has some tests e.g. covid-log.controller.spec.ts and covid-log.service.spec.ts etc. The tests could be improved and more tests could be added. There is also end to end testing to be done for the backend. The frontend components could be tested with Jest and React Testing Library. Then there could be integration testing using Cypress.