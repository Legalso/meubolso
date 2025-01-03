import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o pacote @expo/vector-icons instalado
import DateTimePicker from '@react-native-community/datetimepicker';

interface Item {
  id: string;
  number: string;
  date: string;
  text1: string;
  text2: string;
}

const Inicio = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    const newItem: Item = { id: Date.now().toString(), number, date: date.toISOString().split('T')[0], text1, text2 };
    setItems([...items, newItem]);
    setModalVisible(false);
    setNumber('');
    setDate(new Date());
    setText1('');
    setText2('');
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      <Text>Texto 1: {item.text1}</Text>
      <Text>Número: {item.number}</Text>
      <Text>Data: {item.date}</Text>
      <Text>Texto 2: {item.text2}</Text>
    </View>
  );

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Texto 1"
            value={text1}
            onChangeText={setText1}
          />
          <TextInput
            style={styles.input}
            placeholder="Número"
            keyboardType="numeric"
            value={number}
            onChangeText={setNumber}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Data"
              value={date.toISOString().split('T')[0]}
              editable={false}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Texto 2"
            value={text2}
            onChangeText={setText2}
          />
          <Button title="Salvar" onPress={handleSave} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 15,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    right: 16,
    bottom: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Inicio;