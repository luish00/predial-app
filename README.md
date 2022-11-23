# OIDEM android app

## setup
jdk11

## Colors:
[Material color](https://m2.material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=303F9F&secondary.color=00796B)

## Icons
use 
[Google icon](https://fonts.google.com/icons?selected=Material+Icons&icon.platform=android)
drawable-mdpi 24 x1
drawable-xhdpi 24 x2
drawable-xxhdpi 24 x3

## Toast
[react-native-toast-message](https://github.com/calintamas/react-native-toast-message/blob/main/docs/api.md)

```js
import Toast from 'react-native-toast-message'

Toast.show({
  type: 'info',
  text1: 'This is an info message'
});

// type: Toast type. Default available values: success, error, info
```

## Lottie animation
[Lottie animation free](https://lottiefiles.com/featured)
[lottie-react-native](https://github.com/lottie-react-native/lottie-react-native)

```js
import AnimatedLottieView from 'lottie-react-native';

 <AnimatedLottieView
    source={loadingAnimation}
    autoPlay
    loop
    hardwareAccelerationAndroid
    style={styles.modalLoadingLottie}
  />

// source src/assets/lottie
```

the project directory, you can run:
> ### `yarn start`

Run react native server
> ### `yarn android`

Clean proyect
> ### `yarn clean`

# Login
test@test.com
37CQyaCKSZ