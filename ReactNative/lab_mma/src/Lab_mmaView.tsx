import { requireNativeView } from 'expo';
import * as React from 'react';

import { Lab_mmaViewProps } from './Lab_mma.types';

const NativeView: React.ComponentType<Lab_mmaViewProps> =
  requireNativeView('Lab_mma');

export default function Lab_mmaView(props: Lab_mmaViewProps) {
  return <NativeView {...props} />;
}
