
import React from "react";
import {View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import img1 from "../assets/plumberProfile.jpg";
import img2 from "../assets/plumberProfile.jpg";
import img3 from "../assets/plumberProfile.jpg";
import img4 from  "../assets/plumberProfile.jpg";
import img5 from  "../assets/plumberProfile.jpg";
import img6 from "../assets/plumberProfile.jpg";
import { useNavigation } from '@react-navigation/native'


const Pictures = [
  { image: img1 },
  { image: img2 },
  { image: img3 },
  { image: img4 },
  { image: img5 },
  { image: img6 }, 
];

const Users = [
  { image: img1, name: "Azar Hosseini", nickname: "Evelyn Allen" },
  { image: img2, name: "Phet Putrie", nickname: "Thitiwat Shimma" },
  { image: img3, name: "Kay TotleBen", nickname: "Prescoot MacCaffery" },
  { image: img4, name: "Brijamohan Mallick", nickname: "Aif Huncoot" },
  { image: img5, name: "Miriam de Jesus", nickname: "Anne-Marije Markink" },
  { image: img6, name: "Yahiro Ayuko", nickname: "Tndu Chukarvarti" },
  
];

const ListData = ({ images }) => {
  return (
        <View>
          <Image source={images} className="h-20 w-20  rounded-full ml-4" alt="Imagee" />
        </View>
  );
};

const Profiledata = ({ image, name, nickname }) => {
  return (
    <View className="flex text-black flex-row py-2 ">
      <View>
        <Image source={image} className="h-24 w-24 rounded-full" alt="Image" />
      </View>
      <View className="p-3">
        <Text className="text-2xl font-bold">{name}</Text>
        <Text className="text-gray-600">{nickname}</Text>
      </View>
    </View>
  );
};

const ChatListScreen = () => {
  const navigation = useNavigation()
  return (
    <ScrollView>
      <View className="bg-blue-500  rounded-3xl text-white h-100 flex justify-center">
        <View className="p-18">
          <View className="text-5xl font-bold pb-4 mt-20 ml-4">
            <Text className="text-white text-4xl font-bold">Chats</Text>
          </View>
          <View className="bg-stone-200 rounded-2xl">
            <View className="bg-white rounded-2xl ">         
              <View className="flex flex-row mt-8 ml-4 flex-1">
                <View className="border-2 border-black text-[40px] text-blue-500 border-dashed h-20 w-20 flex justify-center rounded-full borderRadius: '2px', borderStyle: 'dotted' ">
                  <Text className="text-4xl text-blue-400 text-center">+</Text>
                </View>
                {Pictures.map((items) => (
                  <ListData images={items.image} />
                ))}
              </View>
              <View className="py-8">
                <View className="flex gap-10  text-2xl text-gray-500 ml-8 flex-row">
                  <Text className="text-blue-500 text-xl font-bold ">All</Text>
                  <Text className="text-gray-400 text-xl font-bold">Plumber</Text>
                  <Text className="text-gray-400 text-xl font-bold">Electrician</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <View className="p-8 flex flex-col gap-4 ">
              {Users.map((items) => (
                <Profiledata
                  image={items.image}
                  name={items.name}
                  nickname={items.nickname}
                />
              ))}
            </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
   
  );
}
export default ChatListScreen;