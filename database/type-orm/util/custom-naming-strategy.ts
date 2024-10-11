import { isUndefined } from "lodash";
import { DefaultNamingStrategy, Table } from "typeorm";

export class CustomNamingStrategy extends DefaultNamingStrategy {
  foreignKeyName(tableOrName: Table | string, columnNames: string[], _referencedTablePath?: string): string {
    const clonedColumnNames = [...columnNames];
    clonedColumnNames.sort();
    const tableName = this.getTableName(tableOrName);
    const referencedTableName = isUndefined(_referencedTablePath) ? tableName : _referencedTablePath;
    const key = `${tableName}_${referencedTableName}_${clonedColumnNames.join("_")}`;

    return `fk_${key}`;
  }
}
