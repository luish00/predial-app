import React from 'react';
import { View } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import { MarkerProp } from '../../types';
import { PrimaryButton } from '../common/buttons/PrimaryButton';
import { Label } from '../common/grids';
import { styles } from './MyRoutesScreen.style';

interface Props extends MarkerProp {}

const MarkerItem: React.FC<Props> = ({
  buttonText,
  description,
  draggable,
  latitude,
  longitude,
  onDragEnd,
  onPressDescription,
  title,
}) => {
  const handleOnDragEnd = React.useCallback(() => {
    if (onDragEnd) {
      onDragEnd();
    }
  }, [onDragEnd]);

  const handleOnPressDescription = React.useCallback(() => {
    if (onPressDescription) {
      onPressDescription();
    }
  }, [onPressDescription]);

  const renderButton = () => {
    if (buttonText) {
      return (
        <PrimaryButton
          alignSelf="center"
          onPress={handleOnPressDescription}
          size="small"
          style={styles.markerButton}
          textFontSize={12}>
          Ver Cuenta
        </PrimaryButton>
      );
    }

    return null;
  };

  return (
    <Marker
      draggable={draggable}
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      onDragEnd={handleOnDragEnd}
      title={title}
      description={description}>
      <Callout tooltip onPress={handleOnPressDescription}>
        <View style={styles.markerDescContainer}>
          <Label fontSize={13} fontWeight="bold" style={styles.markerTitle}>
            {title}
          </Label>
          <Label fontSize={12}>{description}</Label>

          {renderButton()}
        </View>
      </Callout>
    </Marker>
  );
};

export { MarkerItem };
