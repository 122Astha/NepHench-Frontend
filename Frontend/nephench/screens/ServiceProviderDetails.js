import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

export default function CreateContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newContactId, setNewContactId] = useState(null);

  useEffect(() => {
    // Request WRITE_CONTACTS permission when the component mounts
    async function requestContactsPermission() {
      const { status } = await Permissions.askAsync(Permissions.CONTACTS);;
      if (status !== 'granted') {
        console.log('Permission denied for writing contacts');
      }
    }

    requestContactsPermission();
  }, []);

  const createNewContact = async () => {
    try {
      const newContact = {
        [Contacts.Fields.FirstName]: name,
        [Contacts.Fields.Emails]: [{ label: 'work', email }],
        [Contacts.Fields.PhoneNumbers]: [{ label: 'mobile', number: phoneNumber }],
      };

      const contactId = await Contacts.addContactAsync(newContact);
      setNewContactId(contactId);
    } catch (error) {
      console.error("Error creating a new contact:", error);
    }
  };

  return (
    <View className="m-10">
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Button title="Save Contact" onPress={createNewContact} />
      {newContactId !== null && (
        <Text>New contact created with ID: {newContactId}</Text>
      )}
    </View>
  );
}
