import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { QnA, QnAId } from './QnA';

export interface Question_Regist_timeAttributes {
  id: string;
  timeStamp: number;
}

export type Question_Regist_timePk = "id";
export type Question_Regist_timeId = Question_Regist_time[Question_Regist_timePk];
export type Question_Regist_timeCreationAttributes = Question_Regist_timeAttributes;

export class Question_Regist_time extends Model<Question_Regist_timeAttributes, Question_Regist_timeCreationAttributes> implements Question_Regist_timeAttributes {
  id!: string;
  timeStamp!: number;

  // Question_Regist_time belongsTo QnA via id
  id_QnA!: QnA;
  getId_QnA!: Sequelize.BelongsToGetAssociationMixin<QnA>;
  setId_QnA!: Sequelize.BelongsToSetAssociationMixin<QnA, QnAId>;
  createId_QnA!: Sequelize.BelongsToCreateAssociationMixin<QnA>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Question_Regist_time {
    return Question_Regist_time.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'QnA',
        key: 'id'
      }
    },
    timeStamp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "초단위"
    }
  }, {
    sequelize,
    tableName: 'Question_Regist_time',
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
