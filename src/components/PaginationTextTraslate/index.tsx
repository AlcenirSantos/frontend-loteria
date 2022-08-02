interface Props {
  range: [number, number];
  total: number;
}

export function PaginationTextTraslate({ range, total }: Props) {
  return <div>{`Mostrando ${range[0]}-${range[1]} de ${total}`}</div>;
}
