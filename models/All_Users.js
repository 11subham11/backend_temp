module.exports = (sequelize, DataTypes) => {
  const All_Users = sequelize.define("All_Users", {
    firstName: {
      type: DataTypes.STRING,
      allownNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allownNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allownNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allownNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allownNull: false,
      defaultValue: "user",
    },
    count: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allownNull: true,
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0,
      comment: "0 => active,  1 => deleted",
      allownNull: true,
    },
    isBlocked: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0,
      comment: "0 => active,  1 => blocked",
      allownNull: true,
    },
    isConfirmed: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0,
      comment: "0 => inactive,  1 => Confirmed",
      allownNull: true,
    },
    isSuspended: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0,
      comment: "0 => active,  1 => Suspended",
      allownNull: true,
    },
    Created_By: {
      type: DataTypes.STRING,
      defaultValve: "Vj_Consulting",
      allowNull: false,
    },
    Updated_By: {
      type: DataTypes.STRING,
      defaultValve: "Vj_Consulting",
      allowNull: false,
    },
  });

  return All_Users;
};
