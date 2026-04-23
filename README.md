# RaidNation

Ce projet est une application Java Spring Boot avec PostgreSQL et pgAdmin pour le developpement local.

## Prerequis

- Java 17
- Maven 3.9+
- Docker + Docker Compose

## 1) Demarrer la base de donnees (Docker)

Depuis la racine du projet:

```bash
docker compose -f docker/docker-compose.yml up -d
```

Services disponibles:

- PostgreSQL: `localhost:5432`
- pgAdmin: [http://localhost:5050](http://localhost:5050)

Identifiants dev par defaut:

- PostgreSQL: `admin` / `admin` (database: `raidnation`)
- pgAdmin: `admin@local.dev` / `admin`

## 2) Demarrer l'application Java (mode normal)

Option A (IDE):

- Lancer la classe `RaidNationApplication`.

Option B (terminal):

```bash
mvn spring-boot:run
```

L'application est disponible sur:

- [http://localhost:8080](http://localhost:8080)

## 3) Demarrer l'application en mode test local

Pour charger aussi les controllers/views de test:

- Lancer la classe `TestApplication` (dans `src/test/java`).

## Arreter les services Docker

```bash
docker compose -f docker/docker-compose.yml down
```

## Documentation

Le sommaire de la documentation est disponible ici:

- [docs/README.md](docs/README.md)
