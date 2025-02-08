import * as React from 'react';

import { Lab_mmaViewProps } from './Lab_mma.types';

export default function Lab_mmaView(props: Lab_mmaViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
