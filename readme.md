# Expo Ejected App

As Bluetooth is currently not supported in Expo. https://expo.canny.io/feature-requests/p/bluetooth-api

This app has been ejected and some setup in iOS and Android development is required.

More detailed information can be found here:

https://blog.expo.io/so-you-want-to-build-a-bluetooth-app-with-react-native-and-expo-6ea6a31a151d

# Bluetooth LE library

The app uses https://github.com/Polidea/react-native-ble-plx library

Together with https://www.npmjs.com/package/advlib for packed decoding.

More information on the API docs for BLE library can be found here: https://polidea.github.io/react-native-ble-plx/

# Location Services

Location services is required to be allowed in the device for bluetooth library to work.

https://github.com/Polidea/react-native-ble-plx/issues/248#issuecomment-379592338

## Android

To run the app on Android, Android Studio is required.

You will also have to add the following environment variable.

```
export ANDROID_SDK_ROOT=/Users/jericopingul/Library/Android/sdk
```

It's best to add it to the end of your `.zshrc` file.

```
/Users/<your-user-name>/Library/Android/sdk/
```

To install and launch your app on the device

```bash
react-native run-android
```

To see devices available

```bash
./adb devices
```

To connect device to dev server running on your development machine. Method using adb reverse.

```bash
./adb -s <device name> reverse tcp:8081 tcp:8081
```

## iOS

For iOS, Xcode is required.

### Further instructions to follow

https://reactnative.dev/docs/running-on-device

## Troubleshooting

### If there is another app with same packages installed

```bash
./adb uninstall <com.packagename.appname>
```

### If the development port is being used

Check what is listening to port

```bash
lsof -nP -iTCP:8081 | grep LISTEN
```

If safe to proceed kill process

```bash
kill -9 <PID>
# kill -9 60401
```

### iOS simulator has error for svg

Currently in the iOS, SVGs throw an error when adding to the app.
