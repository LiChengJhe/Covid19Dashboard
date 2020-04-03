export class Tab {
    Id?: string;
    Title?: string;
    Css?: TabCss;
    IsVisible?:boolean;
}
export class TabCss {
    Head?: string;
    Body?: string;
}
export const ShowedTabCss: TabCss = {
    Head: 'nav-link active',
    Body: 'tab-pane fade show active'
}
export const HiddenTabCss: TabCss = {
    Head: 'nav-link',
    Body: 'tab-pane fade'
}
