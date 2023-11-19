import React from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../AuthContext";

export default function TestFetch() {
  const { categories } = useAuth();
  const [cateCount, setCount] = useState([]);

  const handleTest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://172.21.48.189/YY_music_mobile/backend/index.php?action=getCateNum",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categories }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok (getCateNum)");
      }
      const backendData = await response.json();

      // Map the categories to include the count from the backend data
      const dataWithCounts = categories.map((cate) => ({
        category: cate,
        count: backendData[cate], // || 0 // Default to 0 if the category is not found
      }));

      setCount(dataWithCounts);
      console.log(cateCount);
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation (getCateNum):",
        error.message
      );
      alert("Failed due to a network or server issue (getCateNum). ");
    } finally {
    }
  };

  return (
    <View>
      <Text onPress={handleTest}>Test Fetch</Text>
    </View>
  );
}
