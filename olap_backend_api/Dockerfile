FROM python:3.13-slim AS deps

WORKDIR /app

COPY ./requirements/base.txt /app/
RUN pip install --upgrade pip && pip install --no-cache-dir -r base.txt

FROM python:3.13-slim AS runner

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        curl \
        && rm -rf /var/lib/apt/lists/*

COPY --from=deps /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=deps /usr/local/bin /usr/local/bin

COPY . .

RUN groupadd -r django && useradd -r -g django django \
    && chown -R django:django /app

USER django

EXPOSE 8000
