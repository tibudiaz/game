import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CameraScreen from './screens/CameraScreen';
import GalleryScreen from './screens/GalleryScreen';

const AppNavigator = createStackNavigator(
  {
    Camera: CameraScreen,
    Gallery: GalleryScreen,
  },
  {
    initialRouteName: 'Camera',
  }
);

export default createAppContainer(AppNavigator);