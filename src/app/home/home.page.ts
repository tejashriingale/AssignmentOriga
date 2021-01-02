import { Component, Injectable, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleChartInterface } from 'ng2-google-charts';
import { Platform } from '@ionic/angular';
declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


@Pipe({name: 'keys'})
export class HomePage  {
  tablestyle='bootstrap';
  dataArray:any=[];
  pieChartData;
  buttn=true;
  dispName: any;
  btn=false;
  percentage: number;
  eventVal: any;
  lat: any;
  longitude:any;
  ngOnInit() {
   
  }
  constructor(private http:HttpClient,public platform:Platform) {
    this.loadData();
    this.platform.ready().then(()=>{
      google.charts.load('current',{'packages':['corecharts']})
    })
  }
 
  ionViewDidEnter(){
    if(this.buttn){
     // this.drawChart(this.dataArray)
          }
  }
 loadData(){
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(res=>{
      console.log("res=>",res);
      this.dataArray=res;
      this.findArrayLngth(res);
      this.drawChart(this.eventVal)
      console.log("dataarray=>",this.dataArray);
    })
  }
   
  


findArrayLngth(res){
  console.log("counter,==",this.dataArray.length);
  this.percentage=(10/100)*100;
  console.log("qqqqq=>",this.percentage)
}

showValues(event){
 
if(event){
  this.eventVal=event
  this.btn=true
  
}
console.log("value",event);

this.dispName=this.dataArray.find(i=>i.id==this.eventVal);
this.lat=Number(this.dispName.address.geo.lat)
this.longitude=Number(this.dispName.address.geo.lng)
this.lat=Math.abs(this.lat);
this.longitude=Math.abs(this.longitude)
console.log("this.lat",this.lat,"this.longitude",this.longitude);
this.longitude=this.longitude.toString();
this.lat=this.lat.toString()
}

 drawChart(event) {
 

  var data=google.visualization.arrayToDataTable([
    ['latitude longitude','count'],
    ['latitude',68.6102],
    ['longitude',47.0653],
     ['latitude',22],
    ['longitude',80],
   
  ]);

  // Set chart options
  var options = {'title':'Latitude and Longitude',
                 is3D:true};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
}