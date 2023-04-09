const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sql.sqlite",
});

const Author = sequelize.define("Author", {
  userName: DataTypes.STRING,
});

const Posts = sequelize.define("Posts", {
  post: DataTypes.STRING,
});
//One to Many
Author.hasMany(Posts, { onDelete: "cascade", hooks: true });
Posts.belongsTo(Author, { foreignKey: Author.id });

(async () => {
  await sequelize.sync();
  const newUser = Author.create({ userName: "areej" });
  Author.beforeDestroy(() => {
    console.log("Post will be deleted as well");
  });
  const newPost = Posts.create({ id:23,post: "123", AuthorId: 1});
  const newPost2 = Posts.create({ id:24,post: "123", AuthorId: 1 });
  (await newUser).destroy;
})();

const Student = sequelize.define("Student", {
  name: DataTypes.STRING,
});
const Department = sequelize.define("Department", {
  name: DataTypes.STRING,
});
//One to Many
Department.hasMany(Student);
Student.belongsTo(Department, { foreignKey: Student.id });
(async () => {
  await sequelize.sync();
  const newDepartment = Department.create({ name: "CS", id: 6449 });

  const newStudent = Student.create({id:3, name: "Amna", DepartmentId: 6449 });
})();

const CEO = sequelize.define("CEO", {
  name: DataTypes.STRING,
});
const Company = sequelize.define("Company", {
  name: DataTypes.STRING,
});
//One to One
CEO.hasOne(Company);
Company.belongsTo(CEO, { foreignKey: Company.id });

(async () => {
  await sequelize.sync();

  CEO.create({ name: "CEO", id: 1449 });
Company.create({ name: "DEVSINC", CEOId: 1449 });
})();

const Actor = sequelize.define("Actor", {
  name: DataTypes.STRING,
});

const Movies = sequelize.define("Movies", {
  name: DataTypes.STRING,
});

const Actor_Movie = sequelize.define("Actor_Movie", {
  ActorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Actor,
      key: "id",
    },
  },
  MoviesId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movies,
      key: "id",
    },
  },
});
//Many to Many


// Actor.belongsToMany(Movies, { through: Actor_Movie });
// Movies.belongsToMany(Actor, { through: Actor_Movie });

// (async () => {
//   await sequelize.sync();
//   const newActor = await Actor.create({ name: "actor1" });
//   const newMovie = await Movies.create({ name: "movie1" });
//   console.log(newMovie.dataValues.id);
//   console.log(newActor.dataValues.id);

//   const actor_newMovie = await Actor_Movie.create(
//     newActor.dataValues.id,
//     newMovie.dataValues.id
//   );
// })();
