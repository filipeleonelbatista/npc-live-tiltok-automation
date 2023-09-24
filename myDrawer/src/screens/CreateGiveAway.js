import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Button, FlatList, HStack, VStack} from 'native-base';
import {useWindowDimensions} from 'react-native';
import ConfirmPublication from '../components/ConfirmPublication';
import LoadingData from '../components/LoadingData';
import Login from '../components/Login';
import SelectPublication from '../components/SelectPublication';
import WinnerScreen from '../components/WinnerScreen';

export default function CreateGiveAway() {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const steps = [
    {id: 1, component: <Login />},
    {id: 2, component: <SelectPublication />},
    {id: 3, component: <ConfirmPublication />},
    {id: 4, component: <LoadingData />},
    {id: 5, component: <WinnerScreen />},
  ];
  return (
    <VStack width={'100%'} height="100%" bgColor="gray.50">
      <VStack width={'100%'} height={height} position={'relative'}>
        <HStack
          width={'100%'}
          minH={16}
          bg={{
            linearGradient: {
              colors: ['#FEDA75', '#FA7E1E', '#D62976', '#962FBF', '#4F5BD5'],
              start: [0, 0],
              end: [1, 0],
            },
          }}
          alignItems="center"
          paddingHorizontal={8}
          paddingVertical={8}
          space={4}>
          <Button
            onPress={() => navigation.navigate('Dashboard')}
            variant={'unstyled'}
            _pressed={{bg: '#FFFFFF33'}}
            _text={{
              color: 'white',
              fontSize: 16,
            }}
            leftIcon={<Feather name="chevron-left" size={28} color="#FFF" />}>
            Criar um sorteio
          </Button>
        </HStack>

        <FlatList
          horizontal
          pagingEnabled
          style={{
            flex: 1,
            height: '100%',
          }}
          data={steps}
          keyExtractor={item => item.id}
          renderItem={({item}) => item.component}
        />
      </VStack>
    </VStack>
  );
}
