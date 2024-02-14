import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { QnA_Answer_time, QnA_Answer_timeCreationAttributes, QnA_Answer_timeId } from './QnA_Answer_time';

export interface QnA_AnswerAttributes {
  ans_key: string;
  id: string;
  manager_id: string;
  ans_detail: string;
}

export type QnA_AnswerPk = "ans_key";
export type QnA_AnswerId = QnA_Answer[QnA_AnswerPk];
export type QnA_AnswerCreationAttributes = QnA_AnswerAttributes;

export class QnA_Answer extends Model<QnA_AnswerAttributes, QnA_AnswerCreationAttributes> implements QnA_AnswerAttributes {
  ans_key!: string;
  id!: string;
  manager_id!: string;
  ans_detail!: string;

  // QnA_Answer hasOne QnA_Answer_time via ans_key
  QnA_Answer_time!: QnA_Answer_time;
  getQnA_Answer_time!: Sequelize.HasOneGetAssociationMixin<QnA_Answer_time>;
  setQnA_Answer_time!: Sequelize.HasOneSetAssociationMixin<QnA_Answer_time, QnA_Answer_timeId>;
  createQnA_Answer_time!: Sequelize.HasOneCreateAssociationMixin<QnA_Answer_time>;

  static initModel(sequelize: Sequelize.Sequelize): typeof QnA_Answer {
    return QnA_Answer.init({
    ans_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    manager_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ans_detail: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'QnA_Answer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ans_key" },
        ]
      },
    ]
  });
  }
}
