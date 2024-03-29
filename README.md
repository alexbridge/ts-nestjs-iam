# NestJs application with IAM (identity and access management) Fusionauth APP and PostgreSQL DB

## What included into Application

- PostgreSQL version 16 alpine
  - check [init DB script for](./docker/base/db/init-db.sql)
- Fusionauth version 1.48.3
  - check [kickstarter config for credentials](./docker/base/fusionauth/kickstart/kickstart.json)
- NestJS version 10.1

### Local Development

1. Start base services, needed for NestJS

   - enter `docker/base` folder, eg. `cd docker/base`
   - start docker services `make local-start`
     - Fusionauth run at [http://localhost:9011](http://localhost:9011)
       - admin: admin@iam.io
       - password: admin.iam
     - PostgreSQL run at port 5432

2. Run typeorm migrations

   - `npm run migration:run`

3. Start NestJS for local development

   - start NestJS in watch mode `npm run start:dev`
     - Nestjs run at port 3000

4. Open [./postman/api-user-login.rest](./postman/api-user-login.rest) in VSCode

   - run requests and check responses
