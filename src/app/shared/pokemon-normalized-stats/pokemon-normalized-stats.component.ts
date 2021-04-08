import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import { PokemonStats } from 'src/isomorphic/types';

// @ts-ignore
HighchartsMore(Highcharts);

@Component({
  selector: 'app-pokemon-normalized-stats',
  templateUrl: './pokemon-normalized-stats.component.html',
  styleUrls: ['./pokemon-normalized-stats.component.scss']
})
export class PokemonNomralizedStatsComponent implements OnInit {
  @Input() stats?: PokemonStats;

  public Highcharts = Highcharts; // required

  public loadingData = true;
  public dateProduction: Date = new Date();

  /* HighChart */
  public updateFlag = true; // optional boolean
  public oneToOneFlag = true; // optional boolean, defaults to false
  public chartConstructor = 'chart'; // optional string, defaults to 'chart'


  chartOptions: any = {};


  ngOnInit(): void {
    if (this.stats) {

      const nomarlizedStats = [
        this.stats.hp,
        this.stats.attack,
        this.stats.defense,
        this.stats.specialAttack,
        this.stats.specialDefense,
        this.stats.speed
      ];

      const percentiles = nomarlizedStats.map(n => n ? Math.round(n * 100) : n);

      this.chartOptions = {
        chart: {
          polar: true,
          type: 'area',
        },

        title: {
          text: 'Normalized Statistics',
          x: -50
        },

        pane: {
          size: '80%'
        },

        series: [
          {
            name: 'Percentiles',
            data: percentiles,
            pointPlacement: 'on'
          },
        ],

        xAxis: {
          categories: [
            'HP',
            'Attack',
            'Defense',
            'Special Attack',
            'Special Defense',
            'Speed'
          ],
          tickmarkPlacement: 'on',
          lineWidth: 0
        },

        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 1,
          min: 0,
          max: 100,
        },

        tooltip: {
          shared: true,
          pointFormat:
            '<span style="color:{series.color}">{series.key}: <b>{point.y} percentile</b><br/>'
        },

        legend: {
          enabled: false,
        },

      };
    }

  }

}
