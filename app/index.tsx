import 'react-native-gesture-handler';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, useTheme, Appbar, Drawer } from 'react-native-paper';
import { GestureHandlerRootView, DrawerLayout } from 'react-native-gesture-handler';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3'; 

const Stack = createNativeStackNavigator();

const MainContent = () => {
  const theme = useTheme();
  const drawerRef = React.useRef<DrawerLayout>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
      <Drawer.Section title="Menu">
        <Drawer.Item
          label="Opção 1"
          onPress={() => {
            drawerRef.current?.closeDrawer();
            navigation.navigate('Screen1');
          }}
        />
        <Drawer.Item
          label="Opção 2"
          onPress={() => {
            drawerRef.current?.closeDrawer();
            navigation.navigate('Screen2');
          }}
        />
        <Drawer.Item
          label="Opção 3"
          onPress={() => {
            drawerRef.current?.closeDrawer();
            navigation.navigate('Screen3');
          }}
        />
      </Drawer.Section>
    </View>
  );

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={renderDrawerContent}
      drawerBackgroundColor="black"
    >
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={() => drawerRef.current?.openDrawer()} />
          <Appbar.Content title="Meu Bolso" />
        </Appbar.Header>
        <View style={styles.content}>
          <Stack.Navigator initialRouteName="Screen1" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Screen1" component={Screen1} />
            <Stack.Screen name="Screen2" component={Screen2} />
            <Stack.Screen name="Screen3" component={Screen3} />
          </Stack.Navigator>
        </View>
      </View>
    </DrawerLayout>
  );
};

const Index = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <PaperProvider>
      <MainContent />
    </PaperProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
  },
});

export default Index;