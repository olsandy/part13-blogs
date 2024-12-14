# part13-blogs

## Installation

```bash
npm install
```

To setup database container run

```bash
docker compose -f docker-compose.yml up
```

Inspect database with for example

```bash
docker exec -it <CONTAINER_ID> psql -U postgres postgres
```

## Run

```bash
npm run dev
```
