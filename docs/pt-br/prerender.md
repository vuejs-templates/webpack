# Pré-renderização para SEO

Se você deseja pré-renderizar rotas que não mudarão significativamente depois de enviadas para produção, use esse plugin do Webpack: [prerender-spa-plugin](https://www.npmjs.com/package/prerender-spa-plugin), que foi testado para uso com Vue. Para páginas que de fato mudam frequentemente, [Prerender.io](https://prerender.io/) e [Netlify](https://www.netlify.com/pricing) oferecem planos que frequentemente pré-renderizam seu conteúdo, para uso de ferramentas de busca.

## Usando o `prerender-spa-plugin`

1. Instale como _dev dependency_:

```bash
npm install --save-dev prerender-spa-plugin
```

2. Importe em **build/webpack.prod.conf.js**:

```js
// Esta linha deve ser posta no topo do arquivo onde os outros 'imports' estão
const PrerenderSpaPlugin = require('prerender-spa-plugin')
```

3. Configure-o na _array_ `plugins` (igualmente em **build/webpack.prod.conf.js**):

```js
new PrerenderSpaPlugin(
  // Localização da aplicação depois de compilada
  path.join(__dirname, '../dist'),
  // Lista de endpoints (caminhos) que você deseja pré-renderizar
  [ '/' ]
)
```

Se você quisesse pré-renderizar também `/about` e `/contact`, então essa array seria `[ '/', '/about', '/contact' ]`.

4. Ative o modo `history` do `vue-router`:
```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```
