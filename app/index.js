import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
import Welcome from "../components/home/welcome/Welcome";
import Popularjobs from "../components/home/popular/Popularjobs";
import Nearbyjobs from "../components/home/nearby/Nearbyjobs";
// import {
//   Nearbyjobs,
//   Popularjobs,
//   ScreenHeaderBtn,
//   Welcome,
// } from "../components/home";
export default function index() {
  const [searchTerm, setSearchTerm] = useState(null);
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) router.push(`/search/${searchTerm}`);
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
