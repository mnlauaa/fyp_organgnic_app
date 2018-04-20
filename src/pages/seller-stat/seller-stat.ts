import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service'
import Chart from 'chart.js';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@IonicPage()
@Component({
  selector: 'page-seller-stat',
  templateUrl: 'seller-stat.html',
})
export class SellerStatPage {
  @ViewChild('barCanvas') barCanvas;
  title = 'Business Statistics';
  dayLineChart: any;
  weekLineChart: any;
  monthLineChart: any;
  barChart: any;
  orderPerDayX= [];
  orderPerDayY= [];
  orderPerWeekX= [];
  orderPerWeekY= [];
  orderPerMonthX= [];
  orderPerMonthY= [];
  topSaleX =[];
  topSaleY =[];
  user_info: any;
  pdfObj = null;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private api: ApiService,
    private plt: Platform,
    private file: File, 
    private fileOpener: FileOpener,
  ) {
    this.user_info = navParams.get('user_info');
    //Day Line Chart
    this.api.startQueue([
      this.api.getOrderPerDayById(this.user_info.id),
      this.api.getOrderPerWeekById(this.user_info.id),
      this.api.getOrderPerMonthById(this.user_info.id),
      this.api.getTopSaleById(this.user_info.id)
    ]).then(data =>{
      let tmpData =data[0];
      for(var i=0; i<tmpData.length; i++){
        this.orderPerDayX[i]=tmpData[i].date_of_order;
        this.orderPerDayY[i]=tmpData[i].number_of_order;
      }
      let tmpData2 =data[1];
      for(var j=0; j<tmpData2.length; j++){
        this.orderPerWeekX[j]=tmpData2[j].week_of_this_month;
        this.orderPerWeekY[j]=tmpData2[j].number_of_orders;
      }
      let tmpData3 =data[2];
        for(var l=0; l<tmpData3.length; l++){
          this.orderPerMonthX[l]=tmpData3[l].month_of_this_year;
          this.orderPerMonthY[l]=tmpData3[l].number_of_orders;
      }
      let tmpData4 =data[3];
        for(var k=0; k<tmpData4.length; k++){
          if(k<5){
          this.topSaleX[k]=tmpData4[k].product_name;
          this.topSaleY[k]=tmpData4[k].numbers_of_sold;
          }
      }
      this.dayLineChart = new Chart(document.getElementById("dayLine"), {
 
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
      this.weekLineChart = new Chart(document.getElementById("weekLine"), {
    
        type: 'line',
        data: {
            labels: this.orderPerWeekX,
            datasets: [{
                label:'Number of orders',
                data: this.orderPerWeekY,
                backgroundColor: [
                  'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                  'rgba(153, 102, 255, 1)',
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
              text: 'Orders per week in this month'
            }
        }
      });
      this.monthLineChart = new Chart(document.getElementById("monthLine"), {
    
        type: 'line',
        data: {
            labels: this.orderPerMonthX,
            datasets: [{
                label:'Number of orders',
                data: this.orderPerMonthY,
                backgroundColor: [
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
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
              text: 'Orders per month in this year'
            }
        }
      });
      this.barChart = new Chart(document.getElementById("productPie"), {
    
        type: 'bar',
        data: {
            labels: this.topSaleX,
            datasets: [{
              label:'',
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
            },
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                 label: function(tooltipItem) {
                        return tooltipItem.yLabel;
                 }
              }
          }
        }
      });
    }), err =>{}
  }
  
  downloadPdf() {
    var docDefinition = {
      content: [
        { text: 'Business Statistics', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        {image:this.dayLineChart.toBase64Image(), width: 400, height: 400,},
 
        {image:this.weekLineChart.toBase64Image(), width: 400, height: 400,},

        {image:this.monthLineChart.toBase64Image(), width: 400, height: 400,},

        {image:this.barChart.toBase64Image(), width: 400, height: 400,},
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var utf8 = new Uint8Array(buffer);
        var binaryArray = utf8.buffer;
        var blob = new Blob([binaryArray], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'mystat.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'mystat.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerStatPage');


  } 
}


