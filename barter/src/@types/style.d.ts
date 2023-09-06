import 'styled-components';
import { dark } from '../styles/themes/index';

type ThemeType = typeof dark;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
