import { DataTypes } from "sequelize";

export const modelOptions = {
  tableName: "users",
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
  paranoid: true,
  indexes: [{ fields: ["id"] }, { fields: ["email"] }],
};

export const attributes = {
  first_name: {
    type: new DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: {
        args: [3, 50] as readonly [number, number],
        msg: "First name length should be 3 to 50 chracters",
      },
      notNull: {
        args: true,
        msg: "First name cannot be empty",
      },
      isAlpha: {
        args: true,
        msg: "First name should contain only alphabets",
      },
    },
  },
  last_name: {
    type: new DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: {
        args: [1, 50] as readonly [number, number],
        msg: "Last name length should be 1 t0 50 characters",
      },
      notNull: {
        args: true,
        msg: "Last name cannot be empty",
      },
      isAlpha: {
        args: true,
        msg: "Last name should contain only alphabets",
      },
    },
  },
  email: {
    type: new DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: isEmailUnique,
    isEmail: {
      args: true,
      msg: "Invalid email",
    },
    len: {
      args: [1, 100] as readonly [number, number],
      msg: "Email length should be 1 to 100 characters",
    },
    notNull: {
      args: true,
      msg: "Email cannot be empty",
    },
  },
  encrypted_password: {
    type: DataTypes.TEXT,
  },
  password:{
type:DataTypes.VIRTUAL,
allowNull:true,
validate:{
isValidPassword,
len:{
    args:[6,20] as readonly [number,number],
    msg:'Password length should be 6 to 20 characters'
}
},
set(this,val:string){
  if(!!val){
    this.setDataValue('password',val);
    this.setDataValue('encrypted_password',bycrypt.hashSync(val,SALT_ROUND));
  }
}
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
};
