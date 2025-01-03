import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { styles } from '../_layout';

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

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Failed to load items', error);
      }
    };

    loadItems();
  }, []);

  const handleSave = async () => {
    const newItem: Item = { id: Date.now().toString(), number, date: date.toISOString().split('T')[0], text1, text2 };
    const newItems = [...items, newItem];
    setItems(newItems);
    setModalVisible(false);
    setNumber('');
    setDate(new Date());
    setText1('');
    setText2('');

    try {
      await AsyncStorage.setItem('items', JSON.stringify(newItems));
    } catch (error) {
      console.error('Failed to save items', error);
    }
  };

const handleExport = async () => {
  // Cria um objeto com os dados a serem exportados
  const data = {
    text1,
    text2,
    date: date.toISOString(),
  };

  // Converte o objeto para uma string JSON
  const json = JSON.stringify(data);

  // Define o caminho do arquivo temporário no diretório de documentos do aplicativo
  const fileUri = FileSystem.documentDirectory + 'meubolsodata.json';

  // Escreve a string JSON no arquivo temporário
  await FileSystem.writeAsStringAsync(fileUri, json, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  // Solicita permissão para acessar o diretório de downloads do dispositivo
  const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (!permissions.granted) {
    // Se a permissão for negada, exibe um alerta e retorna
    alert('Permissão para acessar a pasta de downloads negada');
    return;
  }

  // Define o caminho do arquivo no diretório de downloads
  const downloadUri = `${permissions.directoryUri}/meubolsodata.json`;

  // Cria um novo arquivo no diretório de downloads e escreve a string JSON nele
  await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'meubolsodata', 'application/json')
    .then(async (uri) => {
      // Escreve a string JSON no novo arquivo criado
      await FileSystem.writeAsStringAsync(uri, json, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      // Exibe um alerta informando que o arquivo foi exportado com sucesso
      alert(`Arquivo exportado para: ${uri}`);
    })
    .catch((error) => {
      // Se ocorrer um erro, exibe uma mensagem de erro no console
      console.error('Erro ao exportar arquivo', error);
    });
};

const handleClearData = async () => {
  setItems([]);
  setNumber('');
  setDate(new Date());
  setText1('');
  setText2('');

  try {
    await AsyncStorage.removeItem('items');
    alert('Dados apagados com sucesso');
  } catch (error) {
    console.error('Failed to clear items', error);
  }
};

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      <Text>Número: {item.number}</Text>
      <Text>Data: {item.date}</Text>
      <Text>Texto 1: {item.text1}</Text>
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
            placeholder="Texto 1"
            value={text1}
            onChangeText={setText1}
          />
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

      <Button title="Exportar" onPress={handleExport} />
      <Button title="Apagar Dados" onPress={handleClearData} />
    </View>
  );
};

export default Inicio;