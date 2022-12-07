import { MenuType } from './types';

export default (): MenuType => [
  {
    key: 'levels',
    i18nKey: 'MENU.ITEMS.MENULEVELS',
    collapsable: true,
    children: [
      {
        key: 'menulevel1',
        i18nKey: 'MENU.ITEMS.MENULEVEL',
        icon: 'sliders',
        claims: {
          denyIfAny: ['ReadOnly'],
        },
        children: [
          {
            key: 'sublevel1',
            i18nKey: 'MENU.ITEMS.SUBMENULEVEL',
            icon: 'sliders',
            claims: {
              denyIfAny: ['ReadOnly'],
            },
            children: [
              {
                key: 'sublevel2',
                i18nKey: 'MENU.ITEMS.SUBMENULEVEL1_1',
                icon: 'sliders',
                claims: {
                  denyIfAny: ['ReadOnly'],
                },
                children: [
                  {
                    key: 'subsublevel2',
                    i18nKey: 'MENU.ITEMS.SUBMENULEVEL1_1_1',
                    icon: 'sliders',
                    path: '/level1',
                    route: 'level1',
                    claims: {
                      denyIfAny: ['ReadOnly'],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 'google',
        i18nKey: 'MENU.ITEMS.GOOGLE',
        url: 'https://www.google.com/',
        icon: 'share',
        claims: {
          denyIfAny: ['ReadOnly'],
        },
      },
    ],
  },
];
