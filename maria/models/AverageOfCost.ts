import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface AverageOfCostAttributes {
  date: string;
  "5KM": number;
  "10KM": number;
  "15KM": number;
  "20KM": number;
  "25KM": number;
  "30KM": number;
  "40KM": number;
  "50KM": number;
  "60KM": number;
  "60+KM": number;
}

export type AverageOfCostPk = "date";
export type AverageOfCostId = AverageOfCost[AverageOfCostPk];
export type AverageOfCostCreationAttributes = AverageOfCostAttributes;

export class AverageOfCost
  extends Model<AverageOfCostAttributes, AverageOfCostCreationAttributes>
  implements AverageOfCostAttributes
{
  date!: string;
  "5KM"!: number;
  "10KM"!: number;
  "15KM"!: number;
  "20KM"!: number;
  "25KM"!: number;
  "30KM"!: number;
  "40KM"!: number;
  "50KM"!: number;
  "60KM"!: number;
  "60+KM"!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof AverageOfCost {
    return AverageOfCost.init(
      {
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          primaryKey: true,
        },
        "5KM": {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        "10KM": {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        "15KM": {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        "20KM": {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        "25KM": {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        "30KM": {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        "40KM": {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        "50KM": {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        "60KM": {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        "60+KM": {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "AverageOfCost",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "date" }],
          },
        ],
      },
    );
  }
}
