import { CommonConst } from "src/commonLib/constants/common";

export const navigation = [
  {
    text: 'Analytics',
    icon: 'chart',
    path: '',
    items: [
      {
        text: 'Dashboard',
        path: CommonConst.DASHBOARD,
      },
      {
        value: 'file',
        text: 'file',
        path: CommonConst.FILE_LIST,
      },
      {
        value: 'member',
        text: 'Member',
        path: CommonConst.MEMBER,
      },
    ],
  },
  {
    text: 'Common',
    icon: 'box',
    path: '',
    items: [
      {
        value: 'profile',
        text: 'User Profile',
        path: CommonConst.PROFILE,
      },

    ]
  }
];
