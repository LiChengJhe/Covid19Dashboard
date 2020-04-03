
import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';


export enum FormMode {
  Create = 'Create',
  Edit = 'Edit',
  Delete = 'Delete',
  View = 'View',
  Copy = 'Copy'
}

export function GetFormModeByUrl(url: string): FormMode {
  for (const key in FormMode) {
    if (url.toLowerCase().includes(key.toLowerCase())) {
      return key as FormMode;
    }
  }
  return null;
}

export interface IGroupForm {
  Data?: any;
  FormModeVal?: FormMode;
  GetErrorOnValidator(): string[];
  EnableAllFields(): void;
  DisableAllFields(): void;
  DisableFieldsForEditMode(): void;
  DefaultDisabledFields(): void;
  GetData(): any;
  Submit(): void;
  IsValid(): boolean;
}
export interface IForm {
  Data?: any;
  FormModeVal?: FormMode;
  Form?: FormGroup;
  FormIsSubmitted?: boolean;
  SetFormModel(mode: FormMode): void;
  EnableAllFields(): void;
  DisableAllFields(): void;
  DisableFieldsForEditMode(): void;
  DefaultDisabledFields(): void;
  GetData(): any;
  SetForm(data: any): void;
  Submit(): void;
  IsValid(): boolean;
}
