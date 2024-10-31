import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Provider as PaperProvider, useTheme, Appbar, Drawer } from 'react-native-paper';
import { GestureHandlerRootView, DrawerLayout } from 'react-native-gesture-handler';

const Index = () => {
  const theme = useTheme();
  const drawerRef = React.useRef<DrawerLayout>(null);

  const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
      <Drawer.Section title="Menu">
        <Drawer.Item
          label="Opção 1"
          onPress={() => console.log('Opção 1 selecionada')}
        />
        <Drawer.Item
          label="Opção 2"
          onPress={() => console.log('Opção 2 selecionada')}
        />
        <Drawer.Item
          label="Opção 3"
          onPress={() => console.log('Opção 3 selecionada')}
        />
      </Drawer.Section>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <DrawerLayout
          ref={drawerRef}
          drawerWidth={300}
          drawerPosition="left"
          renderNavigationView={renderDrawerContent}
          drawerBackgroundColor="black" // Set the drawer background color to black
        >
          <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Appbar.Header>
              <Appbar.Action icon="menu" onPress={() => drawerRef.current?.openDrawer()} />
              <Appbar.Content title="Meu Bolso" />
            </Appbar.Header>
            <View style={styles.content}>
              <Text style={{ color: theme.colors.onBackground }}>Hello, world!</Text>
              <Button mode="contained" onPress={() => console.log('Pressed')}>
                Press me
              </Button>
            </View>
          </View>
        </DrawerLayout>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  drawerContent: {
    flex: 1,
    backgroundColor: 'black', // Set the drawer content background color to black
    paddingTop: 50,
  },
});

export default Index;