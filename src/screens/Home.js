import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const Home = ({route}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {userID} = route.params;
  const [orders, setOrders] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCheckboxToggle = async (index, checked) => {
    const updatedOrders = [...orders];
    updatedOrders[index].paymentStatus = checked ? 1 : 0;
    setOrders(updatedOrders);
    try {
      await axios.put(
        // 'http://192.168.1.2:3000/users/updateOrder',
        'http://192.168.181.109:3000/users/updateOrder',
        {
          userID: updatedOrders[index].userID,
          orderID: updatedOrders[index].orderID,
          paymentStatus: JSON.stringify(updatedOrders[index].paymentStatus),
        },
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchOrders();
    }
  }, [isFocused]);

  const fetchOrders = date => {
    // let url = 'http://192.168.1.2:3000/users/orders';
    let url = 'http://192.168.181.109:3000/users/orders';

    if (date) {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Jakarta', // Time zone for Western Indonesia Time (WIB)
      });

      const formattedDate = formatter.format(date);
      url += `?date=${formattedDate}`;
    }

    axios
      .get(url)
      .then(res => {
        setOrders(res.data.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      hideDatePickerModal();
      setSelectedDate(selectedDate);
      fetchOrders(selectedDate); // Update orders based on selected date
    } else {
      console.error('Selected date is invalid');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainerHeader}>
        <View style={styles.flexHeadContainer}>
          <Text style={styles.header}>Your Earnings: </Text>
          <Text style={styles.header}>Rp 100.000</Text>
        </View>
        <TouchableOpacity onPress={() => fetchOrders()}>
          <Icon name="refresh" style={styles.refreshIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {orders.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.orderContainer}
            onPress={() => navigation.navigate('Detail', {item})}>
            <View style={styles.flexContainerID}>
              <Text style={styles.orderID}>Order ID: {item.orderID}</Text>
              <Checkbox
                status={item.paymentStatus == 1 ? 'checked' : 'unchecked'}
                onPress={() =>
                  handleCheckboxToggle(index, item.paymentStatus !== 1)
                }
                color="#1c2e44"
              />
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.orderTitle}>{item.orderStation}</Text>
              <Text style={styles.orderAmount}>Rp {item.totalPayment}</Text>
            </View>

            <Text style={styles.orderDate}>User ID: {item.userID}</Text>
            <Text style={styles.orderDate}>Date: {item.orderDate}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddOrder', {userID: userID})}>
          <Icon2 name="plus" style={styles.addLogo} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchButtonContainer}>
        <TouchableOpacity onPress={showDatePickerModal}>
          <Icon2 name="search1" style={styles.addLogo} />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d81b4',
    padding: 20,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'RedHatDisplay-Bold',
  },
  orderContainer: {
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#4a7ab6',
  },
  orderTitle: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 10,
    fontFamily: 'RedHatDisplay-Bold',
  },
  orderDate: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 10,
    marginVertical: 5,
    fontFamily: 'RedHatDisplay-Italic',
  },
  orderAmount: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 10,
    marginVertical: 5,
    fontFamily: 'RedHatDisplay-Regular',
  },
  addButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#62a0f3',
    borderRadius: 50,
    padding: 20,
  },
  searchButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 200,
    backgroundColor: '#62a0f3',
    borderRadius: 50,
    padding: 20,
  },
  addLogo: {
    fontSize: 40,
    color: 'white',
  },
  refreshIcon: {
    fontSize: 24,
    color: '#fff',
    paddingRight: 10,
  },
  flexHeadContainer: {
    flexDirection: 'row',
    flexGrow: 2,
    alignItems: 'center',
    backgroundColor: '#1c2e44',
    padding: 10,
    borderRadius: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#4570aa',
  },
  flexContainerID: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderID: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 10,
    fontFamily: 'RedHatDisplay-SemiBold',
  },
  flexContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
});

export default Home;
