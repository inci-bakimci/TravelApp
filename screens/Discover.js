import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, Restaurants } from "../assets";
import MenuContainer from "../components/MenuContainer";
import { FontAwesome } from '@expo/vector-icons';
import ItemCarDontainer from "../components/ItemCarDontainer";

const Discover = () => {
  const navigation = useNavigation();

  const [type, setType] = useState("restaurants");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[40px] text-[#0B646B] mt-4 font-bold">
            Discover
          </Text>
          <Text className="text-[#527283] text-[30px]">the beatuy today</Text>
        </View>

        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>

      <View className="flex-row items-center bg-white mx-4 rounded-xl px-4 shadow-lg mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
          }}
          query={{
            key: "AIzaSyB00zM0RdHaB-MC8rPhj_y7R4UleZTJoMY",
            language: "en",
          }}
        />
      </View>

      {/*Menu Container */}

      <ScrollView>
        <View className="flex-row items-center justify-between px-8 mt-8">
          <MenuContainer
            key={"hotel"}
            title="Hotels"
            imageSrc={Hotels}
            type={type}
            setType={setType}
          />

          <MenuContainer
            key={"attractions"}
            title="Attractions"
            imageSrc={Attractions}
            type={type}
            setType={setType}
          />

          <MenuContainer
            key={"restaurants"}
            title="Restaurants"
            imageSrc={Restaurants}
            type={type}
            setType={setType}
          />
        </View>
        
        <View>
          <View className="flex-row items-center justify-between px-4 mt-8">
            <Text className="text-[#2C7379] text-[28px] font-bold">Top List</Text>
            <TouchableOpacity className="flex-row items-center justify-center space-x-2">
              <Text className="text-[#A0C4C7] text-[20px] font-bold">Explore</Text>
              <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
            </TouchableOpacity>
          </View>


          <View className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap">
            <ItemCarDontainer key={"101"} imageSrc={"https://media.istockphoto.com/id/1384378990/tr/foto%C4%9Fraf/data-stream.jpg?s=612x612&w=is&k=20&c=FsV_bHJrcXQY9K9dBbkhKfzhhdecjQuA4Q-uNNUrJV0="} title="soyut bir kavvramdir" location="natural"/>
            <ItemCarDontainer key={"102"} imageSrc={"https://media.istockphoto.com/id/1917530589/tr/vekt%C3%B6r/modern-village.jpg?s=2048x2048&w=is&k=20&c=WQL2UngaKKgfZfMPiP84E2N2fFex6xSgdon4N-yy19Y="} title="selam" location="soyut"/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Discover;
