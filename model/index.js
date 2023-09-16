const dbConfig=require("../config/dbConfig")
const {Sequelize,DataTypes}=require('sequelize')

const sequelize=new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dailect,
    port:6712,
    pool:{
        min:dbConfig.pool.min,
        max:dbConfig.pool.max,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle,
    }
})
sequelize.authenticate().then(()=>{
    console.log("DataBase Connected succesfully");
}).catch((err)=>{
    console.log("Error to connect Database");
})
const db={};
db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.data=require("./loginModel")(sequelize,DataTypes);

db.sequelize.sync({force:false})
.then(()=>{
    console.log("Successfully sync!!!!!!!!!!!!!!")
})

.catch((err)=>{
    console.log("Error to sync :"+err)
})
module.exports = db;
