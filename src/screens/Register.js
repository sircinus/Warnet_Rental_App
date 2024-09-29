import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/rentalLogo.png';
import axios from 'axios';

const Register = () => {
  const [userID, setUserID] = useState();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleRegister = () => {
    if (!userID || !name || !password) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }
    axios
      .post(
        'http://192.168.181.109:3000/users/register',
        // 'http://192.168.1.2:3000/users/register',
        {
          userID,
          name,
          password,
        },
      )
      .then(res => {
        ToastAndroid.show('Account successfully created!', ToastAndroid.SHORT);
        navigation.navigate('Login');
      })
      .catch(err => {
        ToastAndroid.show('User already exists!', ToastAndroid.SHORT);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subTitle}>_For Owners_</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="ID"
            style={styles.fieldInput}
            placeholderTextColor={'#fff'}
            onChangeText={text => setUserID(parseInt(text, 10))}
            setUserID={setUserID}
          />
          <TextInput
            placeholder="Name"
            style={styles.fieldInput}
            placeholderTextColor={'#fff'}
            onChangeText={text => setName(text)}
            setName={setName}
          />
          <TextInput
            placeholder="Password"
            style={styles.fieldInput}
            placeholderTextColor={'#fff'}
            onChangeText={text => setPassword(text)}
            setPassword={setPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleRegister(userID, name, password);
          }}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.subContainer}>
          <Text style={styles.subText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.subLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d81b4',
  },
  titleContainer: {
    alignSelf: 'center',
    top: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
  },
  subTitle: {
    fontFamily: 'RedHatDisplay-Medium',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    marginTop: 30,
    paddingBottom: 10,
    width: 320,
  },
  fieldInput: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontFamily: 'RedHatDisplay-SemiBold',
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
  },
  subContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  subText: {
    fontFamily: 'RedHatDisplay-Medium',
    color: 'white',
    fontSize: 16,
  },
  subLink: {
    fontFamily: 'RedHatDisplay-Bold',
    color: 'blue',
    fontSize: 16,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#092f94',
    padding: 10,
    borderRadius: 10,
    margin: 40,
    width: 150,
  },
  loginText: {
    fontFamily: 'RedHatDisplay-Bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
});

export default Register;
