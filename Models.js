const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const User = sequelize.define(
  "User",
  {
    firsrName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {}
);

class User2 extends Model {
  id;
}
User2.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
  },
  {
    sequelize,
  }
);

class User3 extends Model {}

User3.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
  },
  {
    sequelize,
  }
);

const user2 = new User2({ id: 4, firstName: "ayiza" });
const user6 = new User2({ lastName: "asghar", firstName: "AMNA" });
console.log(User === sequelize.model.User);
console.log(User2 === sequelize.model.User2);
//overshadow
console.log(user2.id);
console.log("lastname", user6);
const user3 = new User3({ id: 4 });
console.log("USER6", user6);
console.log(user3.id);

//creating table name different from model name

const User4 = sequelize.define(
  "User3",
  {
    id: { type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true },
    firstName: DataTypes.STRING,
  },
  { tableName: "UserTable" }
);
const user4 = new User4({ id: 5, firstName: "Areej" });
const user5 = new User4({ firstName: "Areej" });

console.log(user4.id);
console.log(user5.firstName);
console.log(user5.id);
console.log("User5", user5.createdAt);
//sync with database table User4
// User4.sync()

const User5 = sequelize.define("User4", {
  firstName: {
    type: DataTypes.STRING,
    defaultValue: "ASMA",
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
const user7 = new User5({});
console.log("user7", user7.date);
User4.drop();

//Class level METHODS

class User6 extends Model {
  getFullName() {
    return [this.firstName, this.lastName].join(" ");
  }
}

User6.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
  { sequelize }
);

const user8 = new User6({ firstName: "ayiza", lastName: "asghar" });
console.log(user8.getFullName());
const user9 = new User6({ firstName: "areej", lastName: "fatima" });
