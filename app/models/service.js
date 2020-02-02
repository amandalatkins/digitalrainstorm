module.exports = function(sequelize, DataTypes) {
    var Service = sequelize.define("Service", {
        service: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false
    });
    return Service;
}