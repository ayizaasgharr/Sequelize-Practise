const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

async function testdb() {
    try {
        await db.authenticate();
        console.log('db connected'); // test 1
    } catch (error) {
        console.error(error);
    }

    const User = db.define('Users', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT,
        },
    });

    console.log(db.models.User); // test 2
    await User.sync();

    User.addHook('beforeCreate',()=>{
        console.log('USER WILL BE CREATED')

    })
    const user = await User.create({
        userName: 'epiw3ww4c_user01',
        email: 'epic.u23eeser@gmail.com',
        bio: 'hello wo3ee3rld!!!',
    });

    User.addHook('beforeDestroy',()=>{
console.log('User is about to be destroyed')
    })
user.destroy()
    console.log(user.id); // test 3
}

testdb();