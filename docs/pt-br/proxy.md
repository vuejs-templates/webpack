# Proxying de APIs Durante o Desenvolvimento

Ao integrar este boilerplate com um _backend_ já existente, é comum a necessidade de acessar a API do backend enquanto se usa o servidor de desenvolvimento. Para fazer isto, nós podemos rodar o servidor de desenvolvimento e a API lado a lado (ou de forma remota), e deixar que o servidor de desenvolvimento faça _proxy_ de todas as requisições da API ao verdadeiro backend.

Para configurar as regras de proxy, edite a opção `dev.proxyTable` em `config/index.js`. O servidor de desenvolvimento usa [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) para _proxying_, portanto você deve consultar a documentação dele para detalhes sobre seu uso. Eis um exemplo simples:

``` js
// config/index.js
module.exports = {
  // ...
  dev: {
    proxyTable: {
      // fazer proxy de todas requisições que comecem com /api a jsonplaceholder
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

O exemplo acima fará proxy da requisição `/api/posts/1` a `http://jsonplaceholder.typicode.com/posts/1`.

## _Matching_ (identificação) de URLs

Além de URLs estáticos, você também pode usar _glob patterns_ para identificar URLs, por exemplo `/api/**`. Veja [_Context Matching_](https://github.com/chimurai/http-proxy-middleware#context-matching) para mais detalhes. Além disto, você pode informar uma opção `filter`, que pode ser uma função personalizada para determinar se uma requisição deve passar por _proxy_:

``` js
proxyTable: {
  '**': {
    target: 'http://jsonplaceholder.typicode.com',
    filter: function (pathname, req) {
      return pathname.match('^/api') && req.method === 'GET'
    }
  }
}
```
