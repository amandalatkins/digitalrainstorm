module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url:  {
            type: DataTypes.STRING,
            allowNull: false,
        },
        services:  {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false
    });

    return Project;
}