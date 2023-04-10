## Covid19 Data Visualization App

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