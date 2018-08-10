exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['vtcad.js'],
  resultJsonOutputFile:'./result.json',
  multiCapabilities: [
    {
      browserName: 'chrome',
      shardTestFiles: true,
      maxInstances: 1,
      count: 1,
      // args: [ "--headless", "--window-size=800,600" ]
    },
  ]
};
