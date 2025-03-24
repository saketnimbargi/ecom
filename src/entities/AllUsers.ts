import { Model, DataTypes, Sequelize, Optional } from "sequelize";

// Attributes interface
interface AllUsersAttributes {
  id: number;
  name: string;
  username: string;
  password: string;
  age?: number;
  gender?: "male" | "female" | "other";
  department?: string;
  country?: string;
  city?: string;
  state?: string;
  dob?: Date;
  createDt: Date;
  modifiedDt: Date;
  customer_id?: string;
}

// Creation attributes - optional fields for creation
interface AllUsersCreationAttributes
  extends Optional<AllUsersAttributes, "id" | "createDt" | "modifiedDt"> {}

// Define AllUsers model
export class AllUsers
  extends Model<AllUsersAttributes, AllUsersCreationAttributes>
  implements AllUsersAttributes
{
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public age?: number;
  public gender?: "male" | "female" | "other";
  public department?: string;
  public country?: string;
  public city?: string;
  public state?: string;
  public dob?: Date;
  public createDt!: Date;
  public modifiedDt!: Date;
  public customer_id?: string;

  // Initialization method
  public static initialize(sequelize: Sequelize): void {
    AllUsers.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        gender: {
          type: DataTypes.ENUM("male", "female", "other"),
          allowNull: true,
        },
        department: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        country: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        state: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        dob: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        createDt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "create_dt",
        },
        modifiedDt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "modified_dt",
        },
        customer_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "all_users",
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ["username"],
          },
        ],
      }
    );
  }

  // Associate method - define relationships with other models
  // public static associate(models: Record<string, ModelStatic<Model>>): void {
  //   // Example: AllUsers.hasMany(models.Order, { foreignKey: 'user_id' });
  // }
}
