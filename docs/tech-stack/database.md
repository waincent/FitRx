# Database Tech Stack

## Scope

This document covers relational persistence, schema migration, and search/storage-adjacent persistence concerns.

## Primary Database Stack

### Relational Database

- PostgreSQL

### Access Strategy

- R2DBC for application data access
- JDBC for Liquibase schema migration

### Schema Migration

- Liquibase changelogs under `src/main/resources/config/liquibase`

## Current Characteristics

### Canonical Data Store

PostgreSQL is the source of truth for application data.

- Users and authorities live here.
- Business writes are persisted here first.
- Search indexing is secondary, not primary storage.

### Migration Discipline

Liquibase is already the correct source-of-truth mechanism for schema evolution.

- This should remain the only authoritative schema migration path.
- Manual database drift should be avoided.

## Search-Adjacent Persistence

### Search Store

- Elasticsearch is currently wired as the search repository target.

### Practical Local Constraint

The project currently assumes Elasticsearch-compatible behavior during startup for repository initialization.

In practice, this means:

- Native Elasticsearch is the safest search dependency for full compatibility.
- OpenSearch is not a drop-in replacement here without further compatibility work.

## Recommended Position

### Keep

- PostgreSQL
- Liquibase
- R2DBC + JDBC split

### Improve

- Make search synchronization optional for local development.
- Keep search as a secondary capability instead of a hard boot requirement.

## Database Checklist

- [ ] Keep PostgreSQL as the primary transactional store.
- [ ] Keep Liquibase as the only schema migration authority.
- [ ] Avoid schema changes outside changelogs.
- [ ] Treat search indexing as a secondary concern.
- [ ] Define clearly which local modes require search and which do not.

## Key Files

- [src/main/resources/config/application.yml](/Users/waincent/Workspace/FitRx/src/main/resources/config/application.yml)
- [src/main/resources/config/application-dev.yml](/Users/waincent/Workspace/FitRx/src/main/resources/config/application-dev.yml)
- [src/main/resources/config/application-prod.yml](/Users/waincent/Workspace/FitRx/src/main/resources/config/application-prod.yml)
- [src/main/resources/config/liquibase/master.xml](/Users/waincent/Workspace/FitRx/src/main/resources/config/liquibase/master.xml)
- [src/main/docker/postgresql.yml](/Users/waincent/Workspace/FitRx/src/main/docker/postgresql.yml)
