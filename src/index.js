const {
  isCI,
  pingRegistry,
  semverCheck,
  getConfig,
  shouldCheckUpdates,
  notifyFlow
} = require('./helpers');

const updateNotify = function(options = {}) {
  // Never run on CI
  if (isCI()) return;
  if (!options.pkg.name || !options.pkg.version)
    throw new Error('pkg.name and pkg.version required');
  const { updateCheckInterval = 1000 * 60 * 60 * 24 } = options;

  if (
    shouldCheckUpdates(
      getConfig(options.pkg.name, 'lastUpdateCheck'),
      updateCheckInterval
    )
  ) {
    const latestCachedVersion = getConfig(options.pkg.name, 'latest');

    if (semverCheck(options.pkg.version, { latest: latestCachedVersion })) {
      return {
        updateAvailable: true,
        name: options.pkg.name,
        latest: latestCachedVersion,
        current: options.pkg.version
      };
    } else {
      notifyFlow(options);
    }
  } else {
    notifyFlow(options);
  }
};

module.exports = {
  updateNotify,
  pingRegistry
};
