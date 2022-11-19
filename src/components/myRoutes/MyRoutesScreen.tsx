import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, SafeAreaView, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { HomeTabNavigationProp } from '../home/homeTab';
import { AccountDetailsProp } from '../../types';

import { MarkerItem } from './MarkerItem';

import { mapStyle, styles } from './MyRoutesScreen.style';

interface LocationProps extends Geolocation.GeoPosition {
  coords: Geolocation.GeoCoordinates;
}

const MyRoutesScreen: React.FC<HomeTabNavigationProp> = ({
  accounts,
  navigation,
}) => {
  const [location, setLocation] = useState<LocationProps | boolean>(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso para usar su ubicación',
          message: '¿Permite a la aplicación acceder a su ubicación?',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );

      const permission = granted === 'granted';
      setPermissionGranted(permission);

      return permission;
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (permissionGranted && !location) {
      const result = requestLocationPermission();
      result.then(res => {
        if (res) {
          Geolocation.getCurrentPosition(
            position => setLocation(position),
            error => {
              console.log(error.code, error.message);
              setLocation(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        }
      });
    }
  }, [permissionGranted, location]);

  const onPressDescription = React.useCallback(
    (account: AccountDetailsProp) => () => {
      navigation.navigate('accountDetailsTab', { account });
    },
    [navigation],
  );

  const renderMarkers = () => {
    if (accounts.length) {
      return accounts.map((account, index) => {
        const {
          AccountNumber,
          Amount,
          FirstName,
          LastName,
          Latitud,
          Longitud,
        } = account;
        const titleText = `Cuenta ${AccountNumber}`;
        const descriptionText = `Propietario: ${FirstName} ${LastName}.\nMonto de adeudo: $${Amount || '0.00'
          }`;
        const buttonText = 'Ver cuenta';

        return (
          <MarkerItem
            key={index}
            buttonText={buttonText}
            description={descriptionText}
            draggable={false}
            latitude={Number(Latitud)}
            longitude={Number(Longitud)}
            title={titleText}
            onPressDescription={onPressDescription(account)}
          />
        );
      });
    }
  };

  const renderMapView = () => {
    if (location) {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            showsUserLocation
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            customMapStyle={mapStyle}>
            {renderMarkers()}
          </MapView>
        </View>
      );
    }

    return (
      <View style={styles.noMapStyle}>
        <Text>
          No se puede acceder al mapa en estos momentos, intente mas tarde
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>{renderMapView()}</SafeAreaView>
  );
};

export { MyRoutesScreen };
