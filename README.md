# Node-js 9 
## Задание: 
Необходимо разработать простое чат-приложение. Дизайн приложения произвольный. Оно должно предоставлять следующий функционал:
+ Страница авторизации пользователя. Для авторизации необходимо указать свое имя.
+ После авторизации пользователь попадает на главную страницу приложения. Страница разделена на две части, слева должен отображать список всех активных пользователей, а справа находится окно чата с сообщениями и инпутом для ввода.
+ Вся история сообщений находятся в памяти.
+ Что бы история не пропадала при перезапуске сервера, ее необходимо сохранять в файл при каждом изменении. При запуске сервера, необходимо загрузить в память историю сообщений из файла.

Результатом выполнения задания будет являться ссылка на публичный репозиторий с кодом в GitHub
### default.conf
```nginx configuration
    server {
        listen 80;
        server_name localhost;

        location /favicon.ico {
            log_not_found off;
            access_log off;
        }

        location / {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_pass http://nodejs-l9:3000;
        }
    }

```
### Dockerfile
``` dockerfile
FROM node:latest

WORKDIR /app

COPY project/package.json .

COPY project/ .
COPY project/. .

RUN chown -R node:node /app

USER node

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
```
### docker-compose.yaml
``` yaml
version: "2"

services:
  nodejs-l9:
    build:
      context: .
      dockerfile: Dockerfile
    user: "node"
    ports:
      - "3000:3000"
    volumes:
      - ./project:/app
    networks:
      node-network-l9:
        ipv4_address: 172.29.0.2
    container_name: nodejs-l9
    command: bash -c "npm install && npm run start"
  web-l9:
    image: nginx:stable
    ports:
      - "8080:80"
    volumes:
      - ./project:/app
      - ./default.conf:/etc/nginx/conf.d/default.conf
    container_name: web-l9
    depends_on:
      - nodejs-l9
    networks:
      - node-network-l9


networks:
  node-network-l9:
    driver: bridge
    ipam:
      config:
          - subnet: 172.29.0.0/16
            gateway: 172.29.0.1
```
