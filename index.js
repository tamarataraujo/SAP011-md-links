const fs = require('fs');

function mdLinks(caminhoDoArquivo){
  return new Promise(function(resolve,reject){
    fs.readFile(caminhoDoArquivo, 'utf8', (err,data) => {
      if (err) reject(err);
      const pattern = /\[([^\]]+)\]\((https?[^)]+)\)/g;
      const matches = [...data.matchAll(pattern)];
      const links = matches.map(match => {
        return {
          href: match[2],
          text: match[1],
          file: caminhoDoArquivo
        }
      })
      resolve(links);
    });
    });
  }

  mdLinks('./README.md').then(result => console.log(result))


  module.exports = (mdLinks)

