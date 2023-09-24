import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {Box, Button, Image, Text, useTheme, VStack} from 'native-base';
import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import * as Yup from 'yup';

export default function WinnerScreen() {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();

  const theme = useTheme();

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
      <VStack marginY={4} alignItems={'center'}>
        <Text fontSize={28} lineHeight={32} bold color="#962FBF">
          E o ganhador foi...
        </Text>
      </VStack>

      <VStack
        borderWidth={1}
        borderColor={'gray.600'}
        p={4}
        minH={width}
        borderRadius={8}
        space={4}
        alignItems={'center'}
        justifyContent={'center'}>
        <Text bold fontSize={26}>
          <Ionicons name="trophy-outline" size={26} /> 1° Ganhador
        </Text>
        <Image
          alt=""
          src="https://github.com/filipeleonelbatista.png"
          w={150}
          h={150}
          borderRadius={'full'}
        />

        <Text bold fontSize={20} color="#962FBF">
          @fulano de tal
        </Text>

        <Box bgColor={'gray.300'} p={4} borderRadius={8} w={'90%'}>
          <Text textAlign={'center'}>Comentário</Text>
        </Box>
      </VStack>

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
        onPress={formik.submitForm}
        leftIcon={<Feather name="refresh-cw" size={24} color="#FFF" />}>
        Sortear novamente
      </Button>

      <Text textAlign={'center'} fontSize={18} color="black">
        Sorteio realizado em 03/06/2023 09:34:26
      </Text>
    </VStack>
  );
}
