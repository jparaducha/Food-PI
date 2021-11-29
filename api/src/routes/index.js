const { Router } = require('express');
const { Recipe, Diets } = require('../db.js');
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
        name : 'Lacto Ovo Vegetarian'
    },
    {
        id: 5,
        name : 'Vegan'
    },
    {
        id: 6,
        name : 'Pescetarian'
    },
    {
        id: 7,
        name : 'Paleo'
    },
    {
        id: 8,
        name : 'Primal'
    },
    {
        id: 9,
        name : 'Whole30'
    },
    {
        id: 10,
        name : 'Low FODMAP'
    },
    {
        id: 11,
        name : 'Dairy Free'
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
        },
        include : {
            model : Diets
        }
    })
}

var getDBbyUUID = async function(id){
    return await Recipe.findOne({
        where: {
            uuid : id
        },
        include: {
            model: Diets,
            attributes: ["name"],
            through: {attributes: []}
          } 
    })
}


router.get('/recipes', async function(req,res){
    

    try {
    const {name, title, query} = req.query;

    var getApiCall = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name|| ''}&number=100&addRecipeInformation=true&apiKey=${apiKeys[2]}`);
  
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

    info ? res.status(200).json(info) : res.status(401).send('no se encontró la receta');
    
}
catch(e){
    console.log(e);
}
});

router.get('/recipes/:id', async function(req,res){
    const { id } = req.params;
    let array;
    var receta = {};

    if(id.length<11){
    console.log('busca en spoonacular con ', id);
    await axios.get(`https://api.spoonacular.com/recipes/${id}/information?
    &apiKey=${YOUR_API_KEY}`)
    .then(r =>{
        array = r.data;
    })
    .catch((e)=>{
        console.log('error dentro del if');
    }
    )


    
    receta =  {
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



}
    else {
    console.log('entra al else y busca una receta con uuid:', id);
    let dbRecipe = await getDBbyUUID(id);


        // console.log('dbRecipe.dataValues.diets.map(i=> i.diets.dataValues) :', dbRecipe.dataValues.diets.map(i=> i.diets.dataValues));
        console.log('línea 181 routes.js. dbRecipe.dataValues:', dbRecipe.dataValues);
    receta =  {
        uuid: dbRecipe.dataValues.uuid || null,
        name: dbRecipe.dataValues.name || null,
        summary: dbRecipe.dataValues.summary || null,
        // diets: dbInfo.dataValues.diets.map(el => {
        //     return el.name
        //   })|| null,
        image: dbRecipe.dataValues.image || null,
        dishTypes: dbRecipe.dataValues.dishTypes || null,
        healthScore : dbRecipe.dataValues.healthScore || null,
        instructions : dbRecipe.dataValues.instructions || null,
        score : dbRecipe.dataValues.score || null
    }

    console.log('receta es :', receta);
}
    if(!Object.keys(receta)) return res.status(404).send("No se encontró la receta");
    return res.json(receta);
});

router.get('/types', async (req,res)=>{
    // let types = Diet_type.findAll();
    
    // if(!types){ 
    //     Diet_type.bulkCreate(tiposDeDietas).then((tipos)=> res.json(tipos))
    //     .then((tipos) => res.json(tipos))
    // }
//     if (!types){
    for(let i = 0; i<tiposDeDietas.length;i++)
    {
        let ele = tiposDeDietas[i];
            await Diets.findOrCreate({
                where:{
                        name : ele.name
                }
                ,defaults: {
                        id: ele.id,
                        name: ele.name
                }
})
}
// }
    types = await Diets.findAll();
    
    return res.json(types);

})


router.post('/recipes', async (req,res)=>{



try {
    const {name, summary, score, healthScore, instructions, image, diets} = req.body;
    // if(!diets){ diets = ['Vegan']};
    // console.log('score: ', score);
   
   let recipeCreated = await Recipe.create({
        name,
        summary,
        score,
        healthScore,
        instructions,
        image
    })
    console.log('receta creada: ',recipeCreated.dataValues.name);
    let dietTypesDb = await Diets.findAll({
      where: {name : diets}
    })
    // console.log('diets es:', diets);
    // console.log('diettypesdb ', dietTypesDb.map(i=> i.dataValues.name));


    recipeCreated.addDiets(dietTypesDb);

    // console.log('recipe created después de addiets: ', recipeCreated);
    res.send(`Recipe "${name}" successfully created.`)
  }
catch(e){
    // console.log(e)
    res.status(401).send(e);
};


})



module.exports = router;
