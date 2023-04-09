const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './sql.sqlite',
});


 const Articles=db.define('Article',{
    
    content:{
        type:DataTypes.STRING
    }

});

const Trending=db.define('Trending',{
 
    content:{
        type:DataTypes.STRING
    }
});

const Home=db.define('Home',{
  
content:{
    type:DataTypes.STRING
}
});


(async()=>{
    await db.sync()
  Trending.hasMany(Articles,{foreignKey:'articleId',constraints:false,scope:{articleType:'trending'}});
  Home.hasMany(Articles,{foreignKey:'articleId',constraints:false,scope:{articleType:'home'}});
    Articles.belongsTo(Trending,{foreignKey:'articleId',constraints:false});
    Articles.belongsTo(Home,{foreignKey:'articleId',constraints:false});
    
    // const Homes=await Home.create({content:'article1'})
    //  const article=await Homes.createArticles({content:'c1'})
})();
