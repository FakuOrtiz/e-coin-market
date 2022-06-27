import { View, Text, FlatList, StyleSheet, TextInput, StatusBar, } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinItem from "./src/components/CoinItem";

export default function App() {
  let [coins, setCoins] = useState([]);
  let [search, setSearch] = useState("");
  let [refreshing, setRefreshing] = useState(false)

  let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  let getData = async () => {
    let { data } = await axios.get(url);
    setCoins(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#141414"} />
      <View style={styles.header}>
        <Text style={styles.title}>e-coin Market</Text>
        <TextInput
          placeholder="Search coin..."
          placeholderTextColor={"#858585"}
          style={styles.searchInput}
          onChangeText={(e) => setSearch(e.toLowerCase())}
        />
      </View>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await getData();
          setRefreshing(false);
        }}
        data={coins.filter(
          (c) =>
            c.name.toLowerCase().includes(search) ||
            c.symbol.toLowerCase().includes(search)
        )}
        renderItem={({ item }) => {
          return <CoinItem coin={item} />;
        }}
      />
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 20,
  },
  list: {
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#4657ce",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
  },
});
