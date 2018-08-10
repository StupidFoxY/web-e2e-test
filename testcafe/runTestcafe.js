const createTestCafe = require('testcafe');
let testcafe  = null;

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();

        return runner
            .src('./vtcad.ts')
            .browsers('firefox')
            .run();
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
    });

// I don't how to user Programming Interface
