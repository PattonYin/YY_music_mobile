import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
// import openImagePickerAsync from "./imagePicker";
import { styles } from "./styles";
import Home from "./components/Home";

export default function App() {
  // let [selectedImage, setSelectedImage] = React.useState(null);

  // if (selectedImage !== null) {
  //   return (
  //     <View style={styles.container}>
  //       <Image
  //         source={{ uri: selectedImage.localUri }}
  //         style={styles.thumbnail}
  //       />
  //     </View>
  //   );
  // }

  // const [isLoading, setLoading] = useState(true);
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     fetch("https://sebastianzimmeck.de/teaching/comp333/test-api.json")
  //         .then((response) => response.json())
  //         .then((json) => setData(json))
  //         .catch((error) => console.error(error))
  //         .finally(() => setLoading(false));
  //   }, []);

  return (
    // <View style={styles.container}>
    //   <Image
    //     source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
    //     style={styles.logo}
    //   />
    //   <Text style={styles.instructions}>
    //     To share a photo from your phone with a friend, just press the button
    //     below!
    //   </Text>

    //   <Pressable
    //     hitSlop={30}
    //     onPress={async () => {
    //       let image = await openImagePickerAsync();
    //       image ? setSelectedImage(image) : null;
    //     }}
    //     style={styles.button}
    //   >
    //     <Text style={styles.buttonText}>Pick a photo</Text>
    //   </Pressable>
    // </View>
    <View style={styles.container}>
      {/* <Text style={styles.instructions}>
        test
      </Text> */}
      <Home />
      {/* <View style={{ flex: 1, padding: 24 }}> */}
            {/* <Text>Home</Text> */}
            {/* <TopBar style={styles.header}/> */}
            {/* {isLoading ? (
                <Text>Loading...</Text>
            ) : (
              <View
                  style={{
                      flex: 1,
                      flexDirection: "column",
                      justifyContent: "space-between",
                  }}
              >
                  <Text style={{ fontSize: 18, color: "green", textAlign: "center" }}>
                      {data.title}
                  </Text>
                  <Text
                      style={{
                      fontSize: 14,
                      color: "green",
                      textAlign: "center",
                      paddingBottom: 10,
                      }}
                  >
                      Lectures:
                  </Text>
                  <FlatList
                  // We use various props of the built-in FlatList component.
                  // data refers to our data; it is an array [ ].
                  // The key from the data array is extracted using the keyExtractor
                  // prop on the FlatList component.
                  // renderItem takes an item from the data and renders it on a list.
                  data={data.lectures}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                  <Text>{item.id + ". " + item.title}</Text>
                  )}
              />
              </View>
            )} */}
        {/* </View> */}
    </View>
  );
}