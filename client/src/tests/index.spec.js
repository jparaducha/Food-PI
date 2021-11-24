const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    
  });

  describe('GET /home', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
  });


  describe('POST /sumArray', () => {
    xit('responds with 200', () => agent.post('/sumArray').expect(200));
    it('responds with and object with result', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(false);
      }));
    it('responds with an object with the boolean result', ()=>
    agent.post('/sumArray')
    .send({array: [10,10,10,10,100,100,100,100], num:110})
    .then((res)=>{
      expect(res.body.result).toEqual(true);
      expect(res.body.total).toEqual(110);
    }))
    it('responds with and object with result: `true`', ()=>
    agent.post('/sumArray')
    .send({array: [1,1,1,1,1,1,1,200,500,5,5,5], num: 706})
    .then((res)=>{
      expect(res.body.result).toEqual(true);
    }))
  });


  })

