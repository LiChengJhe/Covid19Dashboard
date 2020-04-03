import * as _ from 'lodash';

export function ToLocalDate(obj: Date): Date {
    const convertedDate: Date = new Date(obj.toUTCString());
    convertedDate.setMinutes(obj.getTimezoneOffset());
    return convertedDate;
}
export function GetFormattedTimeZone(): string {
    return new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1].split(' (')[0].replace(/[A-Z]+/, '');
}
export function AdjustDate(obj: any): any {
    obj = _.merge(obj, JSON.parse(JSON.stringify(obj), GetDateReviver));
    return obj;
}
export function GetDateReviver(key, value): any {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
    if (typeof value === 'string' && dateFormat.test(value)) {
        return new Date(value);
    }
    return value;
}
export function ConvertToDateUTC(date: Date): Date {
    if (date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    } else {
        return null;
    }
}
