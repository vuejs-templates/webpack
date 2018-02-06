# Configuração do Babel

Este _boilerplate_ usa [`babel-preset-env`](https://www.npmjs.com/package/babel-preset-env) para configurar babel. Você pode ler mais sobre em - http://2ality.com/2017/02/babel-preset-env.html.

> Um _preset_ de Babel que converte ES2015+ em ES5, determinando automaticamente os plugins e polyfills necessários baseado nos browsers ou ambientes de _runtime_ a serem suportados.

Esse plugin usa [`browserslist`](https://github.com/ai/browserslist) para interpretar a configuração informada, permitindo o uso de qualquer [formato de configuração aceito pelo `browserslist`](https://github.com/ai/browserslist#queries).

Há um porém. O `browserslist` recomenda definir os browsers-alvo em um arquivo comum como `package.json` ou em um arquivo `.browserslistrc`. Isto permite que ferramentas como [`autoprefixer`](https://github.com/postcss/autoprefixer) e [`eslint-plugin-compat`](https://github.com/amilajack/eslint-plugin-compat) também usem essa configuração. Neste template, `browserslist` é configurado no arquivo `package.json`:

```json
{
  "...": "...",
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

No entanto, a última versão _stable_ do `babel-preset-env` (`v1.6.1`) não carrega configuração definida no `package.json`. Por isso, a lista de browsers/ambientes-alvo precisa ser repetida no `.babelrc`. Se você deseja mudar os ambientes a serem suportados pela sua aplicação, lembre-se de alterar tanto `package.json` quanto `.babelrc`. Observe que isso já foi resolvido na versão beta([`@babel/preset-env@7.0.0-beta.34`](https://github.com/babel/babel/tree/master/packages/babel-preset-env)) e este template será atualizado quando esta sair do estágio beta.
