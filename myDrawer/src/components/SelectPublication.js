import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import * as Yup from 'yup';

export default function SelectPublication() {
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
      <Box
        px={4}
        py={2}
        w={150}
        h={10}
        borderRadius={'full'}
        borderWidth={2}
        borderColor={'gray.400'}
        alignItems={'center'}>
        <Text textAlign={'center'}>Passo 1 de 3</Text>
      </Box>
      <VStack space={4} alignItems={'center'} marginY={4}>
        <Text fontSize={28} lineHeight={32} bold>
          Selecione a publicação do seu sorteio
        </Text>
      </VStack>

      <FormControl isInvalid={!!formik.errors.username} w="100%">
        <Input
          placeholder="Insira o link do post"
          value={formik.values.username}
          onChangeText={text => formik.setFieldValue('username', text)}
          InputRightElement={
            <Button
              size="xs"
              rounded="none"
              w="1/6"
              h="full"
              bgColor={'#962FBF'}
              onPress={() => {}}>
              <Feather name="search" size={22} color="#FFF" />
            </Button>
          }
        />
        {!!formik.errors.username && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {formik.errors.username}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <Text textAlign={'center'} fontSize={14} marginY={8}>
        Ou selecione a postagem na galeria
      </Text>

      <HStack space={2}>
        <Box
          position="relative"
          bgColor="gray.400"
          w={120}
          h={120}
          borderRadius={16}>
          <Box
            position="absolute"
            w={110}
            h={8}
            bgColor={'black'}
            borderRadius={24}
            bottom={1}
            marginX={1}
            flexDirection={'row'}
            justifyContent={'space-evenly'}
            alignItems={'center'}>
            <Text color="white">
              <Feather name="message-circle" size={14} /> 3
            </Text>
            <Text color="white">
              <Feather name="heart" size={14} /> 2
            </Text>
          </Box>
        </Box>
        <Box
          position="relative"
          bgColor="gray.400"
          w={120}
          h={120}
          borderRadius={16}>
          <Box
            position="absolute"
            w={110}
            h={8}
            bgColor={'black'}
            borderRadius={24}
            bottom={1}
            marginX={1}
            flexDirection={'row'}
            justifyContent={'space-evenly'}
            alignItems={'center'}>
            <Text color="white">
              <Feather name="message-circle" size={14} /> 3
            </Text>
            <Text color="white">
              <Feather name="heart" size={14} /> 2
            </Text>
          </Box>
        </Box>
        <Box
          position="relative"
          bgColor="gray.400"
          w={120}
          h={120}
          borderRadius={16}>
          <Box
            position="absolute"
            w={110}
            h={8}
            bgColor={'black'}
            borderRadius={24}
            bottom={1}
            marginX={1}
            flexDirection={'row'}
            justifyContent={'space-evenly'}
            alignItems={'center'}>
            <Text color="white">
              <Feather name="message-circle" size={14} /> 3
            </Text>
            <Text color="white">
              <Feather name="heart" size={14} /> 2
            </Text>
          </Box>
        </Box>
      </HStack>
    </VStack>
  );
}
