# Comandos de _build_

Todos os comandos de _build_ são executados via [Scripts NPM](https://docs.npmjs.com/misc/scripts).

### `npm run dev`

> Inicia um servidor Node.js para desenvolvimento local. [Proxying de APIs Durante o Desenvolvimento](proxy.md) para mais detalhes.

- Webpack com `vue-loader` para componentes _single-file_ do Vue.
- _Hot-reload_ com preservação de estado
- _Overlays_ (exibidos na aplicação) de erros de compilação, com preservação de estado
- _Linting_ via ESLint quando arquivos são salvos
- _Source maps_

### `npm run build`

> Gerar _assets_ para produção. Veja [Integração com Framework de Backend](backend.md) para mais detalhes.

- JavaScript minificado por [UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony).
- HTML minificado por [html-minifier](https://github.com/kangax/html-minifier).
- CSS de todos os componentes extraído para um único arquivo e minificado por [cssnano](https://github.com/ben-eb/cssnano).
- Todos _assets_ estáticos são compilados com _hashes_ de versão para cache de longa duração, e um `index.html` para produção é automaticamente gerado com os URLs corretos desses _assets_ gerados.

### `npm run unit`

> Rodar testes unitários em JSDOM com [Jest](https://facebook.github.io/jest/docs/getting-started.html). Veja [Testes Unitários](unit.md) para mais detalhes.

- Suporte a ES2015+ in arquivos de testes.
- [_Mocking_](https://facebook.github.io/jest/docs/mock-functions.html) facilitado.

### `npm run e2e`

> Rodar testes _end-to-end_ com [Nightwatch](http://nightwatchjs.org/). Veja [Testes End-to-end](e2e.md) para mais detalhes.

- Rode testes em paralelo em vários browsers.
- Com apenas um comando:
  - Gerencia automaticamente dependências do Selenium e do chromedriver.
  - Inicia automaticamente o servidor Selenium.

### `npm run lint`

> Roda o eslint e avisa sobre erros no seu código. Veja [Configuração de _Linting_](linter.md)
