import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Question_Regist_time, Question_Regist_timeCreationAttributes, Question_Regist_timeId } from './Question_Regist_time';

export interface QnAAttributes {
  id: string;
  user_id: string;
  title: string;
  hits: number;
  detail: string;
}

export type QnAPk = "id";
export type QnAId = QnA[QnAPk];
export type QnACreationAttributes = QnAAttributes;

export class QnA extends Model<QnAAttributes, QnACreationAttributes> implements QnAAttributes {
  id!: string;
  user_id!: string;
  title!: string;
  hits!: number;
  detail!: string;

  // QnA hasOne Question_Regist_time via id
  Question_Regist_time!: Question_Regist_time;
  getQuestion_Regist_time!: Sequelize.HasOneGetAssociationMixin<Question_Regist_time>;
  setQuestion_Regist_time!: Sequelize.HasOneSetAssociationMixin<Question_Regist_time, Question_Regist_timeId>;
  createQuestion_Regist_time!: Sequelize.HasOneCreateAssociationMixin<Question_Regist_time>;

  static initModel(sequelize: Sequelize.Sequelize): typeof QnA {
    return QnA.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    hits: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    detail: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'QnA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
