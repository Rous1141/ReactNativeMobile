import { NativeModule, requireNativeModule } from 'expo';

import { Lab_mmaModuleEvents } from './Lab_mma.types';

declare class Lab_mmaModule extends NativeModule<Lab_mmaModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<Lab_mmaModule>('Lab_mma');
