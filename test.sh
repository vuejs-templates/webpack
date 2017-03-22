set -e

yes "" | ./node_modules/.bin/vue init . genarated-test

cd genarated-test
npm install
npm run lint
npm test
npm run build
