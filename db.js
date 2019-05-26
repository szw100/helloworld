
import Sequelize from "sequelize";

const TasksModel = require('./models/tasks');
const UsersModel = require('./models/users');
let db = null;

module.exports = app => {
    if(!db){
        const config = app.libs.config;
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
        db = {
            sequelize,
            Sequelize,
            models: {}
        }

        const Tasks = TasksModel(sequelize, Sequelize);
        const Users = UsersModel(sequelize, Sequelize);

        // Tasks.belongsTo(Users);
        // Users.hasMany(Tasks);
        
        db.models={
            'tasks': Tasks,
            'users': Users
        }


        // const dir = path.join(__dirname, "models");
        // fs.readdirSync(dir).forEach(file=>{
        //     const modelDir = path.join(dir, file);
        //     const model = sequelize.import(modelDir);
        //     db.models[model.name] = model;
        // });
        // Object.keys(db.models).forEach(key => {
        //     console.log(key);
        //     db.models[key].associate(db.models);
        // });


    }
    return db;
}
