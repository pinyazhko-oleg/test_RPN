const https = require('https');

https.get('https://www.eliftech.com/school-task', (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    console.log(JSON.parse(data).expressions);
    console.log(JSON.parse(data).id);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
