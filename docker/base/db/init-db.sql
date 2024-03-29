CREATE USER nestjs WITH PASSWORD 'nestjs';
CREATE DATABASE "nestjs";
GRANT ALL PRIVILEGES ON DATABASE "nestjs" TO nestjs;
ALTER DATABASE "nestjs" OWNER TO nestjs;

CREATE USER iam WITH PASSWORD 'iam';
CREATE DATABASE "fusionauth";
GRANT ALL PRIVILEGES ON DATABASE "fusionauth" TO iam;
ALTER DATABASE "fusionauth" OWNER TO iam;

GRANT CREATE ON SCHEMA public TO nestjs;
GRANT CREATE ON SCHEMA public TO iam;