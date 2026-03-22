# Container and Dependency Topology

## Scope

This document covers Docker Compose, local service dependencies, and containerized runtime responsibilities.

## Current Container Stack

### Application Packaging

- Spring Boot jar packaging
- Optional Docker image build via Jib

### Local Dependency Containers

- PostgreSQL
- Elasticsearch
- Kafka

### Compose Definitions

- `src/main/docker/services.yml`
- `src/main/docker/app.yml`
- service-specific YAML files under `src/main/docker`

## Current Role of Containers

### Development

Docker Compose is intended to provide local infrastructure dependencies.

- Database
- Search
- Event streaming

### Packaging and Deployment

The app can be containerized for local packaged runs and deployment-style testing.

## Observed Constraint

The project currently relies heavily on the availability of external services for a smooth startup path.

This is acceptable for integration testing, but it is heavier than necessary for routine frontend or CRUD-focused local work.

## Recommended Container Strategy

### Keep

- Docker Compose for integration-complete local environments
- Jib for image build workflows

### Clarify Modes

The project should support two local modes:

1. Minimal local mode
   - PostgreSQL required
   - Kafka optional
   - Elasticsearch optional

2. Full integration mode
   - PostgreSQL required
   - Kafka enabled
   - Elasticsearch enabled

This split will reduce local startup friction while preserving realistic integration environments.

## Container Checklist

- [ ] Keep Compose as the default full integration environment.
- [ ] Document which services are required by each runtime profile.
- [ ] Avoid making every developer scenario require all infra services.
- [ ] Keep `app.yml` for packaged integration testing.
- [ ] Keep service-specific compose files small and explicit.

## Key Files

- [src/main/docker/services.yml](/Users/waincent/Workspace/FitRx/src/main/docker/services.yml)
- [src/main/docker/app.yml](/Users/waincent/Workspace/FitRx/src/main/docker/app.yml)
- [src/main/docker/postgresql.yml](/Users/waincent/Workspace/FitRx/src/main/docker/postgresql.yml)
- [src/main/docker/elasticsearch.yml](/Users/waincent/Workspace/FitRx/src/main/docker/elasticsearch.yml)
- [src/main/docker/kafka.yml](/Users/waincent/Workspace/FitRx/src/main/docker/kafka.yml)
