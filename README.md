Запуск

`docker-compose up -d postgres`
`docker-compose up -d accounts`

Создание счета

`curl --header "Content-Type: application/json" -d "{\"email\":\"test1\"}" http://localhost:3000/accounts`

