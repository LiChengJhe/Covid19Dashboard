import {
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexMarkers,
    ApexYAxis,
    ApexGrid,
    ApexTitleSubtitle,
    ApexLegend,
    ApexPlotOptions
  } from 'ng-apexcharts';
  
export class ChartOptions {
    Series?: ApexAxisChartSeries;
    Chart?: ApexChart;
    Xaxis?: ApexXAxis;
    Stroke?: ApexStroke;
    DataLabels?: ApexDataLabels;
    Markers?: ApexMarkers;
    Colors?: string[];
    Yaxis?: ApexYAxis;
    Grid?: ApexGrid;
    Legend?: ApexLegend;
    Title?: ApexTitleSubtitle;
    PlotOptions?: ApexPlotOptions;
  };