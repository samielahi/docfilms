import { createMappingFn } from "~/utils/utils";

export interface BarPlotData {
  values: [number, number][];
  domain: [number, number];
  range: [number, number];
}

export interface BarPlotProps {
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

  const mapToDomain = createMappingFn(data?.domain!, [
    xOffset!,
    width! - xOffset!,
  ]);

  const mapToRange = createMappingFn(data?.range!, [
    height! - yOffset!,
    yOffset!,
  ]);

  const mappedData = data?.values.map((value) => [
    mapToDomain(value[0]),
    mapToRange(value[1]),
  ]);

  // Y-axis Calculations
  const maxRange = Math.ceil(data?.range[1]! / 10) * 10;
  const tickOffset = 30;
  const intervalSize = 5;
  const tickCount = maxRange / intervalSize + 1;
  const intervals = [];

  for (let i = 0; i < tickCount; i++) {
    intervals.push([
      xOffset! - tickOffset,
      mapToRange(intervalSize * i),
      intervalSize * i,
    ]);
  }

  return (
    <>
      <div className="">
        <svg className="border-0" width={width} height={height}>
          {/* Axes */}
          <g>
            {/* X */}
            <line
              x1={xOffset}
              y1={height! - yOffset!}
              x2={width! - xOffset!}
              y2={height! - yOffset!}
              className="stroke-violet stroke-[4px]"
            ></line>

            {/* Y */}
            {intervals.map((interval, i) => (
              <>
                <g key={i}>
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-white text-[14px] font-mono font-bold"
                    x={interval[0]}
                    y={interval[1]}
                  >
                    {interval[2]}
                  </text>

                  {i > 0 ? (
                    <line
                      x1={xOffset}
                      y1={interval[1]}
                      x2={width! - xOffset!}
                      y2={interval[1]}
                      strokeDasharray={3}
                      className="stroke-violet"
                    ></line>
                  ) : (
                    <></>
                  )}
                </g>
              </>
            ))}
          </g>
          {/* Plotting Data */}
          <g>
            {mappedData!.map((mappedDatum, i) => (
              <>
                <g key={i}>
                  <text
                    dominantBaseline="central"
                    textAnchor="middle"
                    x={mappedDatum[0]}
                    y={height! - (yOffset! - tickOffset)}
                    className="fill-white text-[12px] font-mono font-bold"
                    transform={`rotate(-90, ${mappedDatum[0]!}, ${
                      height! - (yOffset! - tickOffset)
                    })`}
                  >
                    {data!.values[i]![0]}
                  </text>
                  <line
                    x1={mappedDatum[0]}
                    x2={mappedDatum[0]}
                    y1={height! - yOffset!}
                    y2={mappedDatum[1]}
                    className="-z-1 stroke-orange stroke-[5px]"
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
