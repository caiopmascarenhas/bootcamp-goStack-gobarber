import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Dashboard,
  Profile,
  CreateAppointment,
  ProviderSchedules
} from '../../pages';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}