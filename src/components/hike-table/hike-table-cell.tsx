import { CSSProperties, FunctionComponent, ReactNode } from 'react';
import chroma from 'chroma-js';

export interface Props {
  children: ReactNode;
  style?: CSSProperties;
}

const HikeTableCellComponent: FunctionComponent<Props> = ({ children, style }: Props) => {
  function getBorderColor(): string {
    const hexColor = style?.backgroundColor;
    if (!hexColor) {
      return '#e9ebed';
    }

    return chroma(hexColor).darken().hex();
  }

  return (
    <div
      className="hike-table-cell"
      style={{
        ...style,
        borderColor: getBorderColor(),
      }}
    >
      {children}
    </div>
  );
};

export { HikeTableCellComponent };
