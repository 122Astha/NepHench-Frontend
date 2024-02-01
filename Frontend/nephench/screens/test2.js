import { collection, onSnapshot, query, where } from "@firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import GlobalContext from "../../../context/Context";
import { auth, db } from "../../../firebase";
import ContactsFloatingIcon from "../components/ContactsFloatingIcon";
import ListItem from "../components/ListItem";
import useContacts from "../hooks/useHooks";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Chats() {
  const { currentUser } = auth;
  const [bookedspEmail, setBookedspEmail] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const contacts = useContacts();
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );

  useEffect(() => {
    AsyncStorage.getItem('spEMAIL')
      .then((bookedSPemail) => {
        if (bookedSPemail !== null) {
          // Data is not null, so attempt to parse it as JSON
          try {
            const parsed = JSON.parse(bookedSPemail)
            setBookedspEmail(parsed)
          } catch (error) {
            console.error('Error parsing JSON:', error)
          }
        } else {
          console.log('No data found in AsyncStorage for key "spEMAIL"')
        }
      })
      .catch((error) => {
        console.error('Error fetching data from AsyncStorage:', error)
      })
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Filter rooms based on matching emails
    const matchingRooms = rooms.filter((room) => {
      const userBEmail = room.userB.email;
      return userBEmail === contacts.email && userBEmail === bookedspEmail;
    });
    setFilteredRooms(matchingRooms);
  }, [rooms, contacts.email, bookedspEmail]);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }

  return (
    <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
      {filteredRooms.map((room) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
        />
      ))}
      <ContactsFloatingIcon />
    </View>
  );
}
