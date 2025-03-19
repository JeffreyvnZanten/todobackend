#!/bin/sh
# wait-for-db.sh

set -e

host="$DB_HOST"
port="$DB_PORT"
shift

# Wait for the database to be ready
echo "Waiting for PostgreSQL to be ready on $host:$port..."
until nc -z "$host" "$port"; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "PostgreSQL is up - executing command"
exec "$@"