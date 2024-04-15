import { FunctionComponent } from 'react';
import { PropertyFilter, Table, TableProps } from '@cloudscape-design/components';
import { Hike } from '@/models/hike/hike.interface.ts';
import { HikeTableNumberCellComponent } from './hike-table-number-cell.tsx';
import { PropertyFilterOperator, useCollection } from '@cloudscape-design/collection-hooks';
import { HikeTableCellComponent } from './hike-table-cell.tsx';
import { HikeTableAreaCellComponent } from './hike-table-area-cell.tsx';
import { LinkComponent } from '@/components/reusable-components/link/link.tsx';
import { useHikes } from '@/hooks/data/use-hikes.tsx';

export enum HikeLabel {
  Hike = 'Hike',
  Class = 'Class',
  Miles = 'Miles',
  Gain = 'Gain (ft)',
  Elevation = 'Elevation (ft)',
  DriveTime = 'Drive time (min)',
  Area = 'Area',
  AllTrailsRating = 'AllTrails rating',
  Trailhead = 'Trailhead',
}

const DEFAULT_NUM_OPERATORS: PropertyFilterOperator[] = ['<', '=', '>'];
const DEFAULT_TEXT_OPERATORS: PropertyFilterOperator[] = [':', '='];

// TODO: figure out why scroll borders overlap sticky first column
const HikeTableComponent: FunctionComponent = () => {
  const { data, isLoading } = useHikes();
  const hikes = data || [];

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
          propertyLabel: HikeLabel.Hike,
          groupValuesLabel: HikeLabel.Hike,
        },
        {
          key: 'class',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HikeLabel.Class,
          groupValuesLabel: HikeLabel.Class,
        },
        {
          key: 'miles',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HikeLabel.Miles,
          groupValuesLabel: HikeLabel.Miles,
        },
        {
          key: 'gain',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HikeLabel.Gain,
          groupValuesLabel: HikeLabel.Gain,
        },
        {
          key: 'elevation',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HikeLabel.Elevation,
          groupValuesLabel: HikeLabel.Elevation,
        },
        {
          key: 'driveTimeMins',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HikeLabel.DriveTime,
          groupValuesLabel: HikeLabel.DriveTime,
        },
        {
          key: 'area',
          operators: DEFAULT_TEXT_OPERATORS,
          propertyLabel: HikeLabel.Area,
          groupValuesLabel: HikeLabel.Area,
        },
        {
          key: 'allTrailsRating',
          operators: DEFAULT_NUM_OPERATORS,
          propertyLabel: HikeLabel.AllTrailsRating,
          groupValuesLabel: HikeLabel.AllTrailsRating,
        },
        {
          key: 'trailhead',
          operators: DEFAULT_TEXT_OPERATORS,
          propertyLabel: HikeLabel.Trailhead,
          groupValuesLabel: HikeLabel.Trailhead,
        },
      ],
    },
  });

  function getColumnDefinitions(): TableProps.ColumnDefinition<Hike>[] {
    return [
      {
        header: HikeLabel.Hike,
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
        header: HikeLabel.Class,
        cell: (hike: Hike) => <HikeTableNumberCellComponent value={hike.class} values={hikes.map((h) => h.class)} />,
        sortingField: 'class',
        minWidth: '95px',
      },
      {
        header: HikeLabel.Miles,
        cell: (hike: Hike) => <HikeTableNumberCellComponent value={hike.miles} values={hikes.map((h) => h.miles)} />,
        sortingField: 'miles',
        minWidth: '95px',
      },
      {
        header: HikeLabel.Gain,
        cell: (hike: Hike) => <HikeTableNumberCellComponent value={hike.gain} values={hikes.map((h) => h.gain)} />,
        sortingField: 'gain',
      },
      {
        header: HikeLabel.Elevation,
        cell: (hike: Hike) => <HikeTableNumberCellComponent value={hike.elevation} values={hikes.map((h) => h.elevation)} />,
        sortingField: 'elevation',
        minWidth: '120px',
      },
      {
        header: HikeLabel.DriveTime,
        cell: (hike: Hike) => <HikeTableNumberCellComponent value={hike.driveTimeMins} values={hikes.map((h) => h.driveTimeMins)} />,
        sortingField: 'driveTimeMins',
        minWidth: '170px',
      },
      {
        header: HikeLabel.Area,
        cell: (hike: Hike) => <HikeTableAreaCellComponent area={hike.area} />,
        sortingField: 'area',
      },
      {
        header: HikeLabel.AllTrailsRating,
        cell: (hike: Hike) => (
          <HikeTableNumberCellComponent value={hike.allTrailsRating} values={hikes.map((h) => h.allTrailsRating)} isPositiveScale={true} />
        ),
        sortingField: 'allTrailsRating',
        minWidth: '150px',
      },
      {
        header: HikeLabel.Trailhead,
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
