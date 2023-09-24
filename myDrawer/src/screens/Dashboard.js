import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {
  Avatar,
  Button,
  HStack,
  IconButton,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {useWindowDimensions} from 'react-native';
import EmptyMessage from '../components/EmptyMessage';
import {useAuth} from '../hooks/useAuth';
import {add, differenceInCalendarDays} from 'date-fns';

export default function Dashboard() {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const {user} = useAuth();

  console.log('user', user);

  return (
    <VStack width={'100%'} height="100%" bgColor="gray.50">
      <KeyboardAvoidingView behavior={'height'}>
        <VStack width={'100%'} height={'100%'} position={'relative'}>
          <HStack
            width={'100%'}
            bgColor="black"
            alignItems="center"
            justifyContent={'space-between'}
            bg={{
              linearGradient: {
                colors: ['#FEDA75', '#FA7E1E', '#D62976', '#962FBF', '#4F5BD5'],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            paddingHorizontal={24}
            paddingVertical={18}
            space={4}>
            <HStack space={4} alignItems="center">
              <Avatar bg="white" size="lg">
                <Feather name="user" size={38} color={'#000'} />
              </Avatar>
              <VStack>
                <Text fontSize={18} bold color="white">
                  Olá {user.username} 👋
                </Text>
                <Text fontSize={16} color="white">
                  O que vamos sortear hoje?
                </Text>
              </VStack>
            </HStack>
            <IconButton
              icon={<Feather name="log-out" size={20} color="#FFF" />}
              size={'md'}
              _pressed={{bg: 'purple.800'}}
              borderRadius={'full'}
              onPress={() => navigation.navigate('Home')}
            />
          </HStack>

          {differenceInCalendarDays(
            add(new Date(user?.paymentDate), {months: user?.selectedPlan}),
            Date.now(),
          ) < 8 && (
            <HStack
              width={'100%'}
              bgColor="black"
              alignItems="center"
              justifyContent={'center'}
              bg={{
                linearGradient: {
                  colors: [
                    '#FEDA75',
                    '#FA7E1E',
                    '#D62976',
                    '#962FBF',
                    '#4F5BD5',
                  ],
                  start: [0, 0],
                  end: [1, 0],
                },
              }}
              paddingVertical={4}>
              <Text fontSize={18} bold color="white" textAlign={'center'}>
                Seu plano termina em{' '}
                {differenceInCalendarDays(
                  add(new Date(user?.paymentDate), {
                    months: user?.selectedPlan,
                  }),
                  Date.now(),
                )}{' '}
                dias
              </Text>
            </HStack>
          )}

          <ScrollView paddingHorizontal={16} paddingVertical={16}>
            <EmptyMessage />
          </ScrollView>
          <Button
            position={'absolute'}
            bottom={4}
            right={4}
            bgColor={'purple.600'}
            width={16}
            height={16}
            borderRadius={'full'}
            shadow={6}
            _pressed={{bg: 'purple.900'}}
            onPress={() => navigation.navigate('CreateGiveAway')}>
            <Feather name="plus" size={28} color="#FFF" />
          </Button>
        </VStack>
      </KeyboardAvoidingView>
    </VStack>
  );
}
