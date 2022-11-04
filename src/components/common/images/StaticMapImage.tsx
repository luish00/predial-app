import React from 'react';
import {
  Image,
  Linking,
  TouchableHighlight,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { GOOGLE_MAP_KEY } from '../../../../env';
import { serializeForUri } from '../../../utilities/utils';

const MAPS_URL_BASE = 'https://maps.googleapis.com/maps/api/staticmap';

interface Props {
  latitude?: string | null;
  longitude?: string | null;
  style?: StyleProp<any>;
}

const styles = StyleSheet.create({
  map: {
    borderColor: '#222',
    borderWidth: 1,
    height: 250,
    width: '100%',
  },
});

const StaticMapImage: React.FC<Props> = ({ style, latitude, longitude }) => {
  const params = {
    center: `${latitude},${longitude}`,
    zoom: 16,
    size: '600x300',
    maptype: 'roadmap',
    markers: `color:red|label:S|${latitude},${longitude}`,
    key: GOOGLE_MAP_KEY,
  };

  const url = `${MAPS_URL_BASE}?${serializeForUri(params)}`;

  const onOpenMap = React.useCallback(() => {
    const navigationUri = `google.navigation:q=${latitude},${longitude}`;
    const geoUri = `geo:${latitude},${longitude}?q=${latitude},${longitude}`;

    return Linking.openURL(navigationUri).catch(() => Linking.openURL(geoUri));
  }, [latitude, longitude]);

  return (
    <TouchableHighlight onPress={onOpenMap}>
      <Image style={[styles.map, style]} source={{ uri: url }} />
    </TouchableHighlight>
  );
};

export { StaticMapImage };
