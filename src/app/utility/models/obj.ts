import * as _ from 'lodash';


export function HasEmpty(obj: any): boolean {
  let isValid = false;
  if (obj) {
    if (_.isString(obj)) {
      if (obj.trim().length === 0) {
        isValid = true;
      }
    } else if (_.isArray(obj)) {
      for (const i of obj) {
        isValid = HasEmpty(i);
        if (isValid) {
          break;
        }
      }
    } else if (_.isObject(obj)) {
      for (const key in obj) {
        isValid = HasEmpty(obj[key]);
        if (isValid) {
          break;
        }
      }
    }
  } else {
    isValid = true;
  }
  return isValid;
}
export function HasVal(obj: any): boolean {
  let isValid = false;
  if (obj) {
    if (_.isString(obj)) {
      if (obj.trim().length > 0) {
        isValid = true;
      }
    } else if (_.isNumber(obj)) {
      isValid = true;
    } else if (_.isArray(obj)) {
      for (const i of obj) {
        isValid = HasVal(i);
        if (isValid) {
          break;
        }
      }
    } else if (_.isObject(obj)) {
      for (const key in obj) {
        isValid = HasVal(obj[key]);
        if (isValid) {
          break;
        }
      }
    }
  }
  return isValid;
}

export function FindVal(obj: any, val: string): boolean {
  let isValid = false;
  if (obj) {
    if (_.isString(obj)) {
      if (obj.includes(val)) {
        isValid = true;
      }
    } else if (_.isNumber(obj)) {
      if (obj.toString().includes(val)) {
        isValid = true;
      }
    } else if (_.isArray(obj)) {
      for (const i of obj) {
        isValid = FindVal(i, val);
        if (isValid) {
          break;
        }
      }
    } else if (_.isObject(obj)) {
      for (const key in obj) {
        isValid = FindVal(obj[key], val);
        if (isValid) {
          break;
        }
      }
    }
  }
  return isValid;
}
export class KeyVal {
  Key: any;
  Val: any;
}



