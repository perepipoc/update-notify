'use strict';
const importLazy = require('import-lazy')(require);
const ciInfo = importLazy('ci-info');
const execa = importLazy('execa');
const semver = importLazy('semver');
const ConfigStore = importLazy('configstore');

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
const latestVersion = async function(pkgName, distTag = 'latest') {
  const { stdout } = await execa.command(
    `npm info ${pkgName} dist-tags.${distTag}`
  );
  return { latest: await stdout };
};

/**
 * This function says hello.
 * @param name Some name to say hello for.
 * @returns The hello.
 */
const semverCheck = function(currentVersion, latestVersion) {
  return semver.lte(currentVersion, latestVersion.latest);
};

/**
 * This function says hello.
 * @param name Some name to say hello for.
 * @returns The hello.
 */
const setConfig = function(packageName) {
  try {
    return new ConfigStore(`o-update-notify-${packageName}`, {
      lastUpdateCheck: Date.now()
    });
  } catch (error) {
    // Expecting error code EACCES or EPERM
    console.error(`
    ${error} , Looks like EACCES or EPERM error ocurred, Try running with %s or get access sudo permissions.
  `);
  }
};

/**
 * This function says hello.
 * @param name Some name to say hello for.
 * @returns The hello.
 */
const getConfig = function(packageName, config = '') {
  return new ConfigStore(`o-update-notify-${packageName}`).get(config);
};

/**
 * This function says hello.
 * @param name Some name to say hello for.
 * @returns The hello.
 */
const shouldCheckUpdates = function(lastUpdateCheck, updateCheckInterval) {
  if (!lastUpdateCheck && !updateCheckInterval) return false;
  return !(Date.now() - lastUpdateCheck < updateCheckInterval);
};

module.exports = {
  isCI,
  pingRegistry,
  latestVersion,
  semverCheck,
  setConfig,
  getConfig,
  shouldCheckUpdates
};
