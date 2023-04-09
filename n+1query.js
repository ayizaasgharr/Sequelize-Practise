const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sql.sqlite",
});
const Posts = sequelize.define("Posts", {
  post: DataTypes.STRING,
});
const Author = sequelize.define("Author", {
  userName: DataTypes.STRING,
});


Author.hasMany(Posts);
Posts.belongsTo(Author, { foreignKey: Author.id });

//n+1 problem
// Posts.findAll().then((posts)=>{
//     posts.forEach(async(post)=>{
//       post.getPosts(async(userpost)=>{console.log(userpost.username)})
//     })
//     })
//n+1 solution
Posts.findAll({
  include: [{ model: Author, attributes: ["userName"] }],
}).then((posts) => {
  posts.forEach((post) => {
    console.log(`user ${post.Author?.userName} has written ${post.id}`);
  });
});

