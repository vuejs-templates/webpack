# Estrutura de Projetos

``` bash
.
├── build/                      # arquivos de configuração do webpack
│   └── ...
├── config/
│   ├── index.js                # configuração principal do projeto
│   └── ...
├── src/
│   ├── main.js                 # arquivo de entrada da aplicação
│   ├── App.vue                 # componente principal da aplicação
│   ├── components/             # componentes de ui
│   │   └── ...
│   └── assets/                 # assets de módulo (processados por webpack)
│       └── ...
├── static/                     # assets estáticos puros (copiados diretamente)
├── test/
│   └── unit/                   # testes unitários
│   │   ├── specs/              # arquivos de spec de testes
│   │   ├── eslintrc            # arquivo de configuração do eslint com opções extras apenas para testes unitários
│   │   ├── index.js            # arquivo de entrada dos testes
│   │   ├── jest.conf.js        # arquivo de configuração do jest, quando usado
│   │   └── karma.conf.js       # arquivo de configuração do karma, quando usado para testes unitários
│   │   ├── setup.js            # arquivo a ser rodado antes do Jest rodar seus testes
│   └── e2e/                    # testes e2e
│   │   ├── specs/              # arquivos de spec dos testes
│   │   ├── custom-assertions/  # assertions personalizadas para testes e2e
│   │   ├── runner.js           # script runner de testes
│   │   └── nightwatch.conf.js  # arquivo de configuração do runner de testes
├── .babelrc                    # configuração do babel
├── .editorconfig               # indentação, espaços/tabs e configurações similares para seu editor
├── .eslintrc.js                # configuração do eslint
├── .eslintignore               # regras para eslint ignorar arquivos
├── .gitignore                  # configurações básicas sensatas para gitignore
├── .postcssrc.js               # configuração do postcss
├── index.html                  # template index.html
├── package.json                # scripts de build e dependências
└── README.md                   # arquivo README padrão
```

### `build/`

Este diretório contém as configurações propriamente ditas para o servidor de modo de desenvolvimento e do build que o Webpack produz para produção. Normalmente você não precisa mexer nesses arquivos, exceto se quiser personalizar _loaders_ do Webpack. Neste caso, você deve dar uma olhada em `build/webpack.base.conf.js`.

### `config/index.js`

Este é o arquivo principal de configuração, que expõe algumas das opções de configuração do _build_ mais comuns. Veja [Proxying de APIs Durante o Desenvolvimento](proxy.md) e [Integração com Framework de Backend](backend.md) para mais detalhes.

### `src/`

Isto é onde a maior parte do código da sua aplicação se localizará. Como estruturar tudo dentro deste diretório fica basicamente a seu critério; se você está usando Vuex, pode consultar as [recomendações para aplicações Vuex](http://vuex.vuejs.org/en/structure.html).

### `static/`

Este diretório é uma área protegida para arquivos que você não deseja processar via Webpack. Eles serão copiados diretamente ao mesmo diretório aonde são gerados os assets compilados pelo Webpack.

Veja [Lidando com Assets Estáticos](static.md) para mais detalhes.

### `test/unit`

Contém arquivos relacionados a testes unitários. Veja [Testes Unitários](unit.md) para mais detalhes.

### `test/e2e`

Contém arquivos relacionados a testes _e2e_. Veja [Testes End-to-end](e2e.md) para mais detalhes.

### `index.html`

Este é o **template** `index.html` para nossa aplicação _single page_. Durante o desenvolvimento e _builds_, o Webpack gerará _assets_, e os URLs para esses _assets_ gerados serão automaticamente injetados neste template para renderizar o HTML final.

### `package.json`

O meta arquivo de pacotes NPM que contém todas as dependências de _build_ e [comandos de build](commands.md).
