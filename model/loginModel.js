 module.exports=(sequelize,DataTypes)=>{
    const userData=sequelize.define("data",{
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    return userData;
};