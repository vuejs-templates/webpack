# Integração com Framework de Backend

Se você está construindo uma aplicação somente estática (que é implantada separadamente da API de _backend_), você provavelmente nem precisa editar `config/index.js`. No entanto, se você quer integrar este template com outro framework de _backend_, como Rails/Django/Laravel, que vem com sua própria estrutura de projeto, você pode editar o arquivo `config/index.js` para gerar _assets_ do _front-end_ diretamente no seu projeto de _backend_.

Vamos dar uma olhada no `config/index.js` padrão:

``` js
// config/index.js
'use strict'
const path = require('path')

module.exports = {
  dev: {
    // Localização dos arquivos
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Diversas configurações do servidor de desenvolvimento
    host: 'localhost',
    port: 8080, 

    // pulando outras opções que são apenas [[recursos convenientes %% convenience features]]
  },
  build: {
    // Template do index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Localização dos arquivos
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    productionSourceMap: true,
    
    // pulando o resto ...
  },
}
```

Dentro da seção `build`, temos as seguintes opções:

### `build.index`

> Precisa ser um _path_ (localização de arquivo) absoluto no seu sistema de arquivos local.

Aqui é onde `index.html` (com URLs de _assets_ injetados) será gerado.

Se você está usando este template com um framework de _backend_, você pode editar `index.html` apontando este _path_ a um arquivo de _view_ renderizado pelo seu _backend_, por exemplo, `app/views/layouts/application.html.erb` em uma aplicação Rails, or `resources/views/index.blade.php` em uma aplicação Laravel.

### `build.assetsRoot`

> Precisa ser um _path_ (localização de arquivo) absoluto no seu sistema de arquivos local.

Deve indicar o diretório raiz que contém todos os _assets_ estáticos da sua aplicação. Por exemplo, `public/` para Rails ou Laravel.

### `build.assetsSubDirectory`

Ponha _assets_ gerados pelo webpack neste diretório em Nest webpack-generated assets under this directory in `build.assetsRoot`, para que eles não sejam misturados com outros arquivos que você tenha em `build.assetsRoot`. Por exemplo, se `build.assetsRoot` é `/path/to/dist`, e `build.assetsSubDirectory` é `static`, todos os assets gerados pelo Webpack ficarão em `path/to/dist/static`.

Esse diretório será esvaziado antes de cada _build_, portanto só deve conter _assets_ gerados pelo _build_.

Arquivos em `static/` serão copiados para esse diretório durante o _build_ sem que sejam feitas modificações. Isto significa que, se você mudar esse prefixo, todos seus URLs absolutos que fazem referência a arquivos em `static/` também serão modificados. Veja [Lidando com Assets Estáticos](static.md) para mais detalhes.

### `build.assetsPublicPath`

Este deve ser o _path_ (localização) de URL de onde o conteúdo de seu `build.assetsRoot` será servido via HTTP. Na maior parte dos casos, isto será o diretório raiz (`/`). Modifique isto apenas se seu framework de _backend_ serve _assets_ estáticos com um prefixo no [[_path_]]. Internamente, este valor é passado ao Webpack como `output.publicPath`.

### `build.productionSourceMap`

Configura se deve-se gerar mapas de código nos _builds_ de produção.

### `dev.port`

Especifica o número da porta que o servidor do modo de desenvolvimento usará.

### `dev.proxyTable`

Defina regras de _proxy_ para o servidor de desenvolvimento. Veja [Proxying de APIs Durante o Desenvolvimento](proxy.md) para mais detalhes.
