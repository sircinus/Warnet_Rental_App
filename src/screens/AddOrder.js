import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddOrder = () => {
  const route = useRoute();
  const {userID} = route.params;
  const navigation = useNavigation();
  const [orderDate, setOrderDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [totalPayment, setTotalPayment] = useState('');

  // Function to handle date selection
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || orderDate;
    setOpenDatePicker(false);
    setOrderDate(currentDate);
  };

  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'PlayStation 4', value: 'PS4'},
    {label: 'PlayStation 5', value: 'PS5'},
  ]);

  const handleAddOrder = () => {
    if (!value || !orderDate || !totalPayment) {
      ToastAndroid.show('Please fill in all the details', ToastAndroid.SHORT);
      return;
    }

    const reqData = {
      userID: userID,
      orderStation: value,
      orderDate: orderDate,
      totalPayment: totalPayment,
    };

    console.log(reqData);

    axios
      .post(
        // 'http://192.168.1.2:3000/users/addOrder',
        'http://192.168.181.109:3000/users/addOrder',
        reqData,
      )
      .then(res => {
        ToastAndroid.show('Added Order', ToastAndroid.SHORT);
        navigation.navigate('Home');
      })
      .catch(err => {
        ToastAndroid.show('Try Again', ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" style={styles.chevronIcon} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add Order</Text>
      </View>

      <Text style={styles.subText}>Choose Station</Text>
      <View style={styles.dropDown}>
        <DropDownPicker
          open={openDropDown}
          value={value}
          items={items}
          setOpen={setOpenDropDown}
          setValue={setValue}
          setItems={setItems}
          textStyle={{fontSize: 18, fontFamily: 'RedHatDisplay-Medium'}}
        />
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.subDateText}>Choose Date:</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setOpenDatePicker(true)}>
          <Icon2 name="calendar-check-o" style={styles.dateIcon} />
        </TouchableOpacity>
      </View>

      {openDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={orderDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.flexContainer}>
        <Text style={styles.paymentText}>Payment:</Text>
        <Text style={styles.paymentText}>Rp</Text>
        <TextInput
          style={styles.priceContainer}
          onChangeText={text => setTotalPayment(text)}
          value={totalPayment}
        />
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handleAddOrder}>
          <Icon3 name="check" style={styles.addLogo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d81b4',
  },
  headerContainer: {
    backgroundColor: '#4470aa',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'RedHatDisplay-Bold',
    color: 'white',
    fontSize: 20,
  },
  chevronIcon: {
    fontSize: 32,
    padding: 10,
    color: 'white',
  },
  subText: {
    fontFamily: 'RedHatDisplay-SemiBold',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 0,
  },
  paymentText: {
    fontFamily: 'RedHatDisplay-SemiBold',
    color: 'white',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  subDateText: {
    fontFamily: 'RedHatDisplay-SemiBold',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  dateText: {
    marginHorizontal: 20,
    marginVertical: 10,
    color: 'white',
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: 18,
  },
  statusText: {
    marginHorizontal: 20,
    color: 'white',
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: 18,
  },
  noteContainer: {
    marginHorizontal: 20,
    color: 'white',
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: 18,
    padding: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    textAlign: 'justify',
  },
  addButtonContainer: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    backgroundColor: '#62a0f3',
    borderRadius: 50,
    padding: 20,
  },
  addLogo: {
    fontSize: 40,
    color: 'white',
  },
  datePicker: {
    marginLeft: 30,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  dateButton: {
    padding: 5,
  },
  dateIcon: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#62a0f3',
    padding: 10,
    borderRadius: 10,
  },
  dropDown: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  priceContainer: {
    marginHorizontal: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    flex: 1,
    paddingTop: 45,
    fontFamily: 'RedHatDisplay-Black',
    fontSize: 20,
  },
});

export default AddOrder;
