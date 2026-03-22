# Backend Tech Stack

## Scope

This document covers the JVM application under `src/main/java`, Gradle build logic, and runtime framework choices.

## Current Stack

### Language and Runtime

- Java 21 target compatibility
- Java 25 currently tolerated in local builds

### Build and Dependency Management

- Gradle
- Gradle Wrapper
- `buildSrc` conventions

### Application Framework

- Spring Boot 3
- Spring WebFlux
- Spring Security
- Spring Boot Actuator

### Data and Integration

- Spring Data R2DBC
- Spring Data Elasticsearch
- Liquibase
- Spring Cloud Stream
- Kafka binder

### Documentation and Generation

- Springdoc OpenAPI
- OpenAPI Generator

### Supporting Libraries

- MapStruct
- Micrometer
- JHipster framework utilities

## Architectural Characteristics

### Reactive Foundation

The backend is primarily built around reactive flows.

- Controllers use reactive types.
- Repositories use reactive persistence.
- Service methods frequently return `Mono` and `Flux`.

This means future backend work should prefer reactive consistency instead of mixing in blocking designs casually.

### JHipster Base

The project is generated from JHipster and still carries many of its conventions.

- Profile-based environment setup.
- Gradle profile wiring.
- Generated admin and account modules.
- Docker Compose support for local dependencies.

## Recommended Backend Position

The backend does not need a framework rewrite right now.

### Keep

- Java
- Gradle
- Spring Boot
- WebFlux
- R2DBC
- Liquibase
- Actuator
- Spring Security

### Review Carefully but Do Not Replace Blindly

- Elasticsearch dependency model
- Kafka always-on assumptions in local startup
- JHipster-generated profile defaults

The recent local startup work showed that search and stream dependencies are too tightly coupled to boot behavior for developer convenience.

## Recommended Improvements

### 1. Make External Dependencies More Explicit

- Avoid making Kafka and search mandatory for every local boot.
- Gate optional integrations with clearer profiles or properties.
- Ensure local developer mode can run with minimal dependencies when business workflows allow it.

### 2. Stabilize Profile Strategy

Current Gradle `bootRun` behavior forces `dev` profiles in a way that can override runtime intent.

Recommended direction:

- Document profile combinations clearly.
- Reduce hidden profile coupling.
- Prefer more explicit app startup modes.

### 3. Separate Core Domain from Search Concerns

Search synchronization should not prevent local application boot when search is not the feature under development.

Recommended direction:

- Keep search integration behind an interface.
- Keep no-op or fallback strategies available for local scenarios.

## Backend Checklist

- [ ] Document supported runtime profiles and what each profile enables.
- [ ] Reduce hidden coupling between `dev` profile and optional infrastructure.
- [ ] Keep reactive patterns consistent in new code.
- [ ] Maintain Liquibase as the source of schema truth.
- [ ] Treat Kafka and search as explicit integration capabilities.
- [ ] Keep build reproducibility through Gradle Wrapper.

## Key Files

- [build.gradle](/Users/waincent/Workspace/FitRx/build.gradle)
- [gradle/spring-boot.gradle](/Users/waincent/Workspace/FitRx/gradle/spring-boot.gradle)
- [src/main/java/com/panorise/fitrx/FitRxApp.java](/Users/waincent/Workspace/FitRx/src/main/java/com/panorise/fitrx/FitRxApp.java)
- [src/main/resources/config/application.yml](/Users/waincent/Workspace/FitRx/src/main/resources/config/application.yml)
