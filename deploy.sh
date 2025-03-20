#!/bin/bash
set -e

echo "Stopping containers..."
docker-compose down -v

echo "Starting containers..."
docker-compose up -d

echo "Containers zijn opnieuw opgestart."