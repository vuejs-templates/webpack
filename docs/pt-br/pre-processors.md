# Pré-Processadores

Este boilerplate já vem configurado com extração de CSS dos pré-processadores de CSS mais populares, incluindo LESS, Sass, Stylus e PostCSS. Para utilizar um pré-processador, tudo que você precisa fazer é instalar o seu respectivo _loader_ Webpack. Por exemplo, para usar Sass:

``` bash
npm install sass-loader node-sass --save-dev
```

Observe que você também precisa instalar `node-sass` porque o `sass-loader` depende dele (como _peer dependency_).

### Usando pré-processadores em componentes

Uma vez instalado, para usar um pré-processador em seus componentes `*.vue`, defina o atributo `lang` na tag `<style>`:

``` html
<style lang="scss">
/* write Sass! */
</style>
```

### Nota sobre a sintaxe Sass

- `lang="scss"` corresponde à sintaxe que estende CSS (a com chaves - `{` e `}` - e ponto-e-vírgula).
- `lang="sass"` corresponde à sintaxe que requer indentação.

### PostCSS

Blocos `style` em arquivos `*.vue` e arquivos de _stylesheets_ (`*.css`, `*.scss` etc) são passados pelo PostCSS por padrão, portanto não é necessário usar outro _loader_ para ele.

Você pode simplesmente adicionar os plugins do PostCSS que você deseja usar ao arquivo `.postcssrc.js` que se encontra no diretório raiz do seu projeto:

``` js
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // para editar os browsers-alvo: use o campo "browserslist" do seu package.json
    "postcss-import": {},
    "autoprefixer": {}
  }
}
```

Veja [a documentação relacionada do vue-loader](http://vuejs.github.io/vue-loader/en/features/postcss.html) para mais detalhes.

### Arquivos CSS separados

Para garantir consistência na extração e processamento do seu CSS, é recomendável que os arquivos de _stylesheets_ globais sejam importados no seu componente `App.vue` raiz. Por exemplo:

``` html
<!-- App.vue -->
<style src="./styles/global.less" lang="less"></style>
```

Observe que você provavelmente só deve fazer isto com as _stylesheets_ que você mesmo escreveu para sua aplicação. Bibliotecas já existentes, como Bootstrap ou Semantic UI, podem ser postas dentro de `/static` e referenciadas diretamente em `index.html`. Isto evita tempo adicional gasto durante o _build_ e traz melhorias no _caching_ nos browsers. (Veja [Lidando com Assets Estáticos](static.md))
