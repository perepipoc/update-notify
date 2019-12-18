const {
  semverCheck,
  pingRegistry,
  latestVersion,
  setConfig,
  getConfig,
  shouldCheckUpdates,
  notifyFlow
} = require('../src/helpers');

describe('Helpers Test - Semver', () => {
  test('Semver check ', async () => {
    const result = semverCheck('0.0.1', '0.0.2');
    expect(result).toBe(true);
  });

  test('Semver check ', async () => {
    const result = semverCheck('0.1.1', '0.0.2');
    expect(result).toBe(false);
  });
});

describe('Helpers Test - pingRegistry', () => {
  test('pingRegistry', async () => {
    const result = pingRegistry();
    await expect(result).resolves.toHaveProperty('isOnline', true);
  });
});

describe('Helpers Test - latestVersion', () => {
  test('latestVersion', async () => {
    const result = latestVersion('react', 'latest');
    await expect(result).resolves.toContain('16');
  });
});

describe('Helpers Test - Configs', () => {
  test('setConfig', async () => {
    const result = setConfig('react');
    expect(typeof result.path).toBe('string');
  });

  test('getConfig', async () => {
    const result = getConfig('react', 'lastUpdateCheck');
    expect(typeof result).toBe('number');
  });
});

describe('Helpers Test - Should Check for updates', () => {
  test('shouldCheckUpdates - no', async () => {
    const result = shouldCheckUpdates(Date.now(), 1000 * 60 * 60 * 5);
    expect(result).toBe(false);
  });

  test('shouldCheckUpdates - yes ', async () => {
    const result = shouldCheckUpdates(1574012350978, 0);
    expect(result).toBe(true);
  });

  test('no data should fail - no ', async () => {
    const result = shouldCheckUpdates();
    expect(result).toBe(false);
  });
});

describe('Helpers Test - NotifyFlow', () => {
  test('notifyFlow - should update', async () => {
    // Never Returns
    const result = await notifyFlow({
      pkg: { name: 'react', version: '0.10.1' }
    });
    await expect(result).toBeUndefined();
  });
});
