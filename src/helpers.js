'use strict';
const importLazy = require('import-lazy')(require);
const ciInfo = importLazy('ci-info');
const execa = importLazy('execa');

/**
 * This function says hello.
 * @param name Some name to say hello for.
 * @returns The hello.
 */
const isCI = function() {
  return ciInfo.isCI;
};

/**
 * This function says hello.
 * @param name Some name to say hello for.
 * @returns The hello.
 */
const pingRegistry = async function() {
  const timer = setTimeout(process.exit, 1000 * 5);
  const { failed } = await execa.command('npm ping');

  const exit = () => {
    clearTimeout(timer);
    return !failed;
  };

  return { isOnline: (await failed) ? failed : exit() };
};

/**
 * This function says hello.
 * @param name Some name to say hello for.
 * @returns The hello.
 */
const latestVersion = async function(pkgName) {
  const { stdout } = await execa.command(
    `npm info ${pkgName} dist-tags.latest`
  );
  return { latest: await stdout };
};

/**
 * This function says hello.
 * @param name Some name to say hello for.
 * @returns The hello.
 */
const getConfig = function() {};

/**
 * This function says hello.
 * @param name Some name to say hello for.
 * @returns The hello.
 */
const saveConfig = function() {};

module.exports = { isCI, pingRegistry, latestVersion, getConfig, saveConfig };
