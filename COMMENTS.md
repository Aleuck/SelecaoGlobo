# Comments

## 2020-01-13 - Segunda

### Front-end
Pretendo usar next.js, mais para aprender mais sobre a ferramenta do que para motivos técnicos. Porém a capacidade de renderizar em backend sem muito esforço pode ser vantajosa, diminuindo o tempo do *First Meaningful Paint*.

### Back End

Pretendo escolher um destes:

  - Feathers.js - Facilita a utilização de socket.io com *real time updates*;
  - Express.js - Flexibilidade; e
  - Flask - Flexibilidade.

### Database
Pretendo escolher um destes:
  - Redis - simplicidade; e
  - MariaDB - (Feathers.js utiliza sequielize por padrão, que funciona melhor com banco de dados relacionais, facilita o trabalho).

## 2020-01-14 - Terça
Feathers.js:
  - Transporte:
    - [Expressjs](https://expressjs.com/)
      - REST
    - Socket.io
      - Permite fazer os resultados atualizarem em "tempo real", sem polling;
    - É escalável para milhões de usuários simultâneos?
      - Possível clusterizar servidor;
  - DB:
    - [Sequelize](Sequelize.org)
      - Problema de concorrência:
        - [Incrementando valores de forma atômica](https://sequelize.org/master/manual/instances.html#incrementing)
