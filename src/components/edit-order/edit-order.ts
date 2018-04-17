import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavParams, Platform, ViewController, ActionSheetController, ModalController, AlertController, NavController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';
import { SellerOrderPage } from '../../pages/seller-order/seller-order'

@Component({
  selector: 'edit-order',
  templateUrl: 'edit-order.html'
})
export class EditOrder {

  title: string = "Edit Order";
  order: any;
  myProduct: any;
  myFarm: any;
  deleteList: any = [];
  addList: any = [];

  constructor(
    private params: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    public  view: ViewController,
    public api: ApiService,

  ) {
    this.order = params.get('order');
    this.api.startQueue([
      this.api.getProducts(0, null, {selection: [this.order.farm_id]}),
      this.api.getMeFarm()
    ]).then(data=>{
      console.log(data);
      this.myProduct = data[0];
      this.myFarm = data[1];
    }), err=>{
      console.log(err);
    }

    console.log(this.order)
  }

  update(){
    this.calculateSubTotal();
    this.calculateShipping();
  }

  updateOrder(){
    var formData: FormData = new FormData();
      formData.append('amount', this.order.amount)
      formData.append('status', this.order.status)
      formData.append('way', 'edit')
    this.api.startQueue([
      this.api.putOrder(formData, this.order.id)
    ]).then(data=>{
      Promise.all(this.order.transaction.map((p)=>{
        const data = new HttpParams().set('qty', p.qty).set('product_id', p.product_id)
        return this.api.putTransition(data, p.transaction_id)
      })).then(()=>{
        Promise.all(this.deleteList.map((del)=>{
          return this.api.deleteTransition(del)
        })).then(()=>{
          Promise.all(this.addList.map((add)=>{
            const body = new HttpParams().set('product_id', add.product_id)
                                         .set('qty', add.qty)
            return this.api.postTransition(body, this.order.id)
          })).then(()=>{
            this.navCtrl.setRoot(SellerOrderPage);
          })
        })

      })
    }), err=>{
      console.log(err)
    }
  }

  calculateShipping(){
    this.order.amount = 0
    if( !this.myFarm.margin_on || (this.myFarm.margin_on && this.myFarm.shipping_margin > this.order.sum) ){
      this.order.amount += this.myFarm.shipping_cost
    }
    if(this.order.pickup_method == 0)
      this.order.amount +=  this.myFarm.home_additional_cost
    this.order.amount += this.order.sum;
  }

  calculateSubTotal(){
    let sum = 0;
    this.order.transaction.map((p)=>{
      sum += p.price * p.qty
    })
    this.order.sum = sum;
  }

  productBuyerQtyEdit(p, button){
    if(button){
      let product = this.myProduct.product_list
      if(p.qty < product[product.findIndex((pro)=>{return pro.id == p.product_id})].qty){
        p.qty++ 
      }
    } else {
      if(p.qty > 1)
        p.qty--
    }
    this.update()
  }

  updateTransition(p){
    const data = new HttpParams().set('qty', p.qty).set('product_id', p.product_id)
    this.api.startQueue([
      this.api.putTransition(data, p.transaction_id)
    ]).then((date)=>{
      console.log(date)
    }), err=>{
      console.log(err)
    }
  }

  deleteTransition(id, index){
    if(this.order.transaction[index].transaction_id)
      this.deleteList.push(id)
    else
      this.addList.splice(this.addList.findIndex((add)=>{return JSON.stringify(add) === JSON.stringify(this.order.transaction[index]) }), 1)
    this.order.transaction.splice(index, 1)
    this.update()
    // this.api.startQueue([
    //   this.api.deleteTransition(id)
    // ]).then(data => {
    //   this.update()
    // }, err => {
    //   console.log(err)
    // });
  }

  presentConfirm(id, index) {
    let alert = this.alertCtrl.create({
      title: 'Remove Product',
      message: 'Do you want to remove this product?',
      buttons: [
        {
          text: 'Remove',
          handler: () => {
            this.deleteTransition(id, index);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  presentPrompt(p){
    let chooseProduct = this.alertCtrl.create();
      chooseProduct.setTitle('Select Product');
      for(var i = 0; i < this.myProduct.product_list.length; i++){
        chooseProduct.addInput({
          type: 'radio',
          label: this.myProduct.product_list[i].name,
          value: '' + i,
        })
      }
      chooseProduct.addButton({text: 'Cancel', role: 'cancel'});
      chooseProduct.addButton({
        text: 'OK',
        handler: data => {
          let temp = this.myProduct.product_list[Number(data)]
          console.log('temp', temp)
          p.image_url = temp.image_url
          p.product_id = temp.id
          p.name = temp.name
          p.weight = temp.weight
          p.price = new Date(temp.special_expiry) > new Date() ? temp.special_price : temp.price
          this.update()
        }
      });
    chooseProduct.present();
  }

  addPrompt(){
    let chooseProduct = this.alertCtrl.create();
      chooseProduct.setTitle('Select Product');
      for(var i = 0; i < this.myProduct.product_list.length; i++){
        chooseProduct.addInput({
          type: 'radio',
          label: this.myProduct.product_list[i].name,
          value: '' + i,
        })
      }
      chooseProduct.addButton({text: 'Cancel', role: 'cancel'});
      chooseProduct.addButton({
        text: 'OK',
        handler: data => {
          let product = this.myProduct.product_list[Number(data)]
          let temp = {
            image_url: product.image_url,
            product_id: product.id,
            name: product.name,
            weight: product.weight,
            price: new Date(product.special_expiry) > new Date() ? product.special_price : product.price,
            qty: 1
          }
          this.addList.push(temp);
          this.order.transaction.push(temp);
          this.update()
        }
      });
    chooseProduct.present();
  }
}
