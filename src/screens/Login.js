import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../assets/rentalLogo.png';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!userID || !password) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }
    axios
      .post(
        'http://192.168.181.109:3000/users/login',
        // 'http://192.168.1.2:3000/users/login',
        {
          userID,
          password,
        },
      )
      .then(res => {
        ToastAndroid.show('Login Success', ToastAndroid.SHORT);
        navigation.navigate('Home', {
          screen: 'HomeTab',
          params: {userID: userID, name: res.data.user.name},
        });
        AsyncStorage.setItem('userID', userID);
        AsyncStorage.setItem('password', password);
        AsyncStorage.setItem('name', res.data.user.name);
        console.log(userID);
        console.log(password);
        console.log(res.data.user.name);
      })
      .catch(err => {
        ToastAndroid.show('Wrong Email Or Password', ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>Play Portal</Text>
        <Text style={styles.subTitle}>Where Play Knows No Limits!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="ID"
            style={styles.fieldInput}
            placeholderTextColor={'#fff'}
            onChangeText={text => setUserID(text)}
            setUserID={setUserID}
          />
          <TextInput
            placeholder="Password"
            style={styles.fieldInput}
            placeholderTextColor={'#fff'}
            onChangeText={text => setPassword(text)}
            setPassword={setPassword}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleLogin(userID, password);
          }}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.subContainer}>
          <Text style={styles.subText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.subLink}>Register</Text>
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
    top: 30,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'RedHatDisplay-Black',
    fontSize: 50,
    textAlign: 'center',
    color: '#fff',
  },
  subTitle: {
    fontFamily: 'RedHatDisplay-Italic',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  inputContainer: {
    paddingHorizontal: 10,
    marginTop: 30,
    paddingBottom: 10,
    width: 300,
  },
  fieldInput: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontFamily: 'RedHatDisplay-SemiBold',
    color: '#fff',
    fontSize: 18,
  },
  subContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  subText: {
    fontFamily: 'RedHatDisplay-Regular',
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
    padding: 10,
    borderRadius: 10,
    margin: 40,
    width: 150,
    backgroundColor: '#092f94',
  },
  loginText: {
    fontFamily: 'RedHatDisplay-Bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
});
export default Login;
