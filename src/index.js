const { isCI, pingRegistry, latestVersion } = require('./helpers');

const fn = () => {
  console.log('regs');
  pingRegistry()
    .then(a => {
      console.log(a);
    })
    .catch(e => {
      console.log('erro');
    });

  latestVersion('axios')
    .then(a => {
      console.log(a);
    })
    .catch(e => {
      console.log('erro');
    });
};

fn();
