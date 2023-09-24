import {Image, Spinner, VStack} from 'native-base';

import logo from '../assets/icon.png';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';

export default function SplashScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const timeout = setTimeout(() => {
        navigation.navigate('Onboarding');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [navigation, isFocused]);

  return (
    <VStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      bg={{
        linearGradient: {
          colors: ['#FEDA75', '#FA7E1E', '#D62976', '#962FBF', '#4F5BD5'],
          start: [0, 0],
          end: [1, 0],
        },
      }}>
      <Image alt="logo" source={logo} size={150} borderRadius="full" mb={16} />
      <Spinner size={36} color={'#FFF'} />
    </VStack>
  );
}
