

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sql.sqlite',
});

const Customer=sequelize.define('Customer',{
    
    CustomerName:{
        type:DataTypes.STRING,
        indexes:[{
            unique:true,
            field:['CustomerName'],
        },
        
        {unique:true,
        field:['Email','Password']
        },
    {
        field:['Email']
    }
    ]
    
    },
    Email:DataTypes.STRING,
    Password:DataTypes.STRING,

   
});
(
    async()=>{
        await Customer.sync({alter:true})

const c1=Customer.create({CustomerName:'ayiza'})


const c2=Customer.create({CustomerName:'asghar'})
    }
)();

