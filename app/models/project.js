module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING
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
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
        order: {
            type: DataTypes.NUMBER
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: false
    });

    return Project;
}