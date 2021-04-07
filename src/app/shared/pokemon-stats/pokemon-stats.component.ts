import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more';
import * as HighchartsExporting from 'highcharts/modules/exporting';
import { PokemonStats } from 'src/app/models/isomorphic';

// @ts-ignore
HighchartsMore(Highcharts);

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss']
})
export class PokemonStatsComponent implements OnInit {
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

      const orderedStats = [
        this.stats.hp,
        this.stats.attack,
        this.stats.defense,
        this.stats.specialAttack,
        this.stats.specialDefense,
        this.stats.speed
      ];

      this.chartOptions = {
        chart: {
          type: 'bar'
        },

        title: {
          text: 'Pokemon Statistics',
          x: 0
        },

        pane: {
          size: '80%'
        },

        series: [
          {
            name: 'Statistics',
            data: orderedStats,
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
        },

        yAxis: {
          // gridLineInterpolation: 'polygon',
          // lineWidth: 1,
          min: 0,
        },

        tooltip: {
          shared: true,
          pointFormat:
            '<span style="color:{series.color}">{series.key}<b>{point.y}</b><br/>'
        },

        legend: {
          enabled: false,
        },

      };
    }

  }

}
