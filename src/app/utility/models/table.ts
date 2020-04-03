import * as _ from 'lodash';
import { FindVal } from './obj';


export enum TableMode {
    List = 'List',
    Report = 'Report',
    History = 'History',
    Control = 'Control'
}
export function GetTableModeByUrl(url: string): TableMode {
    for (const key in TableMode) {
        if (url.toLowerCase().includes(key.toLowerCase())) {
            return key as TableMode;
        }
    }
    return null;
}

export function FilterTable<T>(table: T[], val: string): T[] {
    if (val) {
        return _.filter(table as any, o => FindVal(o, val));
    } else {
        return table;
    }
}

export interface TableCol {
    Field: string;
    Group?: string;
    Header: string;
    Width?: string;
}
