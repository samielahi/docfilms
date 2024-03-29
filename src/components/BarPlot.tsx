import { createMappingFn } from "~/utils";

interface BarPlotData {
  values: number[][];
  domain: [number, number];
  range: [number, number];
}

interface BarPlotProps {
  width?: number;
  height?: number;
  data?: BarPlotData;
  xOffset?: number;
  yOffset?: number;
  xLabel?: string;
  yLabel?: string;
}

export default function BarPlot(props: BarPlotProps) {
  const { width, height, xOffset, yOffset, data } = props;

  if (!width || !height || !xOffset || !yOffset || !data) {
    return <></>;
  }

  const mapToDomain = createMappingFn(data.domain, [xOffset, width - xOffset]);
  const mapToRange = createMappingFn(data.range, [height - yOffset, yOffset]);

  const mappedData = data.values.map((value) => [
    mapToDomain(value[0]!),
    mapToRange(value[1]!),
  ]);

  // Y-axis Calculations
  const maxRange = Math.ceil(data.range[1] / 10) * 10;
  const tickOffset = 20;
  const intervalSize = 10;
  const tickCount = maxRange / intervalSize + 1;
  const intervals = [];

  for (let i = 0; i < tickCount; i++) {
    intervals.push([
      xOffset - tickOffset,
      mapToRange(intervalSize * i),
      intervalSize * i,
    ]);
  }

  return (
    <>
      <div className="w-full">
        <svg className="border-0" width={width} height={height}>
          {/* Axes */}
          <g>
            {/* X */}
            <line
              x1={xOffset}
              y1={height - yOffset}
              x2={width - xOffset}
              y2={height - yOffset}
              className="stroke-orange stroke-[4px]"
            ></line>
            {/* X-label */}
            <text
              x={width / 2}
              y={height - (yOffset - tickOffset) * 0.2}
              dominantBaseline="central"
              textAnchor="middle"
              className=" fill-white font-heading text-[14px] font-bold italic"
            >
              Decade
            </text>

            {/* Y */}
            {intervals.map((interval, i) => (
              <>
                <g key={i}>
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-white font-heading text-[14px] font-bold"
                    x={interval[0]}
                    y={interval[1]}
                  >
                    {interval[2]}
                  </text>

                  {i > 0 ? (
                    <line
                      x1={xOffset}
                      y1={interval[1]}
                      x2={width - xOffset}
                      y2={interval[1]}
                      strokeDasharray={3}
                      className="-z-1 stroke-gray opacity-60"
                    ></line>
                  ) : (
                    <></>
                  )}
                </g>
              </>
            ))}
            {/* Y-Label */}
            <text
              x={xOffset + tickOffset}
              y={height / 2 - yOffset}
              dominantBaseline="central"
              textAnchor="middle"
              className="fill-white font-heading text-[14px] font-bold italic"
              transform={`rotate(-90, ${xOffset}, ${height / 2})`}
            >
              # of Movies
            </text>
          </g>
          {/* Plotting Data */}
          <g>
            {mappedData.map((mappedDatum, i) => (
              <>
                <g key={i}>
                  <text
                    dominantBaseline="central"
                    textAnchor="middle"
                    x={mappedDatum[0]! - xOffset * 0.05}
                    y={height - (yOffset - tickOffset)}
                    className="fill-white font-heading text-[12px] font-bold"
                    transform={`rotate(-50, ${mappedDatum[0]!}, ${
                      height - (yOffset - tickOffset)
                    })`}
                  >
                    {data.values[i]![0]}
                  </text>
                  <line
                    x1={mappedDatum[0]}
                    x2={mappedDatum[0]}
                    y1={height - yOffset}
                    y2={mappedDatum[1]}
                    className="stroke-orange stroke-[15px]"
                  ></line>
                </g>
              </>
            ))}
          </g>
        </svg>
      </div>
    </>
  );
}
