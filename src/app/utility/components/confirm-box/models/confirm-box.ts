import { BtnType } from 'src/app/utility/models/btn';


export class TitleProp {
    Text?: string;
    NgClass?: string[];
}

export class BtnProp {
    Mode?: BtnType;
    Callback?: () => void;
}

export class ConfirmBox {
    Message: string;
    Title: TitleProp;
    PrimaryBtn?: BtnProp;
    SecondaryBtn?: BtnProp;
  }
  