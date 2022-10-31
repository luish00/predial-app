import React from 'react';
import colors from '../colors';

export const NoTitleHeader = { header: () => <></> };

export const TabTopScreenStyleOption = {
  tabBarActiveTintColor: '#fff',
  tabBarContentContainerStyle: {
    backgroundColor: colors.primaryLigth,
    marginBottom: 2,
  },
  tabBarIndicatorStyle: { backgroundColor: colors.secondaryDark },
};
