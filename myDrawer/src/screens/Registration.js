import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {
  Actionsheet,
  Button,
  CheckIcon,
  Checkbox,
  FormControl,
  Image,
  Input,
  KeyboardAvoidingView,
  Link,
  ScrollView,
  Select,
  Text,
  VStack,
  WarningOutlineIcon,
  useDisclose,
  useTheme,
} from 'native-base';
import {useMemo, useState} from 'react';
import {Linking, ToastAndroid, useWindowDimensions} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Yup from 'yup';
import LogoImage from '../assets/icon.png';
import {api, createAssinante} from '../services/api';

export default function Registration() {
  const theme = useTheme();
  const {isOpen, onOpen, onClose} = useDisclose();

  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [qrCode, setQrCode] = useState('abv');

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      username: Yup.string().required(
        'O campo Usuário do instagram é obrigatório',
      ),
      whatsapp: Yup.string().required('O campo WhatsApp é obrigatório'),
      email: Yup.string()
        .email('Precisa ser um email válido')
        .required('Email é obrigatório!')
        .label('Email'),
      password: Yup.string()
        .min(8, 'A Senha precisa ter pelo menos 8 caracteres')
        .max(16, 'A Senha precisa ter menos de 16 caracteres')
        .required('Senha é obrigatório!'),
      confirm_password: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'As senhas devem ser iguais',
      ),
      plan: Yup.string()
        .required('Selecionar plano é obrigatório!')
        .label('Plano'),
      accept_terms: Yup.boolean()
        .oneOf([true], 'É necessário aceitar os termos e condições!')
        .required(),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      whatsapp: '',
      email: '',
      password: '',
      confirm_password: '',
      plan: '',
      accept_terms: false,
    },
    validationSchema: formSchema,
    onSubmit: values => {
      handleSubmitForm(values);
    },
  });

  async function handleSubmitForm(formValues) {
    try {
      const data = {
        username: formValues.username,
        whatsapp: formValues.whatsapp,
        email: formValues.email,
        senha: formValues.password,
        selected_plan: formValues.plan,
        request_access_date: new Date(Date.now()).toISOString(),
        payment_date: null,
        is_active: false,
      };

      const {
        username,
        whatsapp,
        email,
        senha,
        selected_plan,
        request_access_date,
        payment_date,
        is_active,
      } = data;
      const mutationcreateAssinante = createAssinante(
        username,
        whatsapp,
        email,
        senha,
        request_access_date,
        selected_plan,
        is_active,
        payment_date,
      );
      await api.post('', mutationcreateAssinante);

      if (formValues.plan === '1') {
        setQrCode(
          '00020126580014BR.GOV.BCB.PIX0136f1bfe5be-67eb-42ad-8928-f71e02e1c99b520400005303986540510.005802BR5924Filipe de Leonel Batista6009SAO PAULO61080540900062160512NUbJF4xOYcz56304C81C',
        );
      } else if (formValues.plan === '6') {
        setQrCode(
          '00020126580014BR.GOV.BCB.PIX0136f1bfe5be-67eb-42ad-8928-f71e02e1c99b520400005303986540550.005802BR5924Filipe de Leonel Batista6009SAO PAULO61080540900062070503***63041DE2',
        );
      } else if (formValues.plan === '12') {
        setQrCode(
          '00020126580014BR.GOV.BCB.PIX0136f1bfe5be-67eb-42ad-8928-f71e02e1c99b5204000053039865406100.005802BR5924Filipe de Leonel Batista6009SAO PAULO61080540900062070503***630469E3',
        );
      }

      onOpen();
    } catch (err) {
      console.log('ERROR DURING AXIOS REQUEST', err);
    }
  }

  const copyToClipboard = async () => {
    // await Clipboard.setStringAsync(qrCode);
  };

  const requestLiberation = async () => {
    ToastAndroid.show('Encaminhando para o nosso WhatsApp', ToastAndroid.SHORT);
    const text = encodeURI(
      `Olá sou *${
        formik.values.username
      }*, e gostaria de informar o pagamento do Insta Sorteio para o email *${
        formik.values.email
      }* com o plano *${
        formik.values.plan === '1'
          ? 'Mensal R$ 10,00'
          : formik.values.plan === '6'
          ? 'Semestral de R$ 60,00 por R$ 50,00'
          : formik.values.plan === '12'
          ? 'Anual de R$ 120,00 por R$ 100,00'
          : ''
      }*`,
    );
    Linking.openURL(`whatsapp://send?text=${text}&phone=+5551992736445`);
  };

  return (
    <VStack width={'100%'} height="100%" bgColor="gray.50">
      <KeyboardAvoidingView behavior={'height'}>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <VStack w={'100%'} p={4} space={4} alignItems={'center'}>
              <VStack space={2} alignItems={'center'}>
                <Text fontSize={24} lineHeight={24} bold textAlign={'center'}>
                  Faça seu pagamento!
                </Text>
                <Text color={'gray.600'} fontSize={16} textAlign={'center'}>
                  Efetue o pagamento e solicite a liberação do acesso ao app
                </Text>
              </VStack>

              <QRCode value={qrCode} size={width * 0.5} />

              <Button
                w={'full'}
                bgColor={'#962FBF'}
                _pressed={{
                  bgColor: 'purple.900',
                }}
                _text={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
                leftIcon={<Feather name="clipboard" size={24} color="#FFF" />}
                onPress={copyToClipboard}>
                Copiar Pix QrCode
              </Button>

              <Button
                size={'lg'}
                w={'full'}
                borderWidth={2}
                borderColor={'#962FBF'}
                borderRadius={8}
                _pressed={{bg: '#962FBFcc'}}
                bgColor={'gray.50'}
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
          </Actionsheet.Content>
        </Actionsheet>
        <ScrollView w={width}>
          <VStack width={'100%'} alignItems={'center'} px={4}>
            <Button
              position="absolute"
              top={4}
              left={4}
              onPress={() => navigation.navigate('Home')}
              bgColor="gray.50"
              _pressed={{
                bgColor: 'gray.200',
              }}
              _text={{
                color: 'gray.600',
              }}
              leftIcon={
                <Feather
                  name="chevron-left"
                  size={16}
                  color={theme.colors.gray[600]}
                />
              }>
              Voltar
            </Button>
            <Image source={LogoImage} alt="logo" size={90} mt={8} />

            <VStack space={4} alignItems={'center'} marginY={4}>
              <Text fontSize={28} lineHeight={32} bold textAlign={'center'}>
                Faça seu sorteio no instagram agora mesmo!
              </Text>
              <Text color={'gray.600'} fontSize={18} textAlign={'center'}>
                Preencha os campos a baixo para se cadastrar e realizar sorteios
                no seu instagram
              </Text>
            </VStack>
            <FormControl isInvalid={!!formik.errors.username} w="100%">
              <FormControl.Label>Usuário do instagram</FormControl.Label>
              <Input
                placeholder="Usuário do instagram"
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

            <FormControl isInvalid={!!formik.errors.email} w="100%">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Digite o seu melhor email..."
                value={formik.values.email}
                onChangeText={text => formik.setFieldValue('email', text)}
              />
              {!!formik.errors.email && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {formik.errors.email}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!formik.errors.whatsapp} w="100%">
              <FormControl.Label>WhatsApp</FormControl.Label>
              <Input
                placeholder="Digite o seu WhatsApp..."
                value={formik.values.whatsapp}
                onChangeText={text => formik.setFieldValue('whatsapp', text)}
              />
              {!!formik.errors.whatsapp && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {formik.errors.whatsapp}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!formik.errors.whatsapp} w="100%">
              <FormControl.Label>Selecione um plano</FormControl.Label>
              <Select
                selectedValue={formik.values.plan}
                accessibilityLabel="Selecione um plano"
                placeholder="Selecione um plano"
                w={'full'}
                _selectedItem={{
                  bg: 'purple.600',
                  startIcon: <CheckIcon size="6" color="white" />,
                  _text: {
                    color: 'white',
                    fontWeight: 'bold',
                  },
                }}
                mt={1}
                onValueChange={itemValue =>
                  formik.setFieldValue('plan', itemValue)
                }>
                <Select.Item label="Mensal" value="1" />
                <Select.Item label="Semestral" value="6" />
                <Select.Item label="Anual" value="12" />
              </Select>

              {!!formik.errors.plan && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {formik.errors.plan}
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
            <FormControl isInvalid={!!formik.errors.confirm_password} w="100%">
              <FormControl.Label>Confirmar senha</FormControl.Label>
              <Input
                placeholder="******"
                value={formik.values.confirm_password}
                onChangeText={text =>
                  formik.setFieldValue('confirm_password', text)
                }
                type={showConfirm ? 'text' : 'password'}
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
                    onPress={() => setShowConfirm(!showConfirm)}>
                    <Feather
                      name={showConfirm ? 'eye-off' : 'eye'}
                      size={22}
                      color="#FFF"
                    />
                  </Button>
                }
              />
              {!!formik.errors.confirm_password && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {formik.errors.confirm_password}
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            <FormControl
              isInvalid={!!formik.errors.accept_terms}
              w="100%"
              my={4}>
              <Checkbox
                colorScheme="purple"
                isInvalid={!!formik.errors.accept_terms}
                onChange={isSelected =>
                  formik.setFieldValue('accept_terms', isSelected)
                }>
                Aceito os
                <Link
                  _text={{
                    color: 'purple.600',
                    fontSize: 16,
                    textDecoration: 'none',
                  }}
                  href="https://filipeleonelbatista.vercel.app/politicas-de-privacidade">
                  Termos de uso
                </Link>
                do app
              </Checkbox>
              {!!formik.errors.accept_terms && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {formik.errors.accept_terms}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <Text textAlign={'center'} my={4} fontSize={12}>
              Usamos estes dados apenas para o pagamento e login da plataforma.{' '}
              {'\n'} Não enviaremos comunicações, é nossa promessa!
            </Text>
            <Button
              marginY={4}
              size={'lg'}
              w={'full'}
              bgColor={'#962FBF'}
              _pressed={{
                bgColor: 'purple.900',
              }}
              _text={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}
              rightIcon={<Feather name="arrow-right" size={24} color="#FFF" />}
              onPress={formik.submitForm}>
              Fazer o pagamento
            </Button>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  );
}
