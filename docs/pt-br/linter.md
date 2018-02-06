# Configuração do _Linter_

Este _boilerplate_ usa [ESLint](https://eslint.org/) como _linter_, e usa o _preset_ [Standard](https://github.com/feross/standard/blob/master/RULES.md) com algumas pequenas personalizações.

## eslint-plugin-vue

Nós sempre adicionamos também o [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue), que vem com várias regras que ajudam a compor componentes Vue consistentes - e ainda pode fazer _linting_ de templates!

Você pode encontrar uma lista de todas as regras disponíveis no [github](https://github.com/vuejs/eslint-plugin-vue#gear-configs). Nós escolhemos adicionar a configuração `essential`, mas recomendamos que você mude para o conjunto de regras `strongly-recommended`, mais amplo, ou ao `recommended`, quando você já estiver familiarizado com estes.

## Customizing

Se você não ficar satisfeito com as regras de _linting_ padrão, tem várias opções:

1. Sobrescreva regras individuais no arquivo `.eslintrc.js`. Por exemplo, você pode adicionar a seguinte regra para exigir pontos-e-vírgulas ao invés de omiti-los:

  ``` js
  // .eslintrc.js
  "semi": [2, "always"]
  ```

2. Escolha um _preset_ (conjunto de regras) do ESLint diferente ao gerar o projeto, por exemplo [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

3. Escolha "none" (nenhum) como _preset_ do ESLint ao gerar seu projeto e defina suas próprias regras. Veja [a documentação do ESLint](https://eslint.org/docs/rules/) para mais detalhes.

## Corrigindo erros de _linting_

Você pode rodar o comando a seguir para deixar que o ESLint corrija qualquer erro encontrado (quando possível, pois nem todos erros podem ser corrigidos automaticamente):

```
npm run lint -- --fix
```

*(O `--` no meio é necessário para garantir que a opção `--fix` seja passada ao `eslint`, não ao `npm`. Pode ser omitido se você estiver usando yarn.)*
