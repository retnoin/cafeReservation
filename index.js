/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import bgMessaging from './src/helper/bgMessaging'; // <-- Import the file you created in (2)

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line