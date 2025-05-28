# Express.js demo

An [Express.js](https://expressjs.com) demo.

- Built with [Ajv](https://ajv.js.org), [Esbuild](https://esbuild.github.io), [Handlebars](https://handlebarsjs.com), [HTML5 Boilerplate](https://html5boilerplate.com), [I18next](https://www.i18next.com), [Jaeger](https://www.jaegertracing.io), [Mailpit](https://mailpit.axllent.org), [MinIO](https://min.io), [MongoDB](https://www.mongodb.com), [Nginx](https://nginx.org), [Nodemailer](https://nodemailer.com), [OpenTelemetry](https://opentelemetry.io), [Passport](https://www.passportjs.org), [Pico CSS](https://picocss.com), [PostgreSQL](https://www.postgresql.org), [Prometheus](https://prometheus.io), [Redis](https://redis.io), [Sass](https://sass-lang.com), [SQLite](https://sqlite.org), [Terminus](https://github.com/godaddy/terminus), [TypeScript](https://www.typescriptlang.org) and [WhoDB](https://whodb.clidey.com).
- Developed with [Biome](https://biomejs.dev), [Commitlint](https://commitlint.js.org), [EditorConfig](https://editorconfig.org), [Husky](https://typicode.github.io/husky), [Tsx](https://tsx.is) and [VSCodium](https://vscodium.com).
- Documented with [Redocly](https://redocly.com).
- Tested with [Artillery](https://www.artillery.io), [Jest](https://jestjs.io), [Playwright](https://playwright.dev) and [Testcontainers](https://testcontainers.com).

## Requirements

- [Docker Compose](https://docs.docker.com/compose/install)
- [Make](https://www.gnu.org/software/make)
- [Mkcert](https://github.com/FiloSottile/mkcert)
- [Node.js](https://nodejs.org/en)

## How to use

### Setup

```bash
make setup
```

### Start

```bash
make start
```

- See app [here](https://www.expressjs-demo.localhost)
- See [Jaeger](https://www.jaegertracing.io) UI [here](http://localhost:16686)
- See [Mailpit](https://mailpit.axllent.org) UI [here](http://localhost:8025)
- See [MinIO](https://min.io) UI [here](http://localhost:9001)
- See [Prometheus](https://prometheus.io) UI [here](http://localhost:9090)
- See [WhoDB](https://whodb.clidey.com) UI [here](http://localhost:8080)

### Build

```bash
make build
```

### Lint

```bash
make lint
```

### OpenAPI with [Redocly](https://redocly.com)

```bash
make open-api
```

### Benchmark with [Artillery](https://www.artillery.io)

```bash
make benchmark
```

### E2E with [Playwright](https://playwright.dev)

```bash
make e2e
```

### Test with [Jest](https://jestjs.io)

```bash
make test
```
