#!/bin/sh

set -e

export PGHOST=${IRIS_API_POSTGRESQL_SERVICE_HOST:-postgres}
export PGUSER=${POSTGRES_USER:-postgres}
export PGPASSWORD=$IRIS_API_DB_PASSWORD
export PGDATABASE=${IRIS_API_POSTGRES_DB:-iris_api_production}

yarn setup
yarn production
