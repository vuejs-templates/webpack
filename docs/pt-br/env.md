# Variáveis de Ambiente

Às vezes é necessário ter dois valores de configuração distintos de acordo com o ambiente em que sua aplicação estiver rodando.

Por exemplo:

```js
// config/prod.env.js
module.exports = {
  NODE_ENV: '"production"',
  DEBUG_MODE: false,
  API_KEY: '"..."' // isto é compartilhado por todos os ambientes
}

// config/dev.env.js
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG_MODE: true // isto se sobrepõe ao valor DEBUG_MODE de prod.env
})

// config/test.env.js
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
```

> **Observação:** variáveis _string_ precisam ser envoltas em aspas simples e aspas duplas: `'"..."'`

Assim, as variáveis de ambiente são:
- Produção
    - NODE_ENV   = 'production',
    - DEBUG_MODE = false,
    - API_KEY    = '...'
- Desenvolvimento
    - NODE_ENV   = 'development',
    - DEBUG_MODE = true,
    - API_KEY    = '...'
- Testes
    - NODE_ENV   = 'testing',
    - DEBUG_MODE = true,
    - API_KEY    = '...'

Como podemos ver, `test.env` herda o `dev.env` e o `dev.env` herda o `prod.env`.

### Usage		

É simples o uso de variáveis de ambiente no seu código. Por exemplo:

```js		
Vue.config.productionTip = process.env.NODE_ENV === 'production'		
```
