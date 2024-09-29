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
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const Detail = props => {
  const navigation = useNavigation();
  const detail = props.route.params.item;

  const [orderDate, setOrderDate] = useState(new Date(detail.orderDate));
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [totalPayment, setTotalPayment] = useState(detail.totalPayment);
  console.log(detail.totalPayment);

  const [value, setValue] = useState(detail.orderStation);
  const [items, setItems] = useState([
    {label: 'PlayStation 4', value: 'PS4'},
    {label: 'PlayStation 5', value: 'PS5'},
  ]);

  const handleUpdate = async () => {
    const updatedOrder = {
      userID: detail.userID,
      orderID: detail.orderID,
      orderStation: value,
      orderDate: orderDate,
      totalPayment: totalPayment,
    };

    try {
      const res = await axios.put(
        // 'http://192.168.1.2:3000/users/updateOrder',
        'http://192.168.181.109:3000/users/updateOrder',
        updatedOrder,
      );
      ToastAndroid.show('Order Updated', ToastAndroid.SHORT);
      navigation.navigate('Home');
    } catch (err) {
      ToastAndroid.show('Please Try Again', ToastAndroid.SHORT);
    }
  };

  const handleDelete = async () => {
    const data = {
      userID: detail.userID,
      orderID: detail.orderID,
    };

    try {
      const res = await axios.delete(
        // 'http://192.168.1.2:3000/users/deleteOrder',
        'http://192.168.181.109:3000/users/deleteOrder',
        {data: data},
      );
      ToastAndroid.show('Order Deleted', ToastAndroid.SHORT);
      navigation.navigate('Home');
    } catch (err) {
      ToastAndroid.show('Please Try Again', ToastAndroid.SHORT);
    }
  };

  const handleUpdateOrderDate = (event, selectedDate) => {
    const currentDate = selectedDate || orderDate;
    setOpenDatePicker(false);
    setOrderDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" style={styles.chevronIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>
      <View style={styles.flexContainerTop}>
        <Text style={styles.subText}>User ID: {detail.userID}</Text>
        <Text style={styles.subText}>Order ID: {detail.orderID}</Text>
      </View>

      <Text style={styles.subText}>Game Station:</Text>
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

      <Text style={styles.subText}>Date:</Text>
      <View style={styles.flexContainer}>
        <Text style={styles.dateText}>{detail.orderDate}</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setOpenDatePicker(true)}>
          <Icon2 name="calendar-check-o" style={styles.dateIcon} />
        </TouchableOpacity>
        {openDatePicker && (
          <DateTimePicker
            value={orderDate}
            mode="date"
            is24Hour={true}
            onChange={handleUpdateOrderDate}
          />
        )}
      </View>
      <Text style={styles.paymentText}>Payment:</Text>
      <View style={styles.flexContainerPrice}>
        <Text style={styles.paymentText}>Rp</Text>
        <TextInput
          placeholder="Amount"
          style={styles.priceContainer}
          onChangeText={text => setTotalPayment(text)}>
          {detail.totalPayment}
        </TextInput>
      </View>

      <View style={styles.updateButtonContainer}>
        <TouchableOpacity onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Order</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <Icon3 name="trash" style={styles.addLogo} />
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
  },
  dateText: {
    marginHorizontal: 20,
    marginVertical: 10,
    color: 'white',
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: 18,
  },
  addButtonContainer: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 20,
  },
  updateButtonContainer: {
    backgroundColor: '#62a0f3',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 20,
  },
  addLogo: {
    fontSize: 40,
    color: 'white',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexContainerPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexContainerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1c2e44',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
  },
  dateButton: {
    marginRight: 20,
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
    paddingTop: 0,
    fontFamily: 'RedHatDisplay-Black',
    fontSize: 20,
    marginTop: 10,
  },
  paymentText: {
    fontFamily: 'RedHatDisplay-SemiBold',
    color: 'white',
    fontSize: 20,
    marginLeft: 20,
  },
});

export default Detail;
