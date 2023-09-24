import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {add, differenceInCalendarDays} from 'date-fns';
import {useFormik} from 'formik';
import {
  Button,
  Checkbox,
  FormControl,
  HStack,
  Image,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {useEffect, useMemo, useState} from 'react';
import {ToastAndroid, useWindowDimensions} from 'react-native';
import * as Yup from 'yup';
import LogoImage from '../assets/icon.png';
import {useAuth} from '../hooks/useAuth';
import {api, login} from '../services/api';

export default function Home() {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const {setUser} = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      username: Yup.string().required(
        'O campo Usuário do instagram é obrigatório',
      ),
      password: Yup.string().required('O campo Senha é obrigatório'),
      remember: Yup.boolean(),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: false,
    },
    validationSchema: formSchema,
    onSubmit: values => {
      handleSubmitForm(values);
    },
  });

  async function handleSubmitForm(formValues) {
    try {
      setIsLoading(true);
      const data = {
        username: formValues.username,
        password: formValues.password,
      };

      const currentLogin = login(data.username);

      const response = await api.post('', currentLogin);

      if (response.data.data.assinantes.length === 0) {
        ToastAndroid.show(
          'Usuário ou senha não encontrados!',
          ToastAndroid.SHORT,
        );
        setIsLoading(false);
      } else {
        if (response.data.data.assinantes[0].senha === formValues.password) {
          if (
            differenceInCalendarDays(
              add(new Date(response.data.data.assinantes[0].paymentDate), {
                months: response.data.data.assinantes[0].selectedPlan,
              }),
              Date.now(),
            ) < 1
          ) {
            ToastAndroid.show(
              'Seu plano terminou. adiquira uma nova licença e continue usando o aplicativo!',
              ToastAndroid.SHORT,
            );
            setIsLoading(false);
          } else {
            if (response.data.data.assinantes[0].isActive) {
              await AsyncStorage.setItem(
                '@remember',
                JSON.stringify(formValues.remember),
              );
              await AsyncStorage.setItem(
                '@user-info',
                JSON.stringify(response.data.data.assinantes[0]),
              );
              setUser(response.data.data.assinantes[0]);
              setIsLoading(false);
              navigation.navigate('Dashboard');
            } else {
              ToastAndroid.show(
                'Seu cadastro não esta ativo ainda!',
                ToastAndroid.SHORT,
              );
              setIsLoading(false);
            }
          }
        } else {
          ToastAndroid.show(
            'Usuário ou senha não encontrados!',
            ToastAndroid.SHORT,
          );
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.log('ERROR DURING AXIOS REQUEST', err, err.request);
      setIsLoading(false);
      ToastAndroid.show(
        'Houve um problema ao procurar o usuário, tente mais tarde!',
        ToastAndroid.SHORT,
      );
    }
  }

  const requestLiberation = async () => {
    ToastAndroid.show('Encaminhando para o nosso WhatsApp', ToastAndroid.SHORT);
    const text = encodeURI(
      `Olá, e gostaria de informar o pagamento do Insta Sorteio`,
    );
    Linking.openURL(`whatsapp://send?text=${text}&phone=+5551992736445`);
    onClose();
    navigation.navigate('Home');
  };

  useEffect(() => {
    (async () => {
      const userInfo = await AsyncStorage.getItem('@user-info');
      const rememberInfo = await AsyncStorage.getItem('@remember');
      if (userInfo !== null) {
        if (rememberInfo !== null) {
          const rememberStatus = rememberInfo;
          if (rememberInfo === 'true') {
            const user = JSON.parse(userInfo);
            handleSubmitForm({
              username: user.username,
              senha: user.senha,
              remember: true,
            });
          }
        }
      }
    })();
  }, []);

  return (
    <VStack width={'100%'} height="100%" bgColor={'gray.50'}>
      <KeyboardAvoidingView behavior={'height'}>
        <ScrollView w={width}>
          <VStack width={'100%'} alignItems={'center'} px={4}>
            <Image source={LogoImage} alt="logo" size={70} mt={8} />

            <VStack space={4} alignItems={'center'} marginY={4}>
              <Text fontSize={24} lineHeight={24} bold textAlign={'center'}>
                Faça seu sorteio no instagram agora mesmo!
              </Text>

              <Text color={'gray.600'} fontSize={16} textAlign={'center'}>
                Preencha os campos a baixo para entrar ou complete o formulário
                para se cadastrar
              </Text>
            </VStack>
            <FormControl isInvalid={!!formik.errors.username} w="100%">
              <FormControl.Label>@usuário do instagram</FormControl.Label>
              <Input
                placeholder="@usuário do instagram"
                value={formik.values.username}
                onChangeText={text => formik.setFieldValue('username', text)}
              />
              {!!formik.errors.username && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {formik.errors.username}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!formik.errors.password} w="100%">
              <FormControl.Label>Senha</FormControl.Label>
              <Input
                placeholder="******"
                value={formik.values.password}
                onChangeText={text => formik.setFieldValue('password', text)}
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Button
                    size="xs"
                    rounded="none"
                    w="1/6"
                    h="full"
                    bgColor={'#962FBF'}
                    _pressed={{
                      bgColor: 'purple.900',
                    }}
                    onPress={() => setShow(!show)}>
                    <Feather
                      name={show ? 'eye-off' : 'eye'}
                      size={22}
                      color="#FFF"
                    />
                  </Button>
                }
              />
              {!!formik.errors.password && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {formik.errors.password}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            <FormControl
              isInvalid={!!formik.errors.remember}
              w="100%"
              my={4}
              ml={2}>
              <Checkbox
                colorScheme="purple"
                value={formik.values.remember}
                isInvalid={!!formik.errors.remember}
                onChange={isSelected =>
                  formik.setFieldValue('remember', isSelected)
                }>
                Manter conectado
              </Checkbox>
            </FormControl>

            <HStack space={2} w={'100%'}>
              <Button
                size={'lg'}
                w={'49%'}
                borderWidth={2}
                borderColor={'#962FBF'}
                borderRadius={8}
                _pressed={{bg: '#962FBFcc'}}
                bgColor={'transparent'}
                _text={{
                  color: '#962FBF',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                leftIcon={
                  <FontAwesome name="instagram" size={24} color="#962FBF" />
                }
                onPress={() => navigation.navigate('Registration')}>
                Cadastre-se!
              </Button>

              <Button
                size={'lg'}
                w={'49%'}
                _pressed={{bg: 'gray.900'}}
                bgColor={'#962FBF'}
                _text={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                _pressed={{
                  bgColor: 'purple.900',
                }}
                rightIcon={
                  <Feather name="arrow-right" size={24} color="#FFF" />
                }
                onPress={formik.submitForm}
                isLoading={isLoading}
                spinnerPlacement="end"
                isLoadingText="Entrando...">
                Entrar
              </Button>
            </HStack>

            <Text textAlign={'center'} fontSize={14} my={4}>
              Ja fez o pagamento e esta aguardando?
            </Text>

            <Button
              size={'lg'}
              w={'full'}
              mb={8}
              _pressed={{bg: '#962FBFcc'}}
              bgColor={'transparent'}
              _text={{
                color: '#962FBF',
                fontSize: 18,
                fontWeight: 'bold',
              }}
              leftIcon={
                <FontAwesome name="whatsapp" size={24} color="#962FBF" />
              }
              onPress={requestLiberation}>
              Solicitar liberação do app!
            </Button>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  );
}
