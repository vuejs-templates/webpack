# Testes End-to-end

Este _boilerplate_ usa [Nightwatch.js](http://nightwatchjs.org) para testes _e2e_. Nightwatch.js é um _runner_ de testes e2e altamente integrado que usa como base o Selenium. Este boilerplate vem com executáveis de servidor Selenium e chromedriver pré-configurados, assim você não precisa instalá-los e ajustá-los por sua conta.

Vejamos os arquivos no diretório `test/e2e`:

- `runner.js`

  Um script Node.js que inicia o servidor de desenvolvimento, e então abre o Nightwatch para rodar testes através dele. Este é o script que será rodado quando você rodar o comando `npm run e2e`.

- `nightwatch.conf.js`

  Arquivo de configuração do Nightwatch. Veja a [documentação sobre configuração do Nightwatch](http://nightwatchjs.org/gettingstarted#settings-file) para mais detalhes.

- `custom-assertions/`

  _Assertions_ personalizadas que podem ser usadas em testes do Nightwatch. Veja a [documentação de como escrever _assertions_ personalizadas do Nightwatch](http://nightwatchjs.org/guide#writing-custom-assertions) para mais detalhes.

- `specs/`

  Seus testes de fato! Veja a [documentação sobre composição de testes do Nightwatch](http://nightwatchjs.org/guide#writing-tests) e a [referência da API](http://nightwatchjs.org/api) para mais detalhes.

### Rodando testes em mais browsers

Para configurar em quais browsers seus testes serão rodados, adicione uma entrada sob "test_settings" em [`test/e2e/nightwatch.conf.js`](https://github.com/vuejs-templates/webpack/blob/master/template/test/e2e/nightwatch.conf.js#L17-L39) , e também o parâmetro `--env` em [`test/e2e/runner.js`](https://github.com/vuejs-templates/webpack/blob/master/template/test/e2e/runner.js#L15). Se você deseja configurar testes remotos em serviços como SauceLabs, você pode tanto tornar a configuração do Nightwatch condicional, baseada em variáveis de ambiente, ou usar um arquivo de configuração separado. Consulte a [documentação do Nightwatch sobre Selenium](http://nightwatchjs.org/guide#selenium-settings) para mais detalhes.
