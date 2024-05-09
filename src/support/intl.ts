import { t as tBase } from '@intl/t';
import type { Translate as TFnBase } from '@intl/t';
import { t as tReact } from '@intl/t/react';
import type { Translate as TFnReact } from '@intl/t/react';

export type TFn = TFnBase & {
  jsx: TFnReact;
};

export const t: TFn = Object.assign(tBase, { jsx: tReact });