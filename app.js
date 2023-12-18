const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');
const readline = require('readline');

async function makeRequest(url) {
  const headers = {
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-User': '?1',
    'Sec-Fetch-Dest': 'document',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9'

    //'Accept-Language': 'es-419;q=0.9,de;q=0.8,es-VE;q=0.7,es-ES;q=0.6'
  };

  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);
    console.log('------------------------------------------------------------')
    console.log('Name:', $('#productTitle').text())
    console.log('------------------------------------------------------------')
    console.log('Price:', $('#corePrice_feature_div > div > div > span.a-price.aok-align-center > span:nth-child(2)').text())
    console.log('------------------------------------------------------------')
    console.log('Desc:', $('#feature-bullets').text())
    console.log('------------------------------------------------------------')
    /*
        fs.writeFile('exit.txt', response.data, (err) => {
            if (err) throw err;
            console.log('Data has been written to the file exit.txt');
        });
    */
  } catch (error) {
    console.error('Error making the request:', error.message);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter link from amazon: ', (answer) => {
  makeRequest(answer);
  rl.close();
});
// Call the function
