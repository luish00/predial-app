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
  direction?: string;
  latitude?: string | null | number;
  longitude?: string | null | number;
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

const StaticMapImage: React.FC<Props> = ({
  direction,
  latitude,
  longitude,
  style,
}) => {
  const directionEncode = direction?.toLocaleLowerCase().split(' ').join('+');
  const center = latitude
    ? `${latitude},${longitude}`
    : `Mazatlan, ${directionEncode}`;
  const latLong = latitude ? `|${latitude},${longitude}` : '';
  const params = {
    center,
    zoom: 16,
    size: '600x300',
    maptype: 'roadmap',
    markers: `color:red|label:S|Mazatlan, ${directionEncode}`,
    key: GOOGLE_MAP_KEY,
  };

  const url = `${MAPS_URL_BASE}?${serializeForUri(params)}`;

  console.log('url', url);

  const onOpenMap = React.useCallback(() => {
    const navigationUri = `google.navigation:q=${center}`;
    const geoUri = `geo:${latitude},${longitude}?q=${center}`;

    return Linking.openURL(navigationUri).catch(() => Linking.openURL(geoUri));
  }, [center, latitude, longitude]);

  return (
    <TouchableHighlight onPress={onOpenMap}>
      <Image style={[styles.map, style]} source={{ uri: url }} />
    </TouchableHighlight>
  );
};

export { StaticMapImage };
