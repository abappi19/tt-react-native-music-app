import { colors } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableHighlight, View } from "react-native";

export type SearchInputProps = {
  onSearch: (text: string) => void;
  searchOnChange?: boolean;
  placeholder: string;
};

export default function SearchInput({
  placeholder,
  onSearch,
  searchOnChange = false,
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!searchOnChange) return;

    onSearch(query);
  }, [query, onSearch, searchOnChange]);

  return (
    <View style={styles.container}>
      {focused || (
        <Ionicons
          style={{
            paddingLeft: 8,
          }}
          name="search"
          size={22}
          color={colors.icon}
        />
      )}
      <TextInput
        ref={inputRef}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          // setFocused(false);
        }}
        keyboardType="default"
        returnKeyType="search"
        style={{ ...styles.searchBar }}
        placeholderTextColor="grey"
        placeholder={placeholder}
        value={query || ""}
        onChangeText={(text: string) => {
          setQuery(text);
        }}
        onEndEditing={() => {
          onSearch(query);
        }}
      />
      {focused && (
        <TouchableHighlight
          style={styles.searchContainer}
          onPress={() => {
            // Alert.alert("hi");
            setQuery("");
            setFocused(false);
            (inputRef.current as any)?.blur();
          }}
        >
          <Ionicons name="close-circle" size={22} color={colors.icon} />
        </TouchableHighlight>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "#EEEEEE23",
    backgroundColor: "#383838",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  searchBar: {
    height: 40,
    color: colors.text,
    flexGrow: 1,
    paddingHorizontal: 8,
  },
  searchContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    // backgroundColor: colors.primary,
    height: 40,
  },
});
