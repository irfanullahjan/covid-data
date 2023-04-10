# Covid19 Data Visualization App

This is a data visualization app that allows to compare various regions and covid19 metrics.

The source data is provided by Our World in Data: https://github.com/owid/covid-19-data/blob/master/public/data/owid-covid-data.csv. The data is processed when the app starts and stored in the database. This maybe enabled/disabled in the `server/src/config.ts` file.

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

- Data parsing and import: The data is being imported one row at a time. This is not very efficient and can be improved by importing the data in batches. Also the data could be better sanitized e.g. date ranges checked to ensure no gaps. Recharts library expect the time series data to be sorted by date, and any gaps in the data will cause the chart to break. This could be fixed by adding a date range to the query and filling in the missing dates with null values.

- Data integration: The data is imported from a CSV file. Possible improvement would be to integrate it with source via HTTP directly. Then the data could be updated on a regular basis e.g. hourly, daily, weekly using a cron job.