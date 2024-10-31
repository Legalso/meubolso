#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It moves the /app directory to /app-example and creates a new /app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..", "..");
const oldDirPath = path.join(projectRoot, "app");
const newDirPath = path.join(projectRoot, "app-example");
const newAppDirPath = path.join(projectRoot, "app");

const indexContent = `
import { View, Text } from 'react-native';

export default function Index() {
  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`;

fs.access(oldDirPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`Directory does not exist: ${oldDirPath}`);
    return;
  }

  fs.rename(oldDirPath, newDirPath, (error) => {
    if (error) {
      console.error(`Error renaming directory: ${error}`);
      return;
    }
    console.log("/app moved to /app-example.");

    fs.mkdir(newAppDirPath, { recursive: true }, (error) => {
      if (error) {
        console.error(`Error creating new app directory: ${error}`);
        return;
      }
      console.log("New /app directory created.");

      const indexPath = path.join(newAppDirPath, "index.tsx");
      fs.writeFile(indexPath, indexContent, (error) => {
        if (error) {
          console.error(`Error creating index.tsx: ${error}`);
          return;
        }
        console.log("index.tsx created successfully.");
      });

      const layoutPath = path.join(newAppDirPath, "_layout.tsx");
      fs.writeFile(layoutPath, layoutContent, (error) => {
        if (error) {
          console.error(`Error creating _layout.tsx: ${error}`);
          return;
        }
        console.log("_layout.tsx created successfully.");
      });
    });
  });
});
