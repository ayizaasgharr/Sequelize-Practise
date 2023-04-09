
//directly run query from sequelize
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sql.sqlite',
});
const queryInterface = sequelize.getQueryInterface();

const students=queryInterface.createTable('Student',{
name:DataTypes.STRING,
class:DataTypes.NUMBER,


})


sequelize.query('SELECT * FROM Authors where Authors.id < 20').then((USER)=>{
    console.log(USER)
})

sequelize.query('SELECT DepartmentId,COUNT(*) FROM Students GROUP BY DepartmentId').then((Department)=>{
    console.log(Department)
})
