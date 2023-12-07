const fs = require('fs');

function mdLinks(caminhoDoArquivo, options){
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
      if(options.validate === false){
        resolve(links);
      } else {
        const linksValidated = links.map(link => {
          /// fech recebe uma url e da para usar o async/then catch
          return fetch(link.href).then(response => {
            link.status = response.status;
            link.ok =(response.status >= 200 && response.status <=299) ? 'ok' :'fail'; 
            return link;
          })
          
          .catch(err => {
            link.ok = 'fail'
            link.status = 'Link nao encontrado'
            return link
          });
        });
        resolve(Promise.all(linksValidated))
      }
      
    });
    });
  }

  mdLinks('./README.md', {validate: true}).then(result => console.log(result)).catch(err => console.log(err))


  module.exports = (mdLinks)

