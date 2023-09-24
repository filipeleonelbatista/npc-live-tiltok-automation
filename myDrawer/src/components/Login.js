import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {
  Button,
  FormControl,
  Input,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import * as Yup from 'yup';

export default function Login() {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      username: Yup.string().required(
        'O campo Usuário do instagram é obrigatório',
      ),
      email: Yup.string().required('O campo Email é obrigatório'),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
    },
    validationSchema: formSchema,
    onSubmit: values => {
      handleSubmitForm(values);
    },
  });

  async function handleSubmitForm(formValues) {
    const data = {
      username: formValues.username,
      email: formValues.email,
    };

    console.log(data);

    navigation.navigate('Home');
  }

  return (
    <VStack w={width} p={4}>
      <VStack space={4} alignItems={'center'} marginY={4}>
        <Text fontSize={28} lineHeight={32} bold textAlign={'center'}>
          Faça seu sorteio no instagram agora mesmo!
        </Text>

        <Text color={'gray.600'} fontSize={18} textAlign={'center'}>
          Preencha os campos a baixo ou conecte-se com o Facebook para
          localizarmos seu perfil
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
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
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
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {formik.errors.email}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <Button
        marginY={4}
        size={'lg'}
        _pressed={{bg: 'gray.900'}}
        bgColor={'#962FBF'}
        _text={{
          color: 'white',
          fontSize: 18,
          fontWeight: 'bold',
        }}
        rightIcon={<Feather name="arrow-right" size={24} color="#FFF" />}
        onPress={formik.submitForm}>
        Continuar
      </Button>

      <Text textAlign={'center'} fontSize={14}>
        Ou
      </Text>

      <Button
        marginY={4}
        size={'lg'}
        borderWidth={2}
        borderColor={'#4267b2'}
        borderRadius={8}
        _pressed={{bg: '#4267b2cc'}}
        bgColor={'transparent'}
        _text={{
          color: '#4267b2',
          fontSize: 18,
          fontWeight: 'bold',
        }}
        leftIcon={
          <FontAwesome name="facebook-official" size={24} color="#4267b2" />
        }
        onPress={() => {}}>
        Continuar com o Facebook
      </Button>
    </VStack>
  );
}
