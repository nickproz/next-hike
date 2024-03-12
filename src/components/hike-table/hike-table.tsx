import { FunctionComponent, useContext } from 'react';
import { PropertyFilter, Table, TableProps } from '@cloudscape-design/components';
import { Hike } from '@/models/hike/hike.interface.ts';
import { HikeTableNumberCellComponent } from './hike-table-number-cell.tsx';
import { PropertyFilterOperator, useCollection } from '@cloudscape-design/collection-hooks';
import { HikeTableCellComponent } from './hike-table-cell.tsx';
import { HikeTableAreaCellComponent } from './hike-table-area-cell.tsx';
import { LinkComponent } from '@/components/reusable-components/link/link.tsx';
import { AppData } from '@/app/app.context.tsx';

export const HEADER_LABEL_HIKE: string = 'Hike';
export const HEADER_LABEL_CLASS: string = 'Class';
export const HEADER_LABEL_MILES: string = 'Miles';
export const HEADER_LABEL_GAIN: string = 'Gain';
export const HEADER_LABEL_ELEVATION: string = 'Elevation';
export const HEADER_LABEL_DRIVE_TIME: string = 'Drive Time (min)';
export const HEADER_LABEL_AREA: string = 'Area';
export const HEADER_LABEL_ALL_TRAILS_RATING: string = 'AllTrails Rating';
export const HEADER_LABEL_TRAILHEAD: string = 'Trailhead';

const DEFAULT_NUM_OPERATORS: PropertyFilterOperator[] = ['<', '=', '>'];
const DEFAULT_TEXT_OPERATORS: PropertyFilterOperator[] = [':', '='];

// TODO: figure out why scroll borders overlap sticky first column
const HikeTableComponent: FunctionComponent = () => {
  const { hikes } = useContext(AppData).data;
  const { isLoading } = useContext(AppData);

  const { items, collectionProps, propertyFilterProps } = useCollection(hikes, {
    sorting: {
      defaultState: {
        isDescending: true,
        sortingColumn: {
          sortingField: 'class',
        },
      },
    },
    filtering: {},
    propertyFiltering: {
      filteringProperties: [
        {
          key: 'hike',
          operators: DEFAULT_TEXT_OPERATORS,
          propertyLabel: HEADER_LABEL_HIKE,
          groupValuesLabel: HEADER_LABEL_HIKE,
        },
        {
          key: 'class',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HEADER_LABEL_CLASS,
          groupValuesLabel: HEADER_LABEL_CLASS,
        },
        {
          key: 'miles',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HEADER_LABEL_MILES,
          groupValuesLabel: HEADER_LABEL_MILES,
        },
        {
          key: 'gain',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HEADER_LABEL_GAIN,
          groupValuesLabel: HEADER_LABEL_GAIN,
        },
        {
          key: 'elevation',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HEADER_LABEL_ELEVATION,
          groupValuesLabel: HEADER_LABEL_ELEVATION,
        },
        {
          key: 'driveTimeMins',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HEADER_LABEL_DRIVE_TIME,
          groupValuesLabel: HEADER_LABEL_DRIVE_TIME,
        },
        {
          key: 'area',
          operators: DEFAULT_TEXT_OPERATORS,
          propertyLabel: HEADER_LABEL_AREA,
          groupValuesLabel: HEADER_LABEL_AREA,
        },
        {
          key: 'allTrailsRating',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HEADER_LABEL_ALL_TRAILS_RATING,
          groupValuesLabel: HEADER_LABEL_ALL_TRAILS_RATING,
        },
        {
          key: 'trailhead',
          operators: DEFAULT_TEXT_OPERATORS,
          propertyLabel: HEADER_LABEL_TRAILHEAD,
          groupValuesLabel: HEADER_LABEL_TRAILHEAD,
        },
      ],
    },
  });

  function getColumnDefinitions(): TableProps.ColumnDefinition<Hike>[] {
    return [
      {
        header: HEADER_LABEL_HIKE,
        cell: (hike: Hike) => (
          <HikeTableCellComponent style={{ border: 'none' }}>
            <LinkComponent href={`/hike/${hike.id}`} variant={'secondary'}>
              {hike.hike}
            </LinkComponent>
          </HikeTableCellComponent>
        ),
        sortingField: 'hike',
      },
      {
        header: HEADER_LABEL_CLASS,
        cell: (hike: Hike) => <HikeTableNumberCellComponent value={hike.class} values={hikes.map((h) => h.class)} />,
        sortingField: 'class',
        minWidth: '95px',
      },
      {
        header: HEADER_LABEL_MILES,
        cell: (hike: Hike) => <HikeTableNumberCellComponent value={hike.miles} values={hikes.map((h) => h.miles)} />,
        sortingField: 'miles',
        minWidth: '95px',
      },
      {
        header: HEADER_LABEL_GAIN,
        cell: (hike: Hike) => <HikeTableNumberCellComponent value={hike.gain} values={hikes.map((h) => h.gain)} />,
        sortingField: 'gain',
      },
      {
        header: HEADER_LABEL_ELEVATION,
        cell: (hike: Hike) => <HikeTableNumberCellComponent value={hike.elevation} values={hikes.map((h) => h.elevation)} />,
        sortingField: 'elevation',
        minWidth: '120px',
      },
      {
        header: HEADER_LABEL_DRIVE_TIME,
        cell: (hike: Hike) => <HikeTableNumberCellComponent value={hike.driveTimeMins} values={hikes.map((h) => h.driveTimeMins)} />,
        sortingField: 'driveTimeMins',
        minWidth: '170px',
      },
      {
        header: HEADER_LABEL_AREA,
        cell: (hike: Hike) => <HikeTableAreaCellComponent area={hike.area} />,
        sortingField: 'area',
      },
      {
        header: HEADER_LABEL_ALL_TRAILS_RATING,
        cell: (hike: Hike) => (
          <HikeTableNumberCellComponent value={hike.allTrailsRating} values={hikes.map((h) => h.allTrailsRating)} isPositiveScale={true} />
        ),
        sortingField: 'allTrailsRating',
        minWidth: '150px',
      },
      {
        header: HEADER_LABEL_TRAILHEAD,
        cell: (hike: Hike) => <HikeTableCellComponent>{hike.trailhead}</HikeTableCellComponent>,
        sortingField: 'trailhead',
      },
      // TODO: figure out what we want to do with these columns
      // {
      //   header: 'Best time',
      //   cell: (hike: Hike) => <HikeTableCellComponent>{hike.bestTime}</HikeTableCellComponent>,
      //   sortingField: 'bestTime',
      //   minWidth: '120px',
      // },
      // {
      //   header: 'Completed?',
      //   cell: (hike: Hike) => (
      //     <HikeTableCellComponent style={{ textAlign: 'center' }}>
      //       {/* TODO: maybe move to its own component */}
      //       <StatusIndicator type={hike.isCompleted ? 'success' : 'pending'}>
      //         {hike.isCompleted ? 'Completed' : 'Not yet'}
      //       </StatusIndicator>
      //     </HikeTableCellComponent>
      //   ),
      //   sortingField: 'isCompleted',
      //   minWidth: '140px',
      // },
      // {
      //   header: 'Aspiration',
      //   cell: (hike: Hike) => (
      //     <HikeTableNumberCellComponent
      //       value={hike.aspiration}
      //       values={hikes.map((h) => h.aspiration)}
      //       isPositiveScale={true}
      //     />
      //   ),
      //   sortingField: 'aspiration',
      //   minWidth: '125px',
      // },
      // {
      //   header: 'My rating',
      //   cell: (hike: Hike) => (
      //     <HikeTableNumberCellComponent
      //       value={hike.myRating}
      //       values={hikes.map((h) => h.myRating)}
      //       isPositiveScale={true}
      //     />
      //   ),
      //   sortingField: 'myRating',
      // },
    ];
  }

  return (
    <div className="hike-table__container">
      <Table
        {...collectionProps}
        stickyHeader={true}
        stickyColumns={{ first: 1 }}
        loading={isLoading}
        items={items}
        columnDefinitions={getColumnDefinitions()}
        filter={<PropertyFilter {...propertyFilterProps} />}
      />
    </div>
  );
};

export { HikeTableComponent };
