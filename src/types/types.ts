export type ChartType = {
  datasets: DataSets[];
  options: Options;
  labels?: string[] | null;
};

export type DataSets = {
  label: string;
  data: number[] | null;
  fill: Boolean;
  borderColor: string;
};

export type Options = {
  stroke: Stroke;
};

export type Stroke = {
  curve: 'smooth';
};

export type TableType = Array<TableData>;

export type TableData = {
  id: number;
  product: string;
  data?: number;
  value?: number;
};
