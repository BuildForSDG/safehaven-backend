module.exports = (sequelize, DataTypes) => {
  const Appointments = sequelize.define('Appointments', {
    patient_uuid: DataTypes.UUID,
    consultant_uuid: DataTypes.UUID,
    dateTime: DataTypes.DATE
  }, {});
  Appointments.associate = (models) => models;
  return Appointments;
};
