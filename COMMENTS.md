# Comments

## Ambiente de desenvolvimento:
- Sistema
  - Sistema Operacional: Arch Linux
  - Kernel: Linux 5.4.8-arch1-1
  - Arquitetura: x86-64
- Software
  - [NodeJS](https://nodejs.org/) 13.6.0
  - [MariaDB](https://mariadb.org/) 15.1
  - [Yarn](https://yarnpkg.com/) 1.21.1

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

Penso em fazer uma tela de administração para gerenciar cada paredão (definir participantes etc.). Por isso gerei o app do Feathers.js já com suporte à autenticação local.

Poderia usar google, facebook etc. para o login. Mas não acho que faria sentido nessa aplicação, já que o login serve apenas para adminsitração.

### Feathers.js:
Feathers até tem suporte a outros bancos de dados sem usar o *Sequelize*. Os que ele suporta por padrão são:


- A custom service - Trabalhoso;
- Cassandra - Desnecessário, complicado;
- In Memory - Persistência é importante;
- KnexJS - Interessante, mas nao parece muito diferente do Sequelize;
- NeDB - Não parece confiável;
- MongoDB - Até poderia usar, mas como estou desenvolvendo em *ArchLinux*, teria que compilar ele, o que não é nada prático.
- Mongoose - É para MongoDB, que já está fora de cogitação pelo motivo acima.
- Objection - Interessante, mas nao parece muito diferente do Sequelize;
- **Sequelize - Já tenho alguma familiariedade.**

  - É escalável para milhões de usuários simultâneos?
    - Possível clusterizar servidor.
  - Transporte:
    - [Expressjs](https://expressjs.com/)
      - REST
    - [Socket.io](https://socket.io/)
      - Permite fazer os resultados atualizarem em "tempo real", sem polling.
  - DB:
    - [Sequelize](https://sequelize.org/)
      - Problema de concorrência:
        - [Incrementando valores de forma atômica](https://sequelize.org/master/manual/instances.html#incrementing).

### Next.js

Tentei usar o *styled jsx* que supostamente vem junto no Next.js. Porém me dei conta que ele não suporta renderização em back-end, portanto vou optar por css/scss.

## 2020-01-15 - Quarta

### Estilos

A fonte na imagem de exemplo que forneceram parecia ser a "ProximaNova" que é utilizada bastante pela Globo.com. Porém como a fonte não é gratuíta, resolvi usar a Raleway da Google que é relativamente semelhante.

Adicionei autoprefixer ao sistema de build para facilitar compatibilidade com outros navegadores (IE, Safari etc.).

### Testes

Para testes unitários no front-end, optei pelo [*Mocha*](https://mochajs.org/) com asserções do [*Chai*](https://www.chaijs.com/), pois já tenho alguma familiariedade com eles.

Nunca havia usado essas feramentas com *React*. Foi um pequeno desafio configurar.

## 2020-01-16 - Quinta

### Estilos

Optei pelo uso de *CSS Modules* para que as classes fiquem em escopo local, ou seja, não preciso me preocupar com nomes repetidos em arquivos diferentes.

Para poder reutilizar componentes com diferentes estilos, criei um *ThemeContext* para prover as classes.
