const exec = require('child_process').exec;
const path = require('path');

module.exports = function crimeSync (args = [], cwd = '..') {
  return new Promise((resolve, reject) => {
    try {
      exec(`node ${path.resolve('crime-sync.js')} ${args.join(' ')}`, { cwd }, (error, stdout, stderr) => {
        resolve({ error, stdout, stderr })
      })
    }
    catch(e) {
      reject(e);
    }
  })
}
  