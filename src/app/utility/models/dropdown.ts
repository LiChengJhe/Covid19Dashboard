
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as _ from 'lodash';
export function GetDefMultiSelectSettings(params: any = {}): IDropdownSettings {
    return _.merge({
      singleSelection: false,
      idField: 'Key',
      textField: 'Val',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    }, params);
  }
