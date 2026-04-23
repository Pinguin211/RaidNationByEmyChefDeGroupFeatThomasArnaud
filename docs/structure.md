# Structure du projet

Vue d'ensemble de l'organisation actuelle.

## Racine

- `docker/` : configuration Docker Compose (PostgreSQL, pgAdmin)
- `docs/` : documentation du projet
- `src/main/java/` : code applicatif principal
- `src/main/resources/` : configuration Spring (`application.properties`)
- `src/test/java/` : code de test (dont `TestApplication` et controllers de vue test)
- `src/test/resources/static/` : pages statiques de test
- `pom.xml` : dependances et build Maven

## Packages Java principaux

- `entity/` : entites JPA (`Player`, `Classe`, `Groupe`)
- `repository/` : repositories Spring Data JPA
- `controller/` : controllers API principaux (creation/suppression/associations)

## Packages Java de test

- `controller/` : controllers de vue test (`PlayerViewController`, `ClasseViewController`, `GroupeViewController`)
