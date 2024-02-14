import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CopyOfBanner, CopyOfBannerCreationAttributes, CopyOfBannerId } from './CopyOfBanner';
import type { CopyOfBanner2, CopyOfBanner2CreationAttributes, CopyOfBanner2Id } from './CopyOfBanner2';

export interface BannerAttributes {
  Key: string;
  id: string;
  Field3?: string;
  Field4?: string;
  Field7?: string;
}

export type BannerPk = "Key";
export type BannerId = Banner[BannerPk];
export type BannerOptionalAttributes = "Field3" | "Field4" | "Field7";
export type BannerCreationAttributes = Optional<BannerAttributes, BannerOptionalAttributes>;

export class Banner extends Model<BannerAttributes, BannerCreationAttributes> implements BannerAttributes {
  Key!: string;
  id!: string;
  Field3?: string;
  Field4?: string;
  Field7?: string;

  // Banner hasOne CopyOfBanner via Key2
  CopyOfBanner!: CopyOfBanner;
  getCopyOfBanner!: Sequelize.HasOneGetAssociationMixin<CopyOfBanner>;
  setCopyOfBanner!: Sequelize.HasOneSetAssociationMixin<CopyOfBanner, CopyOfBannerId>;
  createCopyOfBanner!: Sequelize.HasOneCreateAssociationMixin<CopyOfBanner>;
  // Banner hasOne CopyOfBanner2 via Key2
  CopyOfBanner2!: CopyOfBanner2;
  getCopyOfBanner2!: Sequelize.HasOneGetAssociationMixin<CopyOfBanner2>;
  setCopyOfBanner2!: Sequelize.HasOneSetAssociationMixin<CopyOfBanner2, CopyOfBanner2Id>;
  createCopyOfBanner2!: Sequelize.HasOneCreateAssociationMixin<CopyOfBanner2>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Banner {
    return Banner.init({
    Key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Field3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Field4: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Field7: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Banner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Key" },
        ]
      },
    ]
  });
  }
}
