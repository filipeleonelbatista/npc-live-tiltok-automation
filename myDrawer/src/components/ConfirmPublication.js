import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
  WarningOutlineIcon,
  useTheme,
} from 'native-base';
import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import * as Yup from 'yup';

export default function ConfirmPublication() {
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
      <Box
        px={4}
        py={2}
        w={150}
        h={10}
        borderRadius={'full'}
        borderWidth={2}
        borderColor={'gray.400'}
        alignItems={'center'}>
        <Text textAlign={'center'}>Passo 2 de 3</Text>
      </Box>
      <VStack marginY={4}>
        <Text fontSize={28} lineHeight={32} bold>
          Confirme sua publicação
        </Text>
      </VStack>

      <HStack space={4}>
        <Box bgColor="gray.400" w={120} h={120} borderRadius={8}></Box>
        <VStack space={2}>
          <HStack space={2} alignItems={'center'}>
            <Image
              alt=""
              src="https://github.com/filipeleonelbatista.png"
              w={10}
              h={10}
              borderRadius={'full'}
            />
            <Text fontSize={18}>filipeleonelbatista</Text>
          </HStack>

          <HStack space={2} alignItems={'center'}>
            <Box
              bgColor="blue.400"
              w={10}
              h={10}
              borderRadius={4}
              alignItems={'center'}
              justifyContent={'center'}>
              <Feather
                name="message-circle"
                size={28}
                color={theme.colors.blue[800]}
              />
            </Box>
            <VStack>
              <Text fontSize={12}>Número de comentários</Text>
              <Text fontSize={20} bold>
                1
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>

      {/* Se conectou via facebook aparece um botão antes */}

      <VStack space={4} marginTop={8}>
        <Pressable>
          <HStack
            bgColor={'white'}
            shadow={4}
            borderWidth={3}
            borderColor={'blue.500'}
            p={2}
            borderRadius={8}
            space={2}
            alignItems={'center'}>
            <Feather name="check-circle" size={24} color="green" />
            <VStack maxW={230}>
              <Text bold fontSize={20}>
                1 Sorteio gratuito e limitado
              </Text>
              <Text>Sorteio gratuito e limitado</Text>
              <Text>
                até <Text bold>750</Text> comentários.
              </Text>
            </VStack>
            <VStack w={'35%'}>
              <Text textAlign={'right'} bold color="green.600" fontSize={26}>
                R$ 0,00
              </Text>
            </VStack>
          </HStack>
        </Pressable>
      </VStack>
      <Text textAlign={'center'} fontSize={14} marginY={8}>
        Ou selecione um plano para continuar
      </Text>
      <VStack space={4}>
        <Pressable>
          <HStack
            bgColor={'white'}
            shadow={4}
            p={2}
            borderRadius={8}
            space={2}
            alignItems={'center'}>
            <Feather name="check-circle" size={24} color="green" />
            <VStack maxW={200}>
              <Text bold fontSize={20}>
                1 Sorteio Anual limitado
              </Text>
              <Text>Quantos sorteios você quiser</Text>
              <Text>
                até <Text bold>1 Mil</Text> comentários.
              </Text>
            </VStack>
            <VStack w={'35%'}>
              <Text textAlign={'right'}>de R$ 450,00 por</Text>
              <Text textAlign={'right'} bold color="green.600" fontSize={24}>
                R$ 250,00
              </Text>
            </VStack>
          </HStack>
        </Pressable>
      </VStack>
    </VStack>
  );
}
