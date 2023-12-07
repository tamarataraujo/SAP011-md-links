const mdLinks = require('../index.js');


describe('mdLinks', () => {

  // it('deveria retornar erro caso arquivo não exista', () => {
  //   const arquivoNaoExiste = "./README2.md";
  //   return mdLinks(arquivoNaoExiste, { validate: true })
  //     .catch((err) => {
  //       expect(err).toBeDefined();
  //       expect(err.code).toBe('ENOENT');
        
  //   });
  
  // });

  it('deveria retornar links extraídos sem validação quando validate for true ', () => {
    global.fetch = jest.fn(()=> Promise.resolve({
status: 200
    }));
    
    
    return mdLinks('./README.md', { validate: true }).then((links) => {
      expect(links).toStrictEqual([
        {href: "https://pt.wikipedia.org/wiki/Markdown/", text: "Markdown", file: "./README.md", status:200, ok: "ok"},
        {href: "https://nodejs.org/", text: "Node.js", file: "./README.md", status:200, ok: "ok"},
        {href: "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg", text: "md-links", file:"./README.md", status:200, ok: "ok"},
      ]);
    });
  });



it('deveria retornar links om status 404 e "fail"', () => {
  global.fetch = jest.fn(()=> Promise.resolve({
status: 404
  }));
  
  
  return mdLinks('./README.md', { validate: true }).then((links) => {
    expect(links).toStrictEqual([
      {href: "https://pt.wikipedia.org/wiki/Markdown/", text: "Markdown", file: "./README.md", status:404, ok: "fail"},
      {href: "https://nodejs.org/", text: "Node.js", file: "./README.md", status:404, ok: "fail"},
      {href: "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg", text: "md-links", file:"./README.md", status:404, ok: "fail"},
    ]);
  });
});


it('deveria retornar links sem validação quando validate for "false"', () => {
  global.fetch = jest.fn(()=> Promise.resolve({
status: 200
  }));
  
  
  return mdLinks('./README.md', { validate: false }).then((links) => {
    expect(links).toStrictEqual([
      {href: "https://pt.wikipedia.org/wiki/Markdown/", text: "Markdown", file: "./README.md"},
      {href: "https://nodejs.org/", text: "Node.js", file: "./README.md"},
      {href: "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg", text: "md-links", file:"./README.md"},
    ]);
  });
});

it('deveria retornar links com erro de conexão e "fail"', () => {
  global.fetch = jest.fn(()=> Promise.reject({}));
  
  
  return mdLinks('./README.md', { validate: true }).then((links) => {
    expect(links).toStrictEqual([
      {href: "https://pt.wikipedia.org/wiki/Markdown/", text: "Markdown", file: "./README.md", status:"Link nao encontrado", ok: "fail"},
      {href: "https://nodejs.org/", text: "Node.js", file: "./README.md", status:"Link nao encontrado", ok: "fail"},
      {href: "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg", text: "md-links", file:"./README.md", status:"Link nao encontrado", ok: "fail"},
    ]);
  });
});

});


