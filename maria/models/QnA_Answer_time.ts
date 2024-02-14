import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { QnA_Answer, QnA_AnswerId } from './QnA_Answer';

export interface QnA_Answer_timeAttributes {
  ans_key: string;
  timeStamp: number;
}

export type QnA_Answer_timePk = "ans_key";
export type QnA_Answer_timeId = QnA_Answer_time[QnA_Answer_timePk];
export type QnA_Answer_timeCreationAttributes = QnA_Answer_timeAttributes;

export class QnA_Answer_time extends Model<QnA_Answer_timeAttributes, QnA_Answer_timeCreationAttributes> implements QnA_Answer_timeAttributes {
  ans_key!: string;
  timeStamp!: number;

  // QnA_Answer_time belongsTo QnA_Answer via ans_key
  ans_key_QnA_Answer!: QnA_Answer;
  getAns_key_QnA_Answer!: Sequelize.BelongsToGetAssociationMixin<QnA_Answer>;
  setAns_key_QnA_Answer!: Sequelize.BelongsToSetAssociationMixin<QnA_Answer, QnA_AnswerId>;
  createAns_key_QnA_Answer!: Sequelize.BelongsToCreateAssociationMixin<QnA_Answer>;

  static initModel(sequelize: Sequelize.Sequelize): typeof QnA_Answer_time {
    return QnA_Answer_time.init({
    ans_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'QnA_Answer',
        key: 'ans_key'
      }
    },
    timeStamp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "초단위"
    }
  }, {
    sequelize,
    tableName: 'QnA_Answer_time',
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
