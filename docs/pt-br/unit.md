# Testes Unitários

Este projeto oferece duas opções para testes unitários:

1. Jest
2. Karma e Mocha.

## Jest

- [Jest](https://facebook.github.io/jest/): o _runner_ de testes que abre o JSDOM roda os testes e nos informa os resultados.

### Files

- `setup.js`

  Jest roda este arquivo antes de rodar os testes unitários. Ele desativa a dica sobre o modo de produção do Vue.

### _Mocking_ de dependências

O boilerplate do Jest vem com a capacidade de fazer _mock_ de dependências. Veja o [guia de funções de mock](https://facebook.github.io/jest/docs/mock-functions.html) para mais detalhes.

## Karma e Mocha

- [Karma](https://karma-runner.github.io/): o _runner_ de testes que abre browsers, roda os testes, e nos reporta os resultados.
- [karma-webpack](https://github.com/webpack/karma-webpack): o plugin do Karma que faz _bundles_ (empacota) nossos testes usando Webpack.
- [Mocha](https://mochajs.org/): o framework de testes com o qual escrevemos _specs_.
- [Chai](http://chaijs.com/): biblioteca para _assertions_ de testes que oferece uma sintaxe melhorada para _assertions_.
- [Sinon](http://sinonjs.org/): biblioteca de utilitários de testes que oferece _spies_, _stubs_ e _mocks_.

Chai e Sinon são integradas com [karma-sinon-chai](https://github.com/kmees/karma-sinon-chai), portanto todas as interfaces da Chai (`should`, `expect`, `assert`) e `sinon` estão disponíveis globalmente nos arquivos de testes.

### Arquivos

- `index.js`

  Este é o arquivo de entrada usado pelo `karma-webpack` para empacotar todo o código dos testes e o código-fonte (para fins de _coverage_). Em geral, você pode ignorá-lo.

- `specs/`

  Este diretório é onde você escreve seus testes de fato. Você pode usar todo ES2015+ e todos os loaders aos quais o Webpack tem suporte em seus testes.

- `karma.conf.js`

  Este é o arquivo de configuração do Karma. Veja a [documentação do Karma](https://karma-runner.github.io/) para mais detalhes.

### Rodando testes em mais browsers

Você pode rodar os testes em múltiplos browsers de verdade, instalando mais [karma launchers](https://karma-runner.github.io/1.0/config/browsers.html) e ajustando o campo `browsers` em `test/unit/karma.conf.js`.

### _Mocking_ de dependências

O boilerplate de testes unitários com Karma vem com [inject-loader](https://github.com/plasticine/inject-loader) instalado. Para usá-lo com componentes `*.vue`, veja [a documentação do vue-loader sobre testes com mocks](http://vue-loader.vuejs.org/en/workflow/testing-with-mocks.html).
