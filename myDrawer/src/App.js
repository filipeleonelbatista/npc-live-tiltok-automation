/* eslint-disable react-native/no-inline-styles */
import {NativeBaseProvider, StatusBar} from 'native-base';
import React from 'react';
import {NativeModules, Platform, useWindowDimensions} from 'react-native';
import 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContextProvider} from './context/AuthContext';
import Router from './Router';

export default function App() {
  const {width} = useWindowDimensions();
  return (
    <AuthContextProvider>
      <NativeBaseProvider
        config={{
          dependencies: {
            'linear-gradient': LinearGradient,
          },
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            height:
              Platform.OS === 'ios'
                ? 20
                : NativeModules.StatusBarManager.HEIGHT,
            width: width,
          }}
          colors={['#FEDA75', '#FA7E1E', '#D62976', '#962FBF', '#4F5BD5']}>
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'light-content'}
          />
          {/* <StatusBar backgroundColor={'#962FBF'} barStyle={'light-content'} /> */}
        </LinearGradient>
        <Router />
      </NativeBaseProvider>
    </AuthContextProvider>
  );
}
