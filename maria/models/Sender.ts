import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Departure, DepartureId } from './Departure';

export interface SenderAttributes {
  ID: number;
  NAME: string;
  PHONE: string;
}

export type SenderPk = "ID";
export type SenderId = Sender[SenderPk];
export type SenderCreationAttributes = SenderAttributes;

export class Sender extends Model<SenderAttributes, SenderCreationAttributes> implements SenderAttributes {
  ID!: number;
  NAME!: string;
  PHONE!: string;

  // Sender belongsTo Departure via ID
  ID_Departure!: Departure;
  getID_Departure!: Sequelize.BelongsToGetAssociationMixin<Departure>;
  setID_Departure!: Sequelize.BelongsToSetAssociationMixin<Departure, DepartureId>;
  createID_Departure!: Sequelize.BelongsToCreateAssociationMixin<Departure>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sender {
    return Sender.init({
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "의뢰contract 호출키",
      references: {
        model: 'Departure',
        key: 'ID'
      }
    },
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    PHONE: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Sender',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
  }
}
