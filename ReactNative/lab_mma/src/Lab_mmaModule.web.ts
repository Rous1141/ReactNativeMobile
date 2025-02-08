import { registerWebModule, NativeModule } from 'expo';

import { Lab_mmaModuleEvents } from './Lab_mma.types';

class Lab_mmaModule extends NativeModule<Lab_mmaModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(Lab_mmaModule);
