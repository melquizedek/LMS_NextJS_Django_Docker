#!/bin/sh
set -e

# First boot: apply migrations and populate the shared static volume
# (Dockerfile.build-time collectstatic is shadowed by the empty named volume).
python manage.py migrate --noinput
python manage.py collectstatic --noinput --clear

exec "$@"