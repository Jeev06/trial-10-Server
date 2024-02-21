import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

interface Entities {
  [key: string]: ModelStatic<Model<any, any>>;
}

export default (sequelize: Sequelize): Entities => {
  const entities: Entities = {};

  
    entities.authentication = sequelize.define('authentication', {
    
    username: {
      type: DataTypes.STRING
    },
    
    password: {
      type: DataTypes.STRING
    }
    
    });
    
  return entities;
};
