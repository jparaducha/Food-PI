/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diets, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanesa a la napolitana',
  healthScore: 10,
  summary: "una prueba",
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
        
    beforeEach(() => Diets.sync({ force: true }));
  describe('GET /types', () => {
    it('response should be 200', () =>{
      return agent.get('/types').expect(200)
  })
  });
    it('diets should have length of 11', () =>{
    return agent.get('/types').expect(200).then(types=>{
    expect(types.body).to.have.lengthOf(11);
   })
});
it('position 3 should be lcto ovo vegetarian', () =>{
  return agent.get('/types').expect(200).then(types=>{
  expect(types.body[3]).to.have.property("name").to.equal("Lacto Ovo Vegetarian")
 })
});

});

/* }); */