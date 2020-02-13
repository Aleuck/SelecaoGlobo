# Comments

## Ambiente de desenvolvimento:
- Sistema
  - Sistema Operacional: [Arch Linux](https://www.archlinux.org/)
  - Kernel: Linux 5.4.8-arch1-1
  - Arquitetura: x86-64
- Software
  - [NodeJS](https://nodejs.org/) 13.6.0
  - [MariaDB](https://mariadb.org/) 15.1
  - [Yarn](https://yarnpkg.com/) 1.21.1
- Frameworks
  - [Next.js](https://nextjs.org/) - Front-end
    - [D3.js](https://d3js.org/) - gráficos
    - [Material-UI](https://material-ui.com/) - dashboard de administração
  - [Feathers](https://feathersjs.com/)
    - [Sequelize](https://sequelize.org/)

## Rodando manualmente, localmente

1. Instalar dependencias
  - [NodeJS](https://nodejs.org/) 13
  - [MariaDB](https://mariadb.org/) 15
  - [Yarn](https://yarnpkg.com/) 1.21
2. Criar banco de dados e usuário no MariaDB
  - Banco: paredao_bbb
  - Usuário: paredao_bbb
  - Senha: p4r3d40_bbb_aleuck!
3. Fazer build:
  - Nos diretórios `be/` e `fe/`, rodar o comando: `yarn`
  - No diretório `fe/`, rodar o comando `yarn build`
4. Iniciar a aplicação:
  - Nos diretórios `be/` e `fe/`, rodar o comando: `yarn start`
  - Acessar http://localhost:3000/

## Deploy local com Docker

No Ubuntu:  (não uso ubuntu, portanto não pude testálo completamente)

Na raíz do repositório, para **instalar o Docker** e criar as imagens:
```sh
./configure
```

Para **iniciar** os *containers*:
```sh
make run
```

Para **acessar** a *aplicação*:
  - Acessar http://localhost:3000/

Para **parar** os *containers*:
```sh
make stop
```

Para **remover** os *containers*:
```sh
make rm
```

Observações:
1. Não consegui fazer o container do MariaDB aceitar conexões.
2. Não estou montando a pasta de dados do MariaDB, não há persistência de dados entre imagems de Docker diferentes.


## Front-end

Utilizei o Next.js para aprender mais sobre a ferramenta, e também porque pela facilidade de realizar renderização por backend.

Optei por renderização estática ao invés de utilizar getInitialProps, pois isto atrazaria o *first paint*, diminuindo a percepção de performance. Prefiro diminuir o tempo de tela branca.


### Componentes

Todos os componentes ficam no diretório `fe/components`

Procurei utilizar as propriedades *aria-label*, *role* etc. assim como estilização diferenciada para *:focus* em componentes intergíveis para atingir um nível mínimo de acessibilidade.

Não estou satisfeita com a componentização dos elementos do Dashboard (telas de gerência). Se tivesse mais tempo organizaria melhor.


#### Button

Procurei fazer um botão com a aparência mais próxima possível do botão mostrado na imagem de referência, utilizando apenas recursos de estilos (CSS).


#### Dashboard

Painel de gerência. Onde os organizadores do BBB podem cadastrar as temporadas, os participantes, os paredões e conferir os resultados. Acessível na rota `/admin`.


#### DonutChart

Gráfico usado para mostrar os resultados após o voto. Feito com D3.js.


#### Feathers

Dois componentes, **FeathersClient** e **FeathersAuth**. Utilizam a técnica *render props* para passar adiante o objeto do cliente Feathers e para gerenciar o estado da sessão (login).

Obs.: Acredito que teria sido melhor se eu tivesse feito um Context para isso, ou utilizado *Redux*.


#### Icons

Componentes de icones utilizados. Não foi a melhor implementação para um sistema de icones, mas serviu este propósito.


#### Layouts

Componentes que definem a estrutura e aparência básica do site.


#### Login

Apenas um formulário de login. Utilizado para a autênticação da página de gerência `/admin`.


#### Modal

Conjuntos de componentes feitos para seguir o design passado como exemplo.


#### ParticipantPicture

A partid dos dados de um participante, baixa a sua respectiva imagem e renderiza um elemento imagem, colocando o nome do participante na propriedade *alt* da imagem.


#### Selectable

Faz um conteúdo se tornar selecinável (como um *checkbox* ou *radio*).
Tive o cuidado para que seja acessivel usando também o teclado.


#### SelectableParticipant

União dos componentes **ParticipantPicture** e **Selectable**.


#### ParticipantsSelect

Renderiza um conjunto de **SelectableParticipant**s com comportamento de *radio button*. Pode ser selecionado utilizando o teclado (tab para selecionar, setas para alterar valor etc.).


### Estilos

A fonte na imagem de exemplo que forneceram parecia ser a "ProximaNova" que é utilizada bastante pela Globo.com. Porém como a fonte não é gratuíta, resolvi usar a Raleway da Google que é relativamente semelhante.

Adicionei autoprefixer ao sistema de build para facilitar compatibilidade com outros navegadores (IE, Safari etc.).

Optei pelo uso de *CSS Modules* para que as classes fiquem em escopo local, ou seja, não preciso me preocupar com nomes repetidos em arquivos diferentes.

Para poder reutilizar componentes com diferentes estilos, criei um *ThemeContext* para prover as classes.


## Back End

### Banco de dados
Optei por utilizar o MariaDB, estruturei os dados de maneira bem relacional.

#### Estrutura do banco de dados
![DatabaseStructure](database_structure.png)

### Performance

Um insert por voto não alcancaria uma boa performance. Principalmente por conta da atualização dos índices. Optei por guardar os votos em memória e salvar eles no banco de dados em intervalos (a cada 10 segundos, por exemplo), assim utilizo um único insert para uma quantidade maior de votos e diminuindo o número de atualização dos índices.

Com isso consegui, na minha máquina, em torno de 1000 votos por segundo (sem a validação captcha). Não fui capaz de testar a performance incluindo a validação, e não sei como faria um teste preciso, pois depende muito do estado da rede (e o servidor do ReCaptcha passou a ignorar requests da minha máquina por conta do excesso de requests em algumas tentativas de testes).

Ainda assim, imagino que a validação recaptcha iria diminuir a performance do servidor na metade. Seria interessante tentar uma estratégia de validar o captcha com outro servidor antes de enviar o voto para o servidor *Feathers*. Este servidor de validação de captcha poderia ser um proxy entre o cliente e o servidor feathers, que só repasse o voto se o captcha for validado; ou poderia

Para aguentar a carga de 1000 votos por segundo (ou mais), mesmo com validação do *ReCaptcha*, seria importante ter mais de uma instância do servidor de back-end e um balanceador de carga.

### Transporte Cliente/Servidor

Para usuários comuns, na página de votação. A comunicação com o servidor será por HTTP(S) (REST). Utilizar transporte baseado em conexão (websockets) seria muito custoso (imagino um número muito grande de conexões).

Para usuários do *Dashboard Adminsitrativo*. Será usado *web-sockets*. Assim, fica mais simples atualizar os dados em tempo real.

No fim imagino que tenha sido uma má ideia utilizar *web-sockets* para a tela de administração. Pois assim não posso utilizar o [`Cluster`](https://nodejs.org/api/cluster.html) do NodeJS, pois seria impossível garantir que o mesmo processo que realizou o *handshake* inicial receberia a conexão websocket.


## Testes:

Para testes unitários no front-end, optei pelo [*Mocha*](https://mochajs.org/) com asserções do [*Chai*](https://www.chaijs.com/), pois já tenho alguma familiariedade com eles.

Nunca havia usado essas feramentas com *React*. Foi um pequeno desafio configurar.

Não tive tempo para dar muita atenção aos testes. Se tivesse mais tempo, escreveria testes para cada componente.
