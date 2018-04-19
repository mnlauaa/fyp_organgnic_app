import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import Chart from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-seller-stat',
  templateUrl: 'seller-stat.html',
})
export class SellerStatPage {
  @ViewChild('barCanvas') barCanvas;
  title = 'Business Statistics';
  barChart: any;
  orderPerDay: any;
  orderPerDayX: String[];
  orderPerDayY: String[];
  user_info: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiService,) {
    this.user_info = navParams.get('user_info');
    this.api.startQueue([
      this.api.getOrderPerDayById(this.user_info.id)
    ]).then(data =>{
      for(var i=0; i<data[0].length; i++){
        this.orderPerDayX[i]=data[0][i].date_of_order;
        this.orderPerDayY[i]=data[0][i].number_of_order;
      }
      
      // for(var i in data){
      //   this.orderPerDayX[i]=data[0][i].date_of_order;
      //   this.orderPerDayY[i]=data[0][i].number_of_order;
      // }
      console.log(this.orderPerDayX);
      console.log(this.orderPerDayY);
    }), err =>{}
  }

  updateLine(){
    for(var i =0; i<this.orderPerDayY.length; i++)
      this.barChart.data.datasets.data[i] = this.orderPerDayY[i];
    for(var j =0; j<this.orderPerDayX.length; j++)
    this.barChart.data.labels[j] = this.orderPerDayX[j];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerStatPage');
    this.barChart = new Chart(document.getElementById("myChart"), {
 
      type: 'line',
      data: {
          labels: this.orderPerDayX,
          datasets: [{
              label: 'Sales per day',
              data: this.orderPerDayY,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });
    //this.updateLine();
  } 
}


