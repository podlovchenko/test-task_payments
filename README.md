Запуск

`docker-compose up -d postgres`<br>
`docker-compose up -d accounts`

Создание счета

`curl --header "Content-Type: application/json" -d "{\"email\":\"test1\"}" http://localhost:3000/accounts` <br>
`curl --header "Content-Type: application/json" -d "{\"email\":\"test2\"}" http://localhost:3000/accounts` <br>
`curl --header "Content-Type: application/json" -d "{\"email\":\"test3\"}" http://localhost:3000/accounts` <br>

`curl --header "Content-Type: application/json" -d "{\"paymentId\":\"123\",\"email\":\"test1\",\"amount\":\"100\"}" http://localhost:3000/accounts/payment` <br>
`curl --header "Content-Type: application/json" -d "{\"paymentId\":\"1234\",\"email\":\"test2\",\"amount\":\"100\"}" http://localhost:3000/accounts/payment` <br>

`curl --header "Content-Type: application/json" -d " {\"userFrom\":\"2\",\"userTo\":\"1\",\"amount\":\"40\"}" http://localhost:3000/accounts/transfer` <br>
