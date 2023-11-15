import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DeleteScreen = ({ ip }) => {
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  // Obtener la lista de clientes al cargar el componente
  useEffect(() => {
    fetch(`http://${ip}:3000/read`)
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener clientes:', error));
  }, []);

  // Función para manejar el borrado de cliente
  const handleDelete = async () => {
    // Validar que se haya seleccionado un cliente
    if (!selectedClient) {
      Alert.alert('Error', 'Por favor, selecciona un cliente');
      return;
    }

    // Mostrar un modal de confirmación antes de borrar
    Alert.alert(
      'Confirmar Borrado',
      `¿Estás seguro que quieres borrar a ${selectedClient.Nombre} ${selectedClient.Apellido}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          onPress: async () => {
            // Realiza la solicitud HTTP para borrar al cliente
            try {
              const response = await fetch(`http://${ip}:3000/delete/${selectedClient.Id}`, {
                method: 'DELETE',
              });

              if (response.status === 204) {
                // Cliente borrado exitosamente
                console.log('Cliente borrado con éxito');
                // Puedes realizar alguna acción adicional si es necesario
                Alert.alert('Éxito', 'Cliente borrado con éxito');
                // Actualizar la lista de clientes después de borrar
                setClientes((prevClientes) =>
                  prevClientes.filter((cliente) => cliente.Id !== selectedClient.Id)
                );
                // Limpiar la selección actual
                setSelectedClient(null);
              } else {
                console.error('Error al borrar cliente:', response.status);
                // Muestra un modal de error si el borrado falla
                Alert.alert(
                  'Error',
                  'No se pudo borrar el cliente. Por favor, inténtalo de nuevo.'
                );
              }
            } catch (error) {
              console.error('Error al borrar cliente:', error);
              // Muestra un modal de error si hay un error en la solicitud HTTP
              Alert.alert(
                'Error',
                'Hubo un error al borrar el cliente. Por favor, inténtalo de nuevo.'
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text>Selecciona un cliente:</Text>
        <Picker
          selectedValue={selectedClient}
          onValueChange={(itemValue) => setSelectedClient(itemValue)}>
          <Picker.Item label="-- Seleccione un cliente --" value={null} />
          {clientes.map((cliente) => (
            <Picker.Item key={cliente.Id} label={`${cliente.Nombre} ${cliente.Apellido}`} value={cliente} />
          ))}
        </Picker>
      </View>
      <Button title="Borrar" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    marginBottom: 16,
  },
});

export default DeleteScreen;
