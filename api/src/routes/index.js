const { Router } = require('express');
const { Recipe, Diet_type } = require('../db.js');
const crypto  = require('crypto');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  axios  = require('axios');
const morgan = require('morgan');


const {Op, UUID, DataTypes, Sequelize} = require('sequelize');
const { URLSearchParams } = require('url');
const {
    DB_USER, YOUR_API_KEY, DB_HOST,
  } = process.env;

  const apiKeys = ['740456301aa641dea81fc8a540530539', '4e84d07ca9e34723a06d3748b52db7d1', YOUR_API_KEY ]

const router = Router();

router.use(morgan('dev'));

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const tiposDeDietas = [
    {
        id: 1,
        name : 'Gluten Free'
    },
    {
        id: 2,
        name : 'Ketogenic'
    },
    {
        id: 3,
        name : 'Vegetarian'
    },
    {
        id: 4,
        name : 'Lacto-Vegetarian'
    },
    {
        id: 5,
        name : 'Ovo-Vegetarian'
    },
    {
        id: 6,
        name : 'Vegan'
    },
    {
        id: 7,
        name : 'Pescetarian'
    },
    {
        id: 8,
        name : 'Paleo'
    },
    {
        id: 9,
        name : 'Primal'
    },
    {
        id: 10,
        name : 'Low FODMAP'
    },
    {
        id: 11,
        name : 'Whole30'
    },
]

router.get('/', async function(req,res){
    res.send(200);
});


var getDatabaseInfo = async function(name){ //busca las recetas que matcheen con el nombre en la base de datos;
    return await Recipe.findAll({
        where: {
            name : {
                [Op.iLike] : `%${name}%`
            }
        }
    })
}


router.get('/recipes', async function(req,res){
    

    try {
    const {name, title, query} = req.query;


    console.log('query: ' ,req.query)
    var getApiCall = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name|| ''}&number=50&addRecipeInformation=true&apiKey=${apiKeys[0]}`);
  
  let array = Object.values(getApiCall.data.results);

  let recetas = await Promise.all(array.map(i=>{
    return {
        id: i.id,
        name: i.title,
        summary: i.summary,
        diets: i.diets,
        image: i.image,
        dishTypes: i.dishTypes,
        healthScore : i.healthScore,
        instructions : i.instructions,
        score : i.spoonacularScore
    }
}));

     //concatena la información de la db con la de la api;
        let apiInfo = recetas;
        let dbInfo = await getDatabaseInfo(name);
        const info = dbInfo.concat(apiInfo);

    info ? res.json(info) : res.status(401).send('no se encontró la receta');
    
}
catch(e){
    console.log(e);
}
});

router.get('/recipes/:id', async function(req,res){
    const { id } = req.params;
    let array;
    await axios.get(`https://api.spoonacular.com/recipes/${id}/information?
    &apiKey=${YOUR_API_KEY}`)
    .then(r =>{
        array = r.data;
    })
    .catch((e)=>{
        console.log(e)
    }
    )

    if(!array) return res.status(404).send("No se encontró la receta");
    let receta =  {
            id: array.id,
            name: array.title,
            summary: array.summary,
            diets: array.diets,
            image: array.image,
            dishTypes: array.dishTypes,
            healthScore : array.healthScore,
            instructions : array.instructions,
            score : array.spoonacularScore
        }
    return res.json(receta);
});

router.get('/types', async (req,res)=>{
    // let types = Diet_type.findAll();
    
    // if(!types){ 
    //     Diet_type.bulkCreate(tiposDeDietas).then((tipos)=> res.json(tipos))
    //     .then((tipos) => res.json(tipos))
    // }
//     if (!types){
    for(let i = 0; i<tiposDeDietas.length;i++){
        let ele = tiposDeDietas[i];
    await Diet_type.create({
        id: ele.id,
        name: ele.name
    })}
// }
    types = await Diet_type.findAll();
    
    return res.json(types);

})


router.post('/recipes', async (req,res)=>{
    const {name, summary,healthScore, diets, image, dishTypes, instructions, score} = req.query;
    if(!name || !summary) return res.send('Se necesita un name y un summary en el query');

    let recipe;
   recipe = await Recipe.findOne({
      where : { 
        name: name,
        // summary: summary,
        // diets: diets ||null,
        // image:image|| null,
        // dishTypes: dishTypes || null,
        // healthScore :healthScore || null,
        // instructions : instructions || null
      }
  })
  try{
if(!recipe){
    recipe = await Recipe.create({
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            primaryKey: true,
            unique: true
        },
        instructions :instructions || null,
        name : name || null,
        summary : summary || null,
        diets : diets || null,
        image: image || null,
        dishTypes: dishTypes || null,
        healthScore : healthScore || null})

}else{
    recipe.instructions = instructions || recipe.instructions;
    recipe.summary = summary || recipe.summary;
    recipe.diets = diets || recipe.diets;
    recipe.image = image || recipe.image;
    recipe.dishTypes = dishTypes || recipe.dishTypes;
    recipe.healthScore = healthScore || recipe.healthScore;
}}

catch(e){console.log(e)};

recipe ? res.json(recipe): res.send('no se pudo agregar ??');

})



module.exports = router;
