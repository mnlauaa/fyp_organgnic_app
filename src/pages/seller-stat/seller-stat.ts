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
  lineChart: any;
  barChart: any;
  orderPerDayX= [];
  orderPerDayY= [];
  topSaleX =[];
  topSaleY =[];
  user_info: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiService,) {
    this.user_info = navParams.get('user_info');
    //Day Line Chart
    this.api.startQueue([
      this.api.getOrderPerDayById(this.user_info.id)
    ]).then(data =>{
      let tmpData =data[0];
      for(var i=0; i<tmpData.length; i++){
        this.orderPerDayX[i]=tmpData[i].date_of_order;
        this.orderPerDayY[i]=tmpData[i].number_of_order;
      }
      this.lineChart = new Chart(document.getElementById("dayLine"), {
 
        type: 'line',
        data: {
            labels: this.orderPerDayX,
            datasets: [{
                label:'Number of orders',
                data: this.orderPerDayY,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
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
            },
            title: {
              display: true,
              text: 'Orders per day in this month'
            }
        }
      });
    }), err =>{}
      //top sale bar
      this.api.startQueue([
        this.api.getTopSaleById(this.user_info.id)
      ]).then(data =>{
        let tmpData =data[0];
        for(var k=0; k<tmpData.length; k++){
          if(k<5){
          this.topSaleX[k]=tmpData[k].product_name;
          this.topSaleY[k]=tmpData[k].numbers_of_sold;
          }
        }
      this.barChart = new Chart(document.getElementById("productPie"), {
   
        type: 'bar',
        data: {
            labels: this.topSaleX,
            datasets: [{
                data: this.topSaleY,
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
            },
            title: {
              display: true,
              text: 'Top 5 products in this month'
            }
        }
      });
    }), err =>{}
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerStatPage');


  } 
}


