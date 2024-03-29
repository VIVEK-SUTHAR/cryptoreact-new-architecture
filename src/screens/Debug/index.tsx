import React, { type FC } from "react";
import { Pressable, SectionList, StyleSheet, View } from "react-native";
import appJson from "../../../app.json";
import packageJSON from "../../../package.json";
import { Box, Text } from "theme";
import Constants, { ExecutionEnvironment } from "expo-constants";
import getAppDetails from "utils/debug/getAppDetails";
function isTurboModuleInteropEnabled() {
  return global?.RN$TurboInterop === true;
}
const renderItem: FC<{ item: { label: string; value: string } }> = ({
  item,
}) => <Item label={item.label} value={item.value} />;

const renderSectionHeader: FC<{ section: { title: string } }> = ({
  section,
}) => (
  <Text
    variant="heading"
    color="primaryCardText"
    style={{
      fontSize: 16,
      fontWeight: "600",
      marginVertical: 4,
    }}
  >
    {section.title}
  </Text>
);
const DebugScreen: FC = () => {
  const sections = [
    {
      title: "App Architecture",
      data: [
        { label: "Hermes Enabled", value: getAppDetails().isHermesEnabled },
        { label: "UI Manager", value: getAppDetails().uiManager },
        {
          label: "New Architecture Enabled",
          value: getAppDetails().isNewArchitectureEnabled,
        },
        { label: "Bridge Less Mode", value: getAppDetails().isBridgeLess },
        { label: "JS Dev Mode", value: getAppDetails().jsDevMode },
        
      ],
    },
    {
      title: "Core Versions",
      data: [
        {
          label: "React Native Version",
          value: packageJSON.dependencies["react-native"],
        },
        { label: "Expo SDK", value: packageJSON.dependencies.expo },
      ],
    },
    {
      title: "Release Details",
      data: [
        { label: "App Version", value: appJson.expo.version },
        {
          label: "Android Version Code",
          value: appJson.expo.android.versionCode.toString(),
        },
        { label: "iOS Build number", value: appJson.expo.ios.buildNumber },
      ],
    },
  ];

  if (Constants.executionEnvironment === ExecutionEnvironment.Standalone) {
    console.log("New Architecture Enabled");
  }
  return (
    <Box flex={1} backgroundColor="mainBackground" p="s">
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.label + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={<ListHeader />}
      />
    </Box>
  );
};

type ItemProps = {
  label: string;
  value: string;
};

const ListHeader = () => {
  return (
    <View>
      {/* <Item label="App Bundle Load Time" value={getAppDetails().appBundleLoadTime} /> */}
    </View>
  );
};

const Item: FC<ItemProps> = ({ label, value }: ItemProps) => (
  <Pressable
    android_ripple={{
      color: "rgba(255,255,255,0.1)",
    }}
    style={styles.itemContainer}
  >
    <View style={styles.itemContent}>
      <Text style={styles.itemText} color="primaryCardText">
        {label}
      </Text>
    </View>
    <Text style={styles.itemText} color="primaryCardText">
      {value}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.2)",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    paddingVertical: 18,
    paddingHorizontal: 6,
  },
});

export default DebugScreen;
