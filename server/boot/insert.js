'use strict';

function setupSample(Sample) {

  const addMockData = (mockData) => {

    const addSingleMock = (mock) => {
      return new Promise( (resolve, reject) => {
        Sample.findOrCreate(
          {
            where: {
              uniqueAndRequired : mock.uniqueAndRequired
            }
          },
          mock,
          (err, instance) => {
            if(err) reject(err);
            resolve(instance);
          }
        )
      })
    };

    return Promise.all( mockData.map(addSingleMock) )
  }

  return addMockData([
    { uniqueAndRequired: 'Action', myOtherProp: 0 },
    { uniqueAndRequired: 'Adventure', myOtherProp: 10 },
    { uniqueAndRequired: 'Casual', myOtherProp: 3 },
    { uniqueAndRequired: 'Indie', myOtherProp: 6 },
    { uniqueAndRequired: 'MMO', myOtherProp: 32 },
    { uniqueAndRequired: 'Racing', myOtherProp: 4 },
    { uniqueAndRequired: 'RPG', myOtherProp: 8 },
    { uniqueAndRequired: 'Simulation', myOtherProp: 3 },
    { uniqueAndRequired: 'Sports', myOtherProp: 6 },
    { uniqueAndRequired: 'Strategy', myOtherProp: 3 }
  ])
  .catch( err => console.error(err) );
}

module.exports = function(app, cb) {
  setupSample(app.models.Sample)
    .then( () => process.nextTick(cb) )
}