import './hike-table.scss';
import chroma, { Scale } from 'chroma-js';
import { FunctionComponent, useMemo } from 'react';
import { HikeTableCellComponent } from './hike-table-cell.tsx';

export interface Props {
  value: number;
  values: number[];
  isPositiveScale?: boolean;
}

const NORMAL_SCALE: Scale = chroma.scale(['#d9ead3', '#fff2cc', '#fce5cd', '#f4cccc', '#ead1dc']);
const POSITIVE_SCALE: Scale = chroma.scale(['#d9ead3', '#b6d7a8', '#93c47d', '#6aa84f', '#38761d']);

const HikeTableNumberCellComponent: FunctionComponent<Props> = ({ value, values, isPositiveScale }: Props) => {
  const validValues: number[] = useMemo(() => values.filter(Number), [values]);
  const max: number = useMemo(() => Math.max(...validValues), [validValues]);
  const min: number = useMemo(() => Math.min(...validValues), [validValues]);

  function getScale(): number {
    return (value - min) / (max - min);
  }

  function getHexColor(): string | undefined {
    if (!value) {
      return undefined;
    }

    const scale: Scale = isPositiveScale ? POSITIVE_SCALE : NORMAL_SCALE;
    return scale(getScale()).hex();
  }

  return <HikeTableCellComponent style={{ backgroundColor: getHexColor(), textAlign: 'center' }}>{value}</HikeTableCellComponent>;
};

export { HikeTableNumberCellComponent };
