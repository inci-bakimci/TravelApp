import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import MenuContainer from "../components/MenuContainer";
import { FontAwesome } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { getPlacesData } from "../api";
import { GOOGLE_API_KEY } from "@env"; // GOOGLE_API_KEY'ini doğrudan bu dosyadan içe aktar

const Discover = () => {
  const navigation = useNavigation();

  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  // const [bl_lat, setBl_lat] = useState(null);
  // const [bl_lng, setBl_lng] = useState(null);
  // const [tr_lat, setTr_lat] = useState(null);
  // const [tr_lng, setTr_lng] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    // 'getPlacesData' fonksiyonunu kullanarak verileri al   getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
    getPlacesData().then((data) => {
      setMainData(data);
      // Veriler alındıktan sonra yükleme durumunu kapatmak için setTimeout kullanma, bu setInterval ile uyumsuz olabilir
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, []);
//[bl_lat, bl_lng, tr_lat, tr_lng, type]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", position: "relative" }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 8 }}>
        <View>
          <Text style={{ fontSize: 40, color: "#0B646B", fontWeight: "bold", marginTop: 4 }}>Discover</Text>
          <Text style={{ fontSize: 36, color: "#527283" }}>the beauty today</Text>
        </View>
        <View style={{ width: 48, height: 48, backgroundColor: "#ccc", borderRadius: 24, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
          <Image source={Avatar} style={{ width: "100%", height: "100%", borderRadius: 24 }} />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", marginHorizontal: 4, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginTop: 4 }}>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(details?.geometry?.viewport);
            // setBl_lat(details?.geometry?.viewport?.southwest?.lat);
            // setBl_lng(details?.geometry?.viewport?.southwest?.lng);
            // setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            // setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            key: GOOGLE_API_KEY, // GOOGLE_API_KEY'ini kullan
            language: "en",
          }}
        />
      </View>
      {/* Menu Container */}
      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 8, marginTop: 8 }}>
            {/* Menü öğeleri */}
            <MenuContainer key={"hotels"} title="Hotels" imageSrc={Hotels} type={type} setType={setType} />
            <MenuContainer key={"attractions"} title="Attractions" imageSrc={Attractions} type={type} setType={setType} />
            <MenuContainer key={"restaurants"} title="Restaurants" imageSrc={Restaurants} type={type} setType={setType} />
          </View>
          {/* Üst Liste */}
          <View style={{ paddingHorizontal: 4, marginTop: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: "#2C7379", fontSize: 28, fontWeight: "bold" }}>Top Tips</Text>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", spaceX: 2 }}>
              <Text style={{ color: "#A0C4C7", fontSize: 20, fontWeight: "bold" }}>Explore</Text>
              <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
            </TouchableOpacity>
          </View>
          {/* Ana veri listesi */}
          <View style={{ paddingHorizontal: 4, marginTop: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            {mainData?.length > 0 ? (
              mainData.map((data, i) => (
                <ItemCarDontainer key={i} imageSrc={data?.photo?.images?.medium?.url ? data?.photo?.images?.medium?.url : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"} title={data?.name} location={data?.location_string} data={data} />
              ))
            ) : (
              <View style={{ width: "100%", height: 400, alignItems: "center", justifyContent: "space-y", marginTop: 8 }}>
                <Image source={NotFound} style={{ width: 128, height: 128 }} />
                <Text style={{ fontSize: 24, color: "#428288", fontWeight: "bold" }}>Opps...No Data Found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
