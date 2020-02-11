const fetch = require('node-fetch');

const pause = length => new Promise(resolve => setTimeout(resolve, length));

const start = async () => {
  const requests = [];
  const numRequests = 10000;
  const interval = 1;
  const voteRequest = (vote) => {
    const reqStart = Date.now()
    requests.push(
      fetch('http://localhost:3030/current-wall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vote,
        }),
      }).then(res => {
        // console.log(res.status);
        const reqEnd = Date.now();
        return reqEnd - reqStart;
      })
    );
  }
  const start = Date.now();
  fetch('http://localhost:3030/current-wall')
    .then(result => result.json())
    .then(async ([wall]) => {
      if (wall) {
        for (let reqIndex = 0; reqIndex < numRequests; reqIndex += 1) {
          voteRequest(wall.participants[reqIndex % 3 ? 0 : 1].id);
          await pause(interval);
        }
        Promise.all(requests)
          .then(times => {
            const end = Date.now();
            const duration = end - start;
            console.log('duration:', duration/1000);
          });
      }
    })
};

start();
