export type MenuType = Array<MenuVoiceType>;

export type MenuVoiceType = {
  key: string;
  i18nKey: string;
  collapsable?: boolean;
  icon?: string;
  route?: string;
  path?: string;
  children?: MenuType;
  url?: `${'http' | 'https'}://${string}`;
  claims?: {
    requiresAny?: Array<string>;
    denyIfAny?: Array<string>;
  };
};
