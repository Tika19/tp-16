import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, Button } from 'react-native';
import Modal from 'react-native-modal';

const ReadScreen = ({ ip }) => {
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`http://${ip}:3000/${endpoint}`);
      const data = await response.json();

      if (endpoint === 'read/promedio-alturas') {
        // Si el endpoint es 'read/promedio-alturas', mostrar el modal
        setModalContent(`Promedio Alturas: ${data.promedioAlturas.toFixed(2)} metros`);
        setModalVisible(true);
      } else {
        setClientes(data);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    fetchData('read'); // Mostrar todo al principio
  }, []);

  const formatFechaNac = (fecha) => {
    if (!fecha) return '';
  
    const date = new Date(fecha);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  };  

  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePressButton1 = () => {
    fetchData('read'); // Mostrar todo
  };

  const handlePressButton2 = () => {
    fetchData('read/clientes-peso-altura');
  };
  
  const handlePressButton3 = () => {
    fetchData('read/clientes-no-mar-del-plata-gmail');
  };
  
  const handlePressButton4 = () => {
    fetchData('read/promedio-alturas');
  };

  const handlePressButton5 = () => {
    fetchData('read/mas-alto-peso');
  };

  const handlePressButton6 = () => {
    fetchData('read/cliente-menor-edad');
  };

  return (
    <View>
      <ScrollView horizontal>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.BigCellHeader}>Nombre</Text>
            <Text style={styles.BigCellHeader}>Apellido</Text>
            <Text style={styles.BigCellHeader}>Fecha Nacimiento</Text>
            <Text style={styles.SmallCellHeader}>Peso</Text>
            <Text style={styles.SmallCellHeader}>Altura</Text>
            <Text style={styles.BigCellHeader}>Domicilio</Text>
            <Text style={styles.SmallCellHeader}>Cod Postal</Text>
            <Text style={styles.BigCellHeader}>Movil 1</Text>
            <Text style={styles.BigCellHeader}>Movil 2</Text>
            <Text style={styles.BigCellHeader}>Email</Text>
          </View>
          <FlatList
            data={clientes}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.BigCell}>{item?.Nombre}</Text>
                <Text style={styles.BigCell}>{item?.Apellido}</Text>
                <Text style={styles.BigCell}>{formatFechaNac(item?.FechaNac)}</Text>
                <Text style={styles.SmallCell}>{item?.Peso?.toString()}</Text>
                <Text style={styles.SmallCell}>{item?.Altura?.toFixed(2)}</Text>
                <Text style={styles.BigCell}>{item?.Domicilio}</Text>
                <Text style={styles.SmallCell}>{item?.CodPostal?.toString()}</Text>
                <Text style={styles.BigCell}>{item?.Movil1}</Text>
                <Text style={styles.BigCell}>{item?.Movil2}</Text>
                <Text style={styles.BigCell}>{item?.Email}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Mostrar todo" onPress={handlePressButton1} style={styles.Boton} />
        <Button title="Clientes con peso > 90 y altura > 1.78" onPress={handlePressButton2} style={styles.Boton} />
        <Button title="Clientes no Mar del Plata con email Gmail" onPress={handlePressButton3} style={styles.Boton} />
        <Button title="Promedio alturas" onPress={handlePressButton4} style={styles.Boton} />
        <Button title="Más alto peso" onPress={handlePressButton5} style={styles.Boton} />
        <Button title="Menor edad" onPress={handlePressButton6} style={styles.Boton} />
      </View>
      <Modal isVisible={modalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{modalContent}</Text>
          <Button title="Cerrar" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  BigCellHeader: {
    width: 100,
    fontWeight: 'bold',
  },
  SmallCellHeader: {
    width: 50,
    fontWeight: 'bold',
  },
  BigCell: {
    width: 100,
  },
  SmallCell: {
    width: 50,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'column',
  },
  Boton: {
    marginTop: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default ReadScreen;
