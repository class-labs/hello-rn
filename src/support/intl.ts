import { t as tBase, Translate as TFnBase } from '@intl/t';
import { Translate as TFnReact, t as tReact } from '@intl/t/react';

export type TFn = TFnBase & {
  jsx: TFnReact;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const t = tBase as TFn;

t.jsx = tReact;
