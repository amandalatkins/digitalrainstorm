module.exports = function(sequelize, DataTypes) {
    var Testimonial = sequelize.define("Testimonial", {
        quote: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        person: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: false
    });
    return Testimonial;
}