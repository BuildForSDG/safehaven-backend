
module.exports = (sequelize, DataTypes) => {
  const Consultant = sequelize.define('Consultant', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_uuid: DataTypes.UUID,
    specialization: DataTypes.STRING,
    validIdCard: DataTypes.STRING,
    certificate: DataTypes.STRING,
    credentialsVerified: DataTypes.BOOLEAN
  }, {});
  Consultant.associate = (models) => {
    Consultant.belongsTo(models.User, {
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
  };
  return Consultant;
};
