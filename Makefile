-include ./.env

setup:
	cp ./.env.example ./.env || true
	mkcert -install
	npm install
	npx husky
.PHONY: setup

start:
	rm -rf ./services/nginx/etc/certs
	mkdir ./services/nginx/etc/certs
	mkcert \
	  -cert-file ./services/nginx/etc/certs/default.crt \
	  -key-file ./services/nginx/etc/certs/default.key \
	  ${APP_DOMAIN} www.${APP_DOMAIN} localhost 127.0.0.1 ::1
	docker compose up --build --detach
	docker compose logs --follow app
.PHONY: start

build:
	rm -rf ./dist
	/bin/sh ./build.sh
.PHONY: build

lint:
	npx biome check --write
	npx tsc
.PHONY: lint

open-api:
	npx @redocly/cli lint
	npx @redocly/cli build-docs --output=./open-api/dist/index.html
.PHONY: open-api

benchmark:
	for scenario in ./benchmark/*.spec.yaml; \
	do \
	  npx artillery run --config=./artillery.config.yaml --insecure --quiet $$scenario; \
	done
.PHONY: benchmark

e2e:
	docker build --file=./playwright.Dockerfile --tag=playwright .
	docker run -it \
	  --ipc=host \
	  --network=host \
	  --rm \
	  --volume=${PWD}/e2e:/www/e2e \
	  --volume=${PWD}/playwright-report:/www/playwright-report \
	  --volume=${PWD}/test-results:/www/test-results \
	  --volume=${PWD}/playwright.config.js:/www/playwright.config.js \
	  playwright \
	  npx playwright test --update-snapshots
.PHONY: e2e

test:
	npx jest --setupFiles=dotenv/config --update-snapshot
.PHONY: test
