import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {
  Actionsheet,
  Box,
  Button,
  FormControl,
  HStack,
  IconButton,
  Image,
  Input,
  Switch,
  Text,
  useDisclose,
  useTheme,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import * as Yup from 'yup';

export default function LoadingData() {
  const {isOpen, onOpen, onClose} = useDisclose();

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
        <Text textAlign={'center'}>Passo 3 de 3</Text>
      </Box>
      <VStack marginY={4}>
        <Text fontSize={28} lineHeight={32} bold>
          Comentários Carregados
        </Text>
      </VStack>

      <HStack justifyContent={'space-between'}>
        <HStack space={4}>
          <Box bgColor="gray.400" w={12} h={12} borderRadius={4}></Box>
          <HStack space={2} alignItems={'center'}>
            <Image
              alt=""
              src="https://github.com/filipeleonelbatista.png"
              w={10}
              h={10}
              borderRadius={'full'}
            />
            <Text fontSize={16}>filipeleonelbatista</Text>
          </HStack>
        </HStack>
        <IconButton
          icon={<Feather name="settings" size={24} />}
          borderRadius={'full'}
          onPress={onOpen}
        />
      </HStack>

      <VStack space={4} marginTop={4}>
        <HStack
          bgColor={'white'}
          shadow={4}
          p={4}
          borderRadius={8}
          space={2}
          alignItems={'center'}>
          <Text>
            <Text bold fontSize={20}>
              @fulano de tal {'\n'}
            </Text>
            Sorteio gratuito e limitado Sorteio gratuito e limitado Sorteio
            gratuito e limitado
          </Text>
        </HStack>
        <HStack
          bgColor={'white'}
          shadow={4}
          p={4}
          borderRadius={8}
          space={2}
          alignItems={'center'}>
          <Text>
            <Text bold fontSize={20}>
              @fulano de tal {'\n'}
            </Text>
            Sorteio gratuito e limitado Sorteio gratuito e limitado Sorteio
            gratuito e limitado
          </Text>
        </HStack>
        <HStack
          bgColor={'white'}
          shadow={4}
          p={4}
          borderRadius={8}
          space={2}
          alignItems={'center'}>
          <Text>
            <Text bold fontSize={20}>
              @fulano de tal {'\n'}
            </Text>
            Sorteio gratuito e limitado Sorteio gratuito e limitado Sorteio
            gratuito e limitado
          </Text>
        </HStack>
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
        onPress={formik.submitForm}>
        Sortear um ganhador!
      </Button>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}>
              Configurações do sorteio
            </Text>
          </Box>
          <Box w="100%" px={4} justifyContent="center">
            <FormControl isInvalid={!!formik.errors.username} w="100%">
              <FormControl.Label>Quantidade de ganhadores:</FormControl.Label>
              <Input
                placeholder="Digite um numero"
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
            <FormControl isInvalid={!!formik.errors.username} w="100%">
              <FormControl.Label>
                Filtrar comentários por palavra-chave:
              </FormControl.Label>
              <Input
                placeholder="Digite as #hashtags"
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
            <HStack alignItems="center" space={4}>
              <Switch size="md" />
              <Text>Permitir a repetição de ganhadores</Text>
            </HStack>
            <HStack alignItems="center" space={4}>
              <Switch size="md" />
              <Text>Permitir mais de um comentário por pessoa</Text>
            </HStack>
            <HStack alignItems="center" space={4}>
              <Switch size="md" />
              <Text>Permitir comentários duplicados</Text>
            </HStack>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
}
