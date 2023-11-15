import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';

const UpdateScreen = ({ ip }) => {
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [codPostal, setCodPostal] = useState('');
  const [movil1, setMovil1] = useState('');
  const [movil2, setMovil2] = useState('');
  const [email, setEmail] = useState('');

  // Obtener la lista de clientes al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${ip}:3000/read`);
        const data = await response.json();

        // Actualizar el estado de clientes después de recibir la respuesta
        setClientes(data);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };

    fetchData(); // Llama a la función para obtener la lista de clientes
  }, []);

  // Función para manejar la actualización de datos
  const handleUpdate = async () => {
    // Validar que se haya seleccionado un cliente
    if (!selectedClient) {
      Alert.alert('Error', 'Por favor, selecciona un cliente');
      return;
    }

    // Lógica para enviar datos a tu API
    const clienteActualizado = {
      Nombre: nombre,
      Apellido: apellido,
      FechaNac: fechaNac,
      Peso: peso,
      Altura: altura,
      Domicilio: domicilio,
      CodPostal: codPostal,
      Movil1: movil1,
      Movil2: movil2,
      Email: email,
    };

    // Realiza la solicitud HTTP para enviar los datos
    try {
      const response = await fetch(`http://${ip}:3000/update/${selectedClient.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteActualizado),
      });

      if (response.status === 204) {
        // Datos actualizados exitosamente
        console.log('Cliente actualizado con éxito');
        // Muestra el modal de éxito
        Alert.alert('Éxito', 'Cliente actualizado con éxito');
        // Puedes realizar alguna acción adicional si es necesario
      } else {
        console.error('Error al actualizar cliente:', response.status);
        // Muestra un modal de error si la actualización falla
        Alert.alert('Error', 'No se pudo actualizar el cliente. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      // Muestra un modal de error si hay un error en la solicitud HTTP
      Alert.alert('Error', 'Hubo un error al actualizar el cliente. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.pickerContainer}>
        <Text>Selecciona un cliente:</Text>
        <Picker
          selectedValue={selectedClient}
          onValueChange={(itemValue) => {
            setSelectedClient(itemValue);
            // Llena el formulario con la información del cliente seleccionado
            setNombre(itemValue.Nombre);
            setApellido(itemValue.Apellido);
            setFechaNac(format(new Date(itemValue.FechaNac), 'dd/MM/yyyy'));
            setPeso(itemValue.Peso);
            setAltura(itemValue.Altura);
            setDomicilio(itemValue.Domicilio);
            setCodPostal(itemValue.CodPostal);
            setMovil1(itemValue.Movil1);
            setMovil2(itemValue.Movil2);
            setEmail(itemValue.Email);
          }}>
          <Picker.Item label="-- Seleccione un cliente --" value={null} />
          {clientes.map((cliente) => (
            <Picker.Item key={cliente.Id} label={`${cliente.Nombre} ${cliente.Apellido}`} value={cliente} />
          ))}
        </Picker>
      </View>
      {/* Formulario para editar la información del cliente */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={(text) => setApellido(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de Nacimiento"
        value={fechaNac}
        onChangeText={(text) => setFechaNac(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso"
        value={String(peso)}
        onChangeText={(text) => setPeso(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Altura"
        value={String(altura)}
        onChangeText={(text) => setAltura(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Domicilio"
        value={domicilio}
        onChangeText={(text) => setDomicilio(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Código Postal"
        value={String(codPostal)}
        onChangeText={(text) => setCodPostal(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Móvil 1"
        value={String(movil1)}
        onChangeText={(text) => setMovil1(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Móvil 2"
        value={String(movil2)}
        onChangeText={(text) => setMovil2(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <Button title="Enviar" onPress={handleUpdate} />
    </ScrollView>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default UpdateScreen;
