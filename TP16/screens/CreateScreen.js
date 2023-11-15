import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

const CreateScreen = ({ ip }) => {
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

  const handleCreate = async () => {
    if (
      !nombre ||
      !apellido ||
      !fechaNac ||
      !peso ||
      !altura ||
      !domicilio ||
      !codPostal ||
      !movil1 ||
      !movil2 ||
      !email
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Lógica para enviar datos a tu API
    const nuevoCliente = {
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
      const response = await fetch(`http://${ip}:3000/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCliente),
      });

      if (response.status === 201) {
        // Datos creados exitosamente
        console.log('Cliente creado con éxito');
        // Muestra el modal de éxito
        Alert.alert('Éxito', 'Cliente creado con éxito');
        // Puedes realizar alguna acción adicional si es necesario
      } else {
        console.error('Error al crear cliente:', response.status);
        // Muestra un modal de error si la creación falla
        Alert.alert('Error', 'No se pudo crear el cliente. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al crear cliente:', error);
      // Muestra un modal de error si hay un error en la solicitud HTTP
      Alert.alert('Error', 'Hubo un error al crear el cliente. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        placeholder="Fecha de Nac"
        value={fechaNac}
        onChangeText={(text) => setFechaNac(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso"
        value={peso}
        onChangeText={(text) => setPeso(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Altura"
        value={altura}
        onChangeText={(text) => setAltura(text)}
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
        value={codPostal}
        onChangeText={(text) => setCodPostal(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Móvil 1"
        value={movil1}
        onChangeText={(text) => setMovil1(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Móvil 2"
        value={movil2}
        onChangeText={(text) => setMovil2(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Crear Cliente" onPress={handleCreate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default CreateScreen;
