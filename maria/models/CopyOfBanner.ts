import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Banner, BannerId } from './Banner';

export interface CopyOfBannerAttributes {
  Key2: string;
  Field: number;
  Field2: number;
  Field3: number;
  Field4: number;
  Field5: number;
}

export type CopyOfBannerPk = "Key2";
export type CopyOfBannerId = CopyOfBanner[CopyOfBannerPk];
export type CopyOfBannerCreationAttributes = CopyOfBannerAttributes;

export class CopyOfBanner extends Model<CopyOfBannerAttributes, CopyOfBannerCreationAttributes> implements CopyOfBannerAttributes {
  Key2!: string;
  Field!: number;
  Field2!: number;
  Field3!: number;
  Field4!: number;
  Field5!: number;

  // CopyOfBanner belongsTo Banner via Key2
  Key2_Banner!: Banner;
  getKey2_Banner!: Sequelize.BelongsToGetAssociationMixin<Banner>;
  setKey2_Banner!: Sequelize.BelongsToSetAssociationMixin<Banner, BannerId>;
  createKey2_Banner!: Sequelize.BelongsToCreateAssociationMixin<Banner>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CopyOfBanner {
    return CopyOfBanner.init({
    Key2: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Banner',
        key: 'Key'
      }
    },
    Field: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Field2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Field3: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Field4: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Field5: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'CopyOfBanner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Key2" },
        ]
      },
    ]
  });
  }
}
