import {View, Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import Logo from '../../assets/rentalLogo.png';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Login');
  }, 5000);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>Play Portal</Text>
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
    top: 200,
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'RedHatDisplay-BlackItalic',
    color: 'white',
    fontSize: 32,
  },
});

export default Splash;
