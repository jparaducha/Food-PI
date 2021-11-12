const { Router } = require('express');
const { Recipe } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  axios  = require('axios');
const morgan = require('morgan');

const {Op} = require('sequelize');
const {
    DB_USER, YOUR_API_KEY, DB_HOST,
  } = process.env;


const router = Router();

router.use(morgan('dev'));

// let getApiCall = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${title}
//   &addRecipeInformation=true&apiKey=${API_KEY}`);
//   //me quedo con los datos brutos en un array
  
//   let array = (Object.values(getApiCall.data.results));


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async function(req,res){
    res.send(200);
});

router.get('/recipes', async function(req,res){

    const {name} = req.query;
    if(!name) return res.send('Se necesita un name en el query');

    var getApiCall = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}
  &addRecipeInformation=true&apiKey=${YOUR_API_KEY}`);
  
  let array = Object.values(getApiCall.data.results).map(i=>{
      return {
          id: i.id,
          name: i.title,
          summary: i.summary,
          diets: i.diets,
          image: i.image,
          dishTypes: i.dishTypes,
          healthScore : i.healthScore,
          instructions : i.instructions
      }
  });


    res.status(200).json(array);
});

router.get('/recipes/:id', async function(req,res){
    const { id } = req.params;
    const { title } = req.query;
    let array;
    console.log('fghgfhfgh');
    await axios.get(`https://api.spoonacular.com/recipes/${id}/information?
    &apiKey=${YOUR_API_KEY}`)
    .then(r =>{
        array = r.data;
    })
    .catch((e)=>{
        console.log(e)
    }
    )

    let receta =  {
            id: array.id,
            name: array.title,
            summary: array.summary,
            diets: array.diets,
            image: array.image,
            dishTypes: array.dishTypes,
            healthScore : array.healthScore,
            instructions : array.instructions
        }

    // if(!Recipe) return res.status(404).send("no se encontró");
    return res.json(receta);
});


router.post('/recipes', async (req,res)=>{
    const {name} = req.query;
    if(!name) return res.send('Se necesita un name en el query');

    var getApiCall = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}
  &addRecipeInformation=true&apiKey=${YOUR_API_KEY}`);
  
  let array =  Object.values(getApiCall.data.results).map(i=>{
      return {
          id: i.id,
          name: i.title,
          summary: i.summary,
          diets: i.diets,
          image: i.image,
          dishTypes: i.dishTypes,
          healthScore : i.healthScore,
          instructions : i.instructions
      }
  });
  console.log(array[id]);
  const [recipe, create] = await Recipe.findOrCreate({
      where : { 
        id: array.id,
        name: array.title,
        summary: array.summary,
        diets: array.diets,
        image: array.image,
        dishTypes: array.dishTypes,
        healthScore : array.healthScore,
        instructions : array.instructions
      }
  })


  await Recipe.addRecipe(recipe);

})



module.exports = router;
