import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function CoinItem({ coin }) {
  return (
    <View style={styles.containerItem}>
      <View style={styles.containerImgCoin}>
        <Text style={styles.rank}>{coin.market_cap_rank}</Text>
        <Image source={{uri: coin.image}} style={styles.image} />
        <View style={styles.containerNames}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.symbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textPrice}>{coin.current_price} US$</Text>
        <Text
          style={[
            coin.price_change_percentage_24h > 0
              ? styles.pricePositive
              : styles.priceNegative,
          ]}
        >
          {
            coin.price_change_percentage_24h > 0 ?
            "+" + coin.price_change_percentage_24h
            :
            coin.price_change_percentage_24h
          }
          %
        </Text>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#121212",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerImgCoin: {
    flexDirection: "row",
  },
  text: {
    color: "#fff",
  },
  image: {
    height: 30,
    width: 30,
  },
  symbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
  containerNames: {
    marginLeft: 10,
  },
  pricePositive: {
    color: "#00b5b9",
    textAlign: "right",
  },
  priceNegative: {
    color: "red",
    textAlign: "right",
  },
  textPrice: {
    color: "#fff",
    textAlign: "right"
  },
  rank: {
    color: "#434343",
    marginRight: 10
  }
});
