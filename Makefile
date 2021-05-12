lint:
	npm run lint
	
test:
	npm run test

docker-compose-up:
	docker-compose up -d postgres
	docker-compose up -d accounts
	
docker-compose-lint:
	docker-compose exec -T accounts make lint

docker-compose-test:
	docker-compose exec -T accounts make test
