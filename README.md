# Docker Compose

<!-- Разворачиваем проект на своем фреймворке с подключением webpack/db -->
Создайте Docker Compose, поместив туда ваш проект, с которым вы обычно работаете в повседневной практике.

## Ссылки

* [Overview of Docker Compose](https://docs.docker.com/compose/)
* [Compose file version 3 reference](https://docs.docker.com/compose/compose-file/compose-file-v3/)
* [Code Basics](https://github.com/hexlet-basics/hexlet-basics)
* [Postgres Docker image](https://hub.docker.com/_/postgres)

## Задачи

1. Установите [Docker Compose](https://docs.docker.com/compose/install/).
1. Создайте файл `docker-compose.yml` в корневой директории проекта. Опишите в нем используемые сервисы - ваше приложение, база данных / webpack.
1. Пропишите volume для вашего приложения.
1. Инициализируйте проект на вашем фреймворке, убедитесь что он работает. Если ваше приложение использует базу данных, используйте коннект к этой базе. Хостом будет являться имя сервиса базы, например `database`.
1. Войдите в контейнер с приложением командой `docker-compose exec bash`.
1. Выставьте наружу нужный порт и проверьте что запущенный сервер доступен из браузера.
1. Поэкспериментируйте с Docker Compose. Попробуйте пересоздать контейнеры, выполнить команды внутри контейнера.

Результат выполнения задачи — приложение, которое работает внутри Docker Compose, а также доступно снаружи по определённому порту.

