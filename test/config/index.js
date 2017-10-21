// see http://vuejs-templates.github.io/webpack for documentation.
import prodEnviroment from './prod.env';
import devEnviroment from './dev.env';

export default {
  build: prodEnviroment,
  dev: devEnviroment
};
