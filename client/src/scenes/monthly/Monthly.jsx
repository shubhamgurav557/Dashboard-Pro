import React, { useMemo } from 'react'
import Header from 'components/Header'
import { Box, useTheme } from '@mui/material'
import { useGetSalesQuery } from 'state/api'
import { ResponsiveLine } from '@nivo/line'

const Monthly = () => {
  const {data} = useGetSalesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.graphs[300],
      data: []
  }

  const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.graphs[500],
      data: []
  }

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
        totalSalesLine.data = [
          ...totalSalesLine.data,
          {
            x: month, y: totalSales
          }
        ]

        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          {
            x: month, y: totalUnits
          }
        ]
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData]
  }, [data, theme.palette.graphs]);

  return (
    <Box m="1.5rem 2rem">
      <Header title="MONTHLY SALES" subtitle="Charts of Monthly Sales" />
      <Box height="70vh" backgroundColor={theme.palette.background.alt} borderRadius="0.55rem" mt="1rem" p="1rem .5rem">
        {data ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.dark,
                },
              },
            }}
            colors={{ datum: 'color' }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false
            }}
            yFormat=" >-.2f"
            //curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: 'middle'
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={5}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]
            }
          />
        ) : <>Loading ...</>}
      </Box>
    </Box>
  )
}

export default Monthly