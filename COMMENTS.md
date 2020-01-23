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

### Componentes

Pensei em utilizar MaterialUI, mas com isso eu acabaria não utilizando muito meus conhecimentos de HTML/CSS, ou habilidade com o React, pois a implementação não é trivial.

Criei um componente *Selectable* que serve para fazer seu conteúdo ser selecinável (como um *checkbox* ou *radio*).
Tive o cuidado para que seja acessivel usando também o teclado (obter foco com *tabs* e selecionar com espaço ou *Enter*).

## 2020-01-17 - Sexta

Para aceitar apenas votos de pessoas, e não de máquinas, usarei o ReCAPTCHA.
Usei o modo invisível dele para não quebrar o layout.

## 2020-01-18 - Sábado

## 2020-01-19 - Domingo

### Escopo de css por componente

Estava utilizando um *CSS* para os estilos de todos os componentes, em uma definição de tema. Essa solução permite aninhar temas, por ter um escopo de classes por tema. Mas isso não protege contra colisões de nome de classes entre componentes.

Separei o CSS em um arquivo por componente, e exportei os modulos CSS em chaves/*namespaces* diferentes, evitando colisões de nomes de classes.

## 2020-01-20 - Segunda


## 2020-01-21 - Terça

### Estrutura do Banco de Dados

Definida a estrutura do banco de dados.
![DatabaseStructure](database_structure.png)


### Performance do Banco de Dados

Imagino que um insert por voto não alcance a performance desejada. Principalmente por conta da atualização dos índices. Alternativas possíveis seriam: inserir os votos em um arquivo intermediário (csv, um json por linha etc.), mas o risco de corromper dados seria grande;ou inserir em uma tabela intermediária sem índices e inserir os dados na tabela "oficial" em intervalos, mas não acho que seria suficiente.

Minha primeira opção para contornar o problema seria usar uma fila de votos em memória, que seria consumida em intervalos constantes, inserindo vários votos com um único *insert*. Para isso, o *NeDB* como banco de dados *in-memory* pode ser interessante. 


## 2020-01-22 - Quarta

### Transporte Cliente/Servidor

Para usuários comuns, na página de votação. A comunicação com o servidor será por HTTP(S) (REST). Utilizar transporte baseado em conexão (websockets) seria muito custoso.

Para usuários do *Dashboard Adminsitrativo*. Será usado *web-sockets*. Assim grande quantidade de mensagens (votos) podem ser recebidas em tempo real em uma conexão persistente. Imagino que não cause muito *overhead*, mas migrarei para HTTP se necessário.
