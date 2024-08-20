import { useState } from "react";
import { SafeAreaView, Text } from "react-native";

import { Home } from "./Home";
import { SignupForm } from "./SignupForm";

export function App() {
  const [currentPage, setCurrentPage] = useState("signin");
  if (currentPage === "home") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Home />
      </SafeAreaView>
    );
  } else if (currentPage === "signin") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <SignupForm
          onSuccess={() => {
            setCurrentPage("home");
          }}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Not Found</Text>
      </SafeAreaView>
    );
  }
}
