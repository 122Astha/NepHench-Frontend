import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ServiceProviderDetails() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
        const { status } = await Contacts.getPermissionsAsync();
        if (status === 'granted') {
          // Permission granted, proceed with accessing contacts
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails],
          });
  
          if (data.length > 0) {
            setContacts(
              data
                .filter(
                  (c) =>
                  c.firstName && c.emails && c.emails[0] && c.emails[0].email
                )
                .map(mapContactToUser)
                );
                // console.log(data, "hello data")
          }
        } else {
          // Handle the case when permission is denied
          console.log("Permission to access contacts denied");
        }
      } )();
    console.log(contacts, "hello contact")
  }, []);
  return contacts
}

function mapContactToUser(contact) {
  // console.log(contact, "hello caogcvjgcjgmtact")
  return {
    contactName:
      contact.firstName && contact.lastName
        ? `${contact.firstName} ${contact.lastName}`
        : contact.firstName,
    email: contact.emails[0].email,
  };
}
