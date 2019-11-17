const {
  isCI,
  pingRegistry,
  latestVersion,
  semverCheck,
  getConfig,
  setConfig,
  shouldCheckUpdates
} = require('./helpers');

const updateNotifyFlow = async function(options) {
  const { name, version } = options.pkg || {};
  const { distTag } = options.distTag || 'latest';

  try {
    const { isOnline } = await pingRegistry();
    if (await isOnline) {
      const lVersion = await latestVersion(name, distTag);
      const updateResult = semverCheck(version, await lVersion);
      return {
        updateAvailable: updateResult,
        latest: lVersion.latest,
        currentt: version
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateNotify = async function(options = {}) {
  // Never run on CI
  if (isCI()) return;
  if (!options.pkg.name || !options.pkg.version)
    throw new Error('pkg.name and pkg.version required');
  const { updateCheckInterval = 1000 * 60 * 60 * 24 } = options;

  return shouldCheckUpdates(
    getConfig(options.pkg.name, 'lastUpdateCheck'),
    updateCheckInterval
  )
    ? updateNotifyFlow(options)
    : setConfig(options.pkg.name);
};

module.exports = {
  updateNotify,
  pingRegistry
};
