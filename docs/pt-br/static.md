# Lidando com Assets Estáticos

Você notará que na estrutura do projeto temos dois diretórios para _assets_ estáticos: `src/assets` e `static/`. Qual a diferença entre os dois?

### Assets passados pelo Webpack

Para responder a essa questão, primeiro temos que entender como o Webpack lida com _assets_ estáticos. Em componentes `*.vue`, todos seus templates e CSS são analisados por `vue-html-loader` e `css-loader` a procura de URLs de _assets_. Por exemplo, em `<img src="./logo.png">` e `background: url(./logo.png)`, `"./logo.png"` é um _path_ relativo de asset e será **reconhecido pelo Webpack como uma dependência de módulo**.

Como `logo.png` não é JavaScript, quando tratado como uma dependência de módulo, precisamos usar `url-loader` e `file-loader` para processá-lo. Este template já vem como esses _loaders_ configurados, oferecendo assim alguns recursos como _fingerprinting_ (identificação única de uma versão de um arquivo), e _inlining_ em base64 (inclusão do conteúdo do _asset_ no código compilado), e permite usar _paths_ relativos/de módulo sem se preocupar com _deployment_.

Considerando que esses _assets_ podem ser incluídos via _inlining_, copiados ou renomeados durante o _build_, eles essencialmente fazem parte do seu código-fonte. É por isto que recomendamos pôr assets estáticos dentro de `/src`, junto de outros arquivos do seu código-fonte. Na verdade, você nem precisa pôr todos eles em `/src/assets`: você pode organizá-los com base em qual módulo/componente vai usá-los. Por exemplo, você pode pôr cada componente em seu próprio diretório, com seus _assets_ estáticos a seu lado.

### Regras de reconhecimento de assets

- **URLs relativos**, por exemplo `./assets/logo.png`, serão interpretados como dependências de módulo. Eles serão substituídos por um URL automaticamente gerado baseado nas suas configurações de _output_ (escrita) do Webpack.

- **URLs sem prefixo**, por exemplo `assets/logo.png`, serão tratados da mesma forma que URLs relativos, tornando-se `./assets/logo.png`.

- **URLs com prefixo `~`** são tratados como uma requisição de módulo, similar a `require('some-module/image.png')`. Você deve usar esse prefixo se quiser fazer uso das configurações de resolução de módulos do Webpack. Por exemplo, se você definir um _alias_ (caminho alternativo/atalho) de resolução para `assets`, deverá usar `<img src="~assets/logo.png">` para garantir que esse _alias_ seja utilizado.

- **URLs relativos à raiz**, por exemplo `/assets/logo.png`, não são processados.

### Obter localizações de _assets_ no JavaScript

Para que o Webpack retorne localizações corretas dos _assets_, você deve usar `require('./relative/path/to/file.jpg')`, que é processado por `file-loader` e retorna o URL reconhecido. Por exemplo:

``` js
computed: {
  background () {
    return require('./bgs/' + this.id + '.jpg')
  }
}
```

**Observe que o exemplo acima incluirá todas as imagens que estejam em `./bgs/` no _build_ final.** Isto ocorre porque o Webpack não tem como identificar qual delas será usada quando o código estiver rodando, portanto precisa incluir todas.

### Assets estáticos "de verdade"

Em contraste, arquivos em `static/` não são nunca processados pelo Webpack: eles são copiados diretamente para seu destino final sem modificações, e com o mesmo nome de arquivo. Referências a esses arquivos precisam ser feitas com _paths_ absolutos, que são determinados através da junção de `build.assetsPublicPath` e `build.assetsSubDirectory` do arquivo `config.js`.

Para exemplificar, usando os seguintes valores padrão:

``` js
// config/index.js
module.exports = {
  // ...
  build: {
    assetsPublicPath: '/',
    assetsSubDirectory: 'static'
  }
}
```

Qualquer arquivo posto em `static/` deverá ser referenciado usando o URL absoluto `/static/[filename]`. Se você mudar `assetSubDirectory` para `assets`, esses URLS precisam ser mudados para `/assets/[filename]`.

Nós vamos aprender mais sobre o arquivo de configuração na seção sobre [integração com _backend_](backend.md).
