import { createMappingFn } from "~/utils/utils";

export interface LinePlotProps {
  domain?: number[];
  range?: number[];
  width?: number;
  height?: number;
  data?: number[][];
  dataDomain?: number[];
  dataRange?: number[];
  xOffset?: number;
  yOffset?: number;
  xLabel?: string;
  yLabel?: string;
}

export default function LinePlot(props: LinePlotProps) {
  const {
    domain,
    range,
    width,
    height,
    data,
    xOffset,
    yOffset,
    dataDomain,
    dataRange,
  } = props;

  // const dataXValues = data?.map(point => point[0]);
  // const dataYValues = data?.map(point => point[1]);

  const dataXToDomainX = createMappingFn(dataDomain!, domain!);
  const dataYToRangeY = createMappingFn(dataRange!, range!);

  const mappedData = data?.map((point) => [
    dataXToDomainX(point[0]!),
    dataYToRangeY(point[1]!),
  ]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="border-0"
      width={width}
      height={height}
    >
      {/* Axes */}
      <g>
        {/* Y-label */}
        <text
          className="origin-center -rotate-90 fill-white font-mono text-[12px]"
          x={160}
          y={-75}
        >
          # of movies
        </text>
        {/* Y axis */}
        <line
          x1={xOffset}
          y1={yOffset}
          x2={xOffset}
          y2={200! - yOffset!}
          className="stroke-yellow stroke-2"
          strokeLinejoin="bevel"
        />
        {/* Y-label */}
        <text
          className="fill-white font-mono italic text-[12px]"
          x={260}
          y={140}
        >
          Year(1930-2023)
        </text>

        {/* X axis */}
        <line
          x1={xOffset}
          y1={200 - yOffset!}
          x2={domain![1]}
          y2={200 - yOffset!}
          className="stroke-yellow stroke-2"
          strokeLinejoin="bevel"
        />
      </g>

      {mappedData?.map((point, i) => (
        <>
          <text
            x={point[0]! - 4}
            y={160}
            textAnchor="middle"
            dominantBaseline="central"
            transform={`rotate(-90, ${point[0]!}, 160)`}
            className="fill-white font-mono text-[12px]"
          >
            {data![i]![0]!}
          </text>
          <g>
            <text
              x={point[0]! - 4}
              y={point[1]! - 30}
              className="fill-white font-mono text-sm"
            >
              {data![i]![1]!}
            </text>

            <line
              x1={point[0]}
              y1={point[1]!}
              x2={point[0]}
              y2={point[1]! - 20}
              className="stroke-violet stroke-2"
              strokeLinejoin="bevel"
            />

            <line
              x1={point[0]}
              y1={point[1]}
              x2={point[0]}
              y2={200! - yOffset!}
              className="stroke-yellow stroke-[3px]"
              strokeLinejoin="bevel"
            />
            <circle
              className="fill-orange"
              cx={point[0]}
              cy={point[1]}
              r={4}
            ></circle>
          </g>
        </>
      ))}
    </svg>
  );
}
