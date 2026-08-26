#!/bin/bash

echo "Starting Celery Worker..."
exec celery -A django_project worker \
  --loglevel=info \
  --concurrency=2 \
  --max-tasks-per-child=1000 \
  --prefetch-multiplier=1 \
  --without-gossip \
  --without-mingle \
  --without-heartbeat