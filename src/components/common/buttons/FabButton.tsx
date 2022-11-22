import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import colors from '../../../colors';
import { Label } from '../grids';

interface Props {
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: colors.secondary,
    borderRadius: 45,
    elevation: 5,
    height: 80,
    justifyContent: 'center',
    margin: 16,
    shadowColor: '#222',
    width: 80,
  },
  containerAbsolute: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export const FabButton: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.containerAbsolute}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.container}>
          <Label fontSize={40} color="#fff">
            +
          </Label>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
