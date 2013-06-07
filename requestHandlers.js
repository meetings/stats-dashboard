/*
Each Meetin.gs highchart visualization is a different function:

  i.e function repeat_users(){ ... }
  Function makes URL-queries to pre-specified addresses (i.e. http://dubidu.kapsi.fi/repeat_users ) to GET relevant Meetin.gs stats in jsonv format.
  Function then calls parse_json_string to parse String formatted Jsonv file in to Json object and loops trough the object 
  to find relevant stats for visualization. Stats are stored in javascript variables which are given to highcharts compatible chart-json 
  and returned to browser when this function is called.


  Each chart-json is unique and tuned to match visualization. To change looks of the visualization chart-json can be modified.

  One can copy + paste chart-json to http://jsfiddle.net/llexl/ inside Highcharts.Chart() and test how it looks like.

Input example:
INPUT data from URI-address

window.monthly_real_meeting_creators_who_were_old_users = [{"count":36,"month":"2012_04"},{"count":42,"month":"2012_05"},{"count":26,"month":"2012_06"},{"count":24,"month":"2012_07"},{"count":36,"month":"2012_08"},{"count":37,"month":"2012_09"},{"count":63,"month":"2012_10"},{"count":52,"month":"2012_11"},{"count":49,"month":"2012_12"},{"count":77,"month":"2013_01"},{"count":67,"month":"2013_02"},{"count":52,"month":"2013_03"},{"count":65,"month":"2013_04"},{"count":76,"month":"2013_05"}];

Output example:

OUTPUT data from a function
  {"chart":{"renderTo":"container","type":"area","zoomType":"x","spacingRight":20,"backgroundColor":"#00a0cd"},"title":{"text":"Repeat users","style":{"color":"#FFFFFF"}},"subtitle":{"text":"Source: Meetin.gs","style":{"color":"#FFFFFF"}},"xAxis":{"categories":["2012_04","2012_05","2012_06","2012_07","2012_08","2012_09","2012_10","2012_11","2012_12","2013_01","2013_02","2013_03","2013_04","2013_05"],"labels":{"style":{"color":"white"}}},"yAxis":{"title":{"text":"","style":{"color":"#FFFFFF"}},"labels":{"style":{"color":"white"}}},"tooltip":{"enabled":true},"plotOptions":{"area":{"dataLabels":{"borderWidth":0,"enabled":true,"style":{"fontWeight":"bold"}},"stacking":"normal","lineColor":"#666666","lineWidth":0,"marker":{"lineWidth":1,"lineColor":"#666666"},"fillOpacity":1}},"series":[{"color":"#6c6c6c","name":"Repeat users","data":[36,42,26,24,36,37,63,52,49,77,67,52,65,76],"dataLabels":{"x":20,"y":9,"color":"white"}}]}

*/



var http = require('http');
var request = require('request');


//parses a string formatted Jsonv file into a Json object
//i.e "window.blaa = { ... };" -> { ... } (but json object)
function parse_json_string(json_string){
  var json_body = json_string.split("=")[1]
  if (json_body.length != 0 && json_body.indexOf(';')!= -1){
    json_body = json_body.split(";")[0]
    }
  return JSON.parse(json_body)

}





var repeat = ""
function repeat_users(){
 var url = "https://meetingstats.dicole.net/js/stats/jsonv/monthly_real_meeting_creators_who_were_old_users.jsonv"
  var old_user = [];
  var month = [];

  request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        
       
        json_body = parse_json_string(body)



        for (var key in json_body) {
           var obj = json_body[key];
           for (var prop in obj) {

              if (prop == "count"){
                old_user.push(obj[prop]);

              }
              if (prop == "month"){
                month.push(obj[prop]);

                  } 
                 
               }
        }  
            
       
       repeat = {
                chart: {
                    renderTo: 'container',
                    type: 'area',
                    zoomType: 'x',
                    spacingRight: 20,
                    backgroundColor:'#00a0cd'
                },
                title: {
                    text: 'Repeat users',
                    style: {
                      color: '#FFFFFF'
                    }
                },
                subtitle: {
                    text: 'Source: Meetin.gs',
                    style: {
                      color: '#FFFFFF'
                    }
                },
                xAxis: {
                    categories: month,

                    labels: {
                    style: {
                        color: 'white'
                    }
                }
                },
                yAxis: {
                    title: {
                        text: '',
                        style: {
                      color: '#FFFFFF'
                    }
                    },
                    labels: {
                    style: {
                        color: 'white'
                    }
                }
                },
                tooltip: {
                    enabled: true,
                    formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                           + this.y + '' ;
                    }
                },
                plotOptions: {
                    area: {
                        dataLabels: {
                            borderWidth: 0,
                            enabled: true,
                            style: {
                            fontWeight:'bold'
                             }
                        },
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 0,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        },
                        fillOpacity: 1.0
                    }
                },
                series: [{ 
                    color: '#6c6c6c',
                    name: 'Repeat users',
                    data: old_user,
                    dataLabels: {x: 20, y:9,color: 'white'}

                }]
            }


        }
  });



  //console.log("Request handler repeat_users was called.")
 
return JSON.stringify(repeat)
}

var registered =""
function registered_within_three(){
    var url = "https://meetingstats.dicole.net/js/stats/jsonv/combined_monthly_users_with_n_real_created_as_any_user_within_a_3_month_window.jsonv"
    var total_meetings_created = [];

    var total_real_meetings_created =[];

    var draft_and_test_meetings = [];

    var month = [];

    var total_real_1 = [];
    var total_real_2 = [];
    var total_real_3 = [];
    var total_real_4 = [];
    var total_real_5 = [];
    var total_real_6 = [];
    var total_real_7 = [];
    var total_real_8 = [];
    var total_real_9 = [];
    var total_real_10 = [];
    var total_real_11 = [];

    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
   
          json_body = parse_json_string(body)


      for (var key in json_body) {
         var obj = json_body[key];
         for (var prop in obj) {

            if (prop == "1_real_created"){
              total_real_1.push(obj[prop]);

            }

            if (prop == "2_real_created"){
              total_real_2.push(obj[prop]);

            }

            if (prop == "3_real_created"){
              total_real_3.push(obj[prop]);

            }

            if (prop == "4_real_created"){
              total_real_4.push(obj[prop]);

            }

            if (prop == "5_real_created"){
              total_real_5.push(obj[prop]);

            }

            if (prop == "6_real_created"){
              total_real_6.push(obj[prop]);

            }

            if (prop == "7_real_created"){
              total_real_7.push(obj[prop]);

            }

            if (prop == "8_real_created"){
              total_real_8.push(obj[prop]);

            }

            if (prop == "9_real_created"){
              total_real_9.push(obj[prop]);

            }

            if (prop == "10_real_created"){
              total_real_10.push(obj[prop]);

            }

            if (prop == "11_real_created"){
              total_real_11.push(obj[prop]);

            }

          


            if (prop == "month"){
              month.push(obj[prop]);

            } 

            
         }
      }
      for (var i = 0; i < total_meetings_created.length; i++){
    
         draft_and_test_meetings[i] = total_meetings_created[i]-total_real_meetings_created[i];
         

      }
        
     //console.log(total_real_1,total_real_2)
     registered = {
              chart: {
                  renderTo: 'container',
                  type: 'line',
                  zoomType: 'x',
                  spacingRight: 20,
                  backgroundColor:'#00a0cd'
              },
              title: {
                  text: 'Users registered within 3 months with "n" real meeting',
                   style: {
                    color: '#FFFFFF'
                  }
              },
              subtitle: {
                  text: 'Source: Meetin.gs',
                   style: {
                    color: '#FFFFFF'
                  }
              },
              xAxis: {
                  categories: month,
                  labels: {
                  style: {
                      color: 'white'
                  }
              }
              },
              yAxis: {
                  title: {
                      text: '',
                       style: {
                    color: '#FFFFFF'
                  }
                  },
                  labels: {
                  style: {
                      color: 'white'
                  }
              }
              },
              tooltip: {
                  enabled: true,
                  formatter: function() {
                      return '<b>'+ this.series.name +'</b><br/>'+
                         + this.y + '' ;
                  }
              },
              plotOptions: {
                  area: {
                      dataLabels: {
                          borderWidth: 0,
                          enabled: true,
                          style: {
                          fontWeight:'bold'
                           }
                      },
                      stacking: 'normal',
                      lineColor: '#666666',
                      lineWidth: 0,
                      marker: {
                          lineWidth: 1,
                          lineColor: '#666666'
                      },
                      fillOpacity: 1.0
                  }
              },
              series: [{ 
                  color: '#acacac',
                  name: 'n=11',
                  data: total_real_11,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },
              { 
                  color: '#acacac',
                  name: 'n=10',
                  data: total_real_10,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },
              { 
                  color: '#acacac',
                  name: 'n=9',
                  data: total_real_9,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },
              { 
                  color: '#acacac',
                  name: 'n=8',
                  data: total_real_8,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },
              { 
                  color: '#acacac',
                  name: 'n=7',
                  data: total_real_7,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },
              
              { 
                  color: '#acacac',
                  name: 'n=6',
                  data: total_real_6,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },
              { 
                  color: '#acacac',
                  name: 'n=5',
                  data: total_real_5,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },{ 
                  color: '#acacac',
                  name: 'n=4',
                  data: total_real_4,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },{ 
                  color: '#e370a9',
                  name: 'n=3',
                  data: total_real_3,
                  dataLabels: {x: 20, y:9,color:'white',enabled:true}

              },{ 
                  color: '#f69d5e',
                  name: 'n=2',
                  data: total_real_2,
                  dataLabels: {x: 20, y:9,color:'white',enabled:true}

              },
              { color: '#8cc864',
                  name: 'n=1',
                  data: total_real_1,
                  dataLabels: {x: -16, y:15,color:'white',enabled:true},
              }]
          }

      }

});



 // console.log(JSON.stringify(registered))
 
return JSON.stringify(registered)
}

var organizers =""
var a_real_meeting_by_month = [];

var three_real_meetings_by_month =[];

var five_real_meetings_by_month = [];
var month = [];
var data1 = [];
var data2= [];
var data3= [];
var data4 = [];

function reg_organizers(){
  var url1 = "https://meetingstats.dicole.net/js/stats/jsonv/total_users_who_have_created_a_real_meeting_by_month.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/stats/jsonv/total_users_who_have_created_3_real_meetings_by_month.jsonv"
  var url3 = "https://meetingstats.dicole.net/js/stats/jsonv/total_users_who_have_created_5_real_meetings_by_month.jsonv"


  var with_agenda_an_ap =[];

  var with_agenda = [];


  request(url1, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        a_real_meeting_by_month = [];
   
        json_body = parse_json_string(body)
          for (var key in json_body) {
            var obj = json_body[key];
            for (var prop in obj) {

              if (prop == "count"){
                a_real_meeting_by_month.push(obj[prop]);

              }

            }
        }

    
      }


  });
  request(url2, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        three_real_meetings_by_month =[];
        month = [];
  
        json_body = parse_json_string(body)
        for (var key in json_body) {
          var obj = json_body[key];
          for (var prop in obj) {

            if (prop == "count"){
              three_real_meetings_by_month.push(obj[prop]);

            }
       
            if (prop == "month"){
                month.push(obj[prop]);

              }  

          
          }
        }
      }

});

  request(url3, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      five_real_meetings_by_month = [];
  
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            five_real_meetings_by_month.push(obj[prop]);

          }
  
        }
      }
  

    }

  });
  if(a_real_meeting_by_month.length == three_real_meetings_by_month.length && three_real_meetings_by_month.length ==five_real_meetings_by_month.length && a_real_meeting_by_month.length == five_real_meetings_by_month.length){
   //console.log(a_real_meeting_by_month,three_real_meetings_by_month,five_real_meetings_by_month)
    for (var i = 0; i < a_real_meeting_by_month.length; i++){
       
        
      data1[i] = three_real_meetings_by_month[i]-five_real_meetings_by_month[i];

        
      data2[i] = a_real_meeting_by_month[i] - data1[i] - five_real_meetings_by_month[i];
        

    }
    organizers = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#00a0cd'
            },
            title: {
                text: 'Registered organizers, cumulative',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: 'Source: Meetin.gs',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: month,
                style: {
                  color: '#FFFFFF'
                },
                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                  color: '#FFFFFF'
                }
                },
                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                       + this.y + '' ;
                }
            },
            plotOptions: {
                area: {
                    dataLabels: {
                        borderWidth: 0,
                        enabled: true,
                        style: {
                        fontWeight:'bold'
                         }
                    },
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 0,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    },
                    fillOpacity: 1.0
                }
            },
            series: [{
                color: '#d6edf5',
                name: 'organized five',
                data: five_real_meetings_by_month,
                dataLabels: {x: 0, y:0,color: 'black'}
            },{ color: '#7bc8e1',
                name: 'organized three',
                data: data1,
                dataLabels: {x: -13, y:9,color: 'white'}
            },{ 
                color: '#6c6c6c',
                name: 'organized one',
                data: data2,
                dataLabels: {x: 20, y:9,color: 'white'}

            }]
        }
  }
  
 

 


return JSON.stringify(organizers)
}

var users_by_month = [];
var users_who_have_been_invited_to_or_created_a_real_meeting_by_month =[];
var draft_and_test_meetings = [];

var real_user_reg=""

var data_1 = []
var data_2= []
var data_3 = []
var data_4 = []


function real_user_registrations(){
  var url1 = "https://meetingstats.dicole.net/js/stats/jsonv/total_users_who_have_created_a_real_meeting_by_month.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/stats/jsonv/total_users_who_have_created_3_real_meetings_by_month.jsonv"
  var url3 = "https://meetingstats.dicole.net/js/stats/jsonv/total_users_who_have_created_5_real_meetings_by_month.jsonv"
  var url4 = "https://meetingstats.dicole.net/js/stats/jsonv/total_users_who_have_been_invited_to_or_created_a_real_meeting_by_month.jsonv"
  var url5 = "https://meetingstats.dicole.net/js/stats/jsonv/total_users_by_month.jsonv"
  
  var with_agenda_an_ap =[];
  var with_agenda = [];


  request(url1, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        a_real_meeting_by_month = [];
    
        json_body = parse_json_string(body)
    for (var key in json_body) {
      var obj = json_body[key];
      for (var prop in obj) {

        if (prop == "count"){
          a_real_meeting_by_month.push(obj[prop]);

        }

        
      }
    }

    

  }

  });

  request(url2, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        three_real_meetings_by_month =[];
        month = [];
       
        json_body = parse_json_string(body)

        for (var key in json_body) {
          var obj = json_body[key];
            for (var prop in obj) {

              if (prop == "count"){
                three_real_meetings_by_month.push(obj[prop]);

              }
             
              if (prop == "month"){
                  month.push(obj[prop]);

                }  

               
            }
        }

    }
  });

  request(url3, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      five_real_meetings_by_month = [];
      
      json_body = parse_json_string(body)
      for (var key in json_body) {
         var obj = json_body[key];
         for (var prop in obj) {

            if (prop == "count"){
              five_real_meetings_by_month.push(obj[prop]);

            }
           
         }
      }
  
    }
  });

  request(url4, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      users_who_have_been_invited_to_or_created_a_real_meeting_by_month = [];
   
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            users_who_have_been_invited_to_or_created_a_real_meeting_by_month.push(obj[prop]);

          }
    
        }
      }
  
    }
  });

  request(url5, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      users_by_month = [];
    
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            users_by_month.push(obj[prop]);

          }

  
        }
      }
  
    }
  });


  if(a_real_meeting_by_month.length == three_real_meetings_by_month.length && three_real_meetings_by_month.length == five_real_meetings_by_month.length && a_real_meeting_by_month.length == five_real_meetings_by_month.length&& a_real_meeting_by_month.length == users_who_have_been_invited_to_or_created_a_real_meeting_by_month.length && a_real_meeting_by_month.length == users_by_month.length){
   // console.log(a_real_meeting_by_month.length,three_real_meetings_by_month.length,five_real_meetings_by_month.length,users_by_month.length,users_who_have_been_invited_to_or_created_a_real_meeting_by_month.length )
    for (var i = 0; i < users_by_month.length; i++){
     
      data_3[i] = users_by_month[i]-users_who_have_been_invited_to_or_created_a_real_meeting_by_month[i];



    }
    for (var i = 0; i < users_who_have_been_invited_to_or_created_a_real_meeting_by_month.length; i++){
      
      data_4[i] = users_who_have_been_invited_to_or_created_a_real_meeting_by_month[i]-a_real_meeting_by_month[i];

      

    }

    for (var i = 0; i < a_real_meeting_by_month.length; i++){
       
      data_1[i] = a_real_meeting_by_month[i]-three_real_meetings_by_month[i];

      

    }

    for (var i = 0; i < three_real_meetings_by_month.length; i++){
       
      data_2[i] = three_real_meetings_by_month[i]-five_real_meetings_by_month[i];

      

    }
   // console.log(a_real_meeting_by_month,three_real_meetings_by_month,five_real_meetings_by_month )

    real_user_reg = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#00a0cd',

            },
            title: {
                text: 'Real user registrations, cumulative',
                style: {
                  color: '#FFFFFF'
                }

            },
            subtitle: {
                text: 'Source: Meetin.gs',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: month,
                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                  color: '#FFFFFF'
                }
                },labels: {
                style: {
                    color: 'white'
                }
            }
            },
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                       + this.y + '' ;
                }
            },
            plotOptions: {
                area: {
                    dataLabels: {
                        borderWidth: 0,
                        enabled: true,
                        style: {
                        fontWeight:'bold'
                         }
                    },
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 0,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    },
                    fillOpacity: 1.0
                }
            },
            series: [{ 
                color: '#e7e7e7',
                name: 'Organized 5',
                data: five_real_meetings_by_month,
                dataLabels: {x: -20, y:-9,enabled: true,
                    color: 'black'},


            },{ 
                color: '#acacac',
                name: 'Organized 3',
                data: data_2,
                dataLabels: {x: 0, y:0,enabled: true,
                    color: 'black'}

            },{ 
                color: '#d6edf5',
                name: 'Organized 1',
                data: data_1,
                dataLabels: {x: 20, y:9,enabled: true,
                    color: 'black'}

            },{ 
                color: '#7bc8e1',
                name: 'Participant',
                data: data_4,
                dataLabels: {x: 20, y:9,enabled: true,
                    color: 'white'}

            },
            { color: '#6c6c6c',
                name: 'tested',
                data: data_3,
                dataLabels: {x: 0, y:0,enabled: true,
                    color: 'white'},

            }]
        }
  }
  
 

  
 
  return JSON.stringify(real_user_reg)
}


var percentage = [];
var first_real_meeting_creator = [];
var old_creator =[];
var percent_of_new_real_result = ""
function percent_of_new_real_meeting(){

  var url1 = "https://meetingstats.dicole.net/js/stats/jsonv/monthly_first_real_meeting_creators.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/stats/jsonv/monthly_first_real_meeting_creators_who_had_been_invited_to_a_real_meeting_before.jsonv"

 
  request(url1, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      first_real_meeting_creator = [];
    
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            first_real_meeting_creator.push(obj[prop]);
          }

           
        }
      }

    }

  });
  request(url2, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      old_creator = [];
      month = [];
      
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            old_creator.push(obj[prop]);

          }
       
          if (prop == "month"){
            month.push(obj[prop]);

          }  

          
        }
      }

    }
  });


  if(first_real_meeting_creator.length == old_creator.length ){
    percentage = [] 
    for (var i = 0; i < first_real_meeting_creator.length; i++){
       
      percentage.push(parseFloat((100 * old_creator[i]/first_real_meeting_creator[i]).toFixed(0)));
    //  console.log(old_creator[i],first_real_meeting_creator[i],old_creator[i]/first_real_meeting_creator[i],percentage[i])
    //  console.log(parseFloat((100 * old_creator[i]/first_real_meeting_creator[i]).toFixed(0)))
      
    }
    //console.log(percentage)

    percent_of_new_real_result = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#00a0cd'
            },
            title: {
                text: '% of new real meeting organizers who were formerly meeting participants',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: 'Source: Meetin.gs',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: month,

                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                  color: '#FFFFFF'
                }
                },
                labels: {
                format: '{value} %',
                style: {
                    color: 'white'
                }
            }
            },
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                       + this.y + '%' ;
                }
            },
            plotOptions: {
                area: {
                    dataLabels: {
                        format: '{y} %',
                        borderWidth: 0,
                        enabled: true,
                        style: {
                        fontWeight:'bold'
                         }
                    },
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 0,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    },
                    fillOpacity: 1.0
                }
            },
            series: [
            { color: '#6c6c6c',
                name: 'Repeat organizer',
                data: percentage,
                dataLabels: {x: -16, y:15,color: 'white'}
            }]
        }
  }
  
 

  //console.log(JSON.stringify(percent_of_new_real_result))
 
  return JSON.stringify(percent_of_new_real_result)
}

var new_users = [];

var tos_acceptions =[];

var new_meetings_users = [];
var new_registered_users_result = ""

function new_registered_users_each_month(){
  var url1 = "https://meetingstats.dicole.net/js/stats/jsonv/combined_monthly_new_and_tos_accepted_users.jsonv"

  request(url1, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      new_users = [];
      tos_acceptions = [];
      new_meetings_users = [];
      month = [];

      first_real_meeting_creator = [];
      
      json_body = parse_json_string(body)
      for (var key in json_body) {
         var obj = json_body[key];
         for (var prop in obj) {

            if (prop == "new_users"){
              new_users.push(obj[prop]);

            }

            if (prop == "tos_acceptions"){
              tos_acceptions.push(obj[prop]);

            }

            if (prop == "month"){
              month.push(obj[prop]);

            }  

            
         }
      }
    
      

    }

  });
  

  if (new_users.length == tos_acceptions.length){
    new_meetings_users= []
    for (var i = 0; i < new_users.length; i++){
         
      new_meetings_users.push(new_users[i]-tos_acceptions[i])

    }
  }
  

  new_registered_users_result = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#00a0cd'
            },
            title: {
                text: 'New registered users each month',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: 'Source: Meetin.gs',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: month,

                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                  color: '#FFFFFF'
                }
                },
                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                       + this.y + '' ;
                }
            },
            plotOptions: {
                area: {
                    dataLabels: {
                        borderWidth: 0,
                        enabled: true,
                        style: {
                        fontWeight:'bold'
                         }
                    },
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 0,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    },
                    fillOpacity: 1.0
                }
            },
            series: [{ 
                color: '#7bc8e1',
                name: 'New organizers',
                data: tos_acceptions,
                dataLabels: {x: 20, y:9,color: 'white'}

            },
            { color: '#6c6c6c',
                name: 'New participants',
                data: new_meetings_users,
                dataLabels: {x: -16, y:15,color: 'white'}
            }]
        }
  
  
 

  //console.log(JSON.stringify(new_registered_users_result))
 
  return JSON.stringify(new_registered_users_result)
}


var sent_friend_invitations = [];

var sent_invitations =[];

var sent_invitations_to_new_users = [];

var sent_invitations_to_existing_users = [];

var sent_invitations_to_users_with_no_real_meetings = [];

var with_agenda_an_ap =[];

var with_agenda = [];
var monthly_sent_invitations_to_users_with_no_real_meetings_created =[];
var monthly_sent_result = ""

function monthly_sent_invitations(){
  var url1 = "https://meetingstats.dicole.net/js/stats/jsonv/monthly_sent_friend_invitations.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/stats/jsonv/monthly_sent_invitations.jsonv"
  var url3 = "https://meetingstats.dicole.net/js/stats/jsonv/monthly_sent_invitations_to_new_users.jsonv"
  var url4 = "https://meetingstats.dicole.net/js/stats/jsonv/monthly_sent_invitations_to_users_with_no_real_meetings_created.jsonv"
    
  var with_agenda_an_ap =[];

  var with_agenda = [];


    

    

  request(url1, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      sent_friend_invitations = [];
        
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            sent_friend_invitations.push(obj[prop]);

          }

          
        }
      }

        

    }

  });

  request(url2, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      sent_invitations =[];
      month = [];
       
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
          for (var prop in obj) {

            if (prop == "count"){
              sent_invitations.push(obj[prop]);

            }
         
            if (prop == "month"){
                month.push(obj[prop]);

              }  

          
         }
      }

    }
  });

  request(url3, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      sent_invitations_to_new_users = [];
    
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            sent_invitations_to_new_users.push(obj[prop]);

          }
            
        }
      }
    
      }
  });

  request(url4, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      monthly_sent_invitations_to_users_with_no_real_meetings_created = [];
    
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            monthly_sent_invitations_to_users_with_no_real_meetings_created.push(obj[prop]);

          }

       

      
        }
      }
  
    }
  });



  if(sent_friend_invitations.length == sent_invitations.length && sent_invitations.length == sent_invitations_to_new_users.length && sent_invitations_to_new_users.length == monthly_sent_invitations_to_users_with_no_real_meetings_created.length){
  
    sent_invitations_to_existing_users = []

    for (var i = 0; i < sent_friend_invitations.length; i++){
       
      sent_invitations_to_existing_users.push(sent_invitations[i]- sent_invitations_to_new_users[i]-monthly_sent_invitations_to_users_with_no_real_meetings_created[i]);
       

    }
   // console.log(sent_invitations_to_existing_users)
    

    monthly_sent_result = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#00a0cd'
            },
            title: {
                text: 'Monthly sent meeting invitations',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: 'Source: Meetin.gs',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: month,
                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                  color: '#FFFFFF'
                }
                },
                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                       + this.y + '' ;
                }
            },
            plotOptions: {
                area: {
                    dataLabels: {
                        borderWidth: 0,
                        enabled: true,
                        style: {
                        fontWeight:'bold'
                         }
                    },
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 0,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    },
                    fillOpacity: 1.0
                }
            },
            series: [{ 
                color: '#acacac',
                name: 'sent friend invitations',
                data: sent_friend_invitations,
                dataLabels: {x: 20, y:9},
                dataLabels: {x: 0, y:-8}

            },
            { color: '#d6edf5',
                name: 'sent invitations to existing users',
                data: sent_invitations_to_existing_users,
                dataLabels: {x: -16, y:15}
            },{ 
                color: '#7bc8e1',
                name: 'sent_invitations_to_users_with_no_real_meetings',
                data: monthly_sent_invitations_to_users_with_no_real_meetings_created,
                dataLabels: {x: 20, y:9}

            },{
                color: '#6c6c6c',
                name: 'sent invitations to new users',
                data: sent_invitations_to_new_users,
                dataLabels: {x: 0, y:0,color: 'white'}
            }]
        }
   }
  
 

 
 
  return JSON.stringify(monthly_sent_result)
}


var monthly_first_real_meeting_creator = [];

var old_meeting_creator =[];

var draft_and_test_meetings = [];
var monthly_organizers_result = ""

function monthly_organizers_of_real_meetings(){
  var url1 = "https://meetingstats.dicole.net/js/stats/jsonv/monthly_first_real_meeting_creators.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/stats/jsonv/monthly_real_meeting_creators_who_were_old_real_creators.jsonv"


  request(url1, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      monthly_first_real_meeting_creator = [];
      
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            monthly_first_real_meeting_creator.push(obj[prop]);

          }

            
        }
      }

      
    }


  });

  request(url2, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      old_meeting_creator =[];
      month = [];
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            old_meeting_creator.push(obj[prop]);

          }
     
          if (prop == "month"){
            month.push(obj[prop]);

          }  

        
        }
      }
    }

  });


 if(monthly_first_real_meeting_creator.length == old_meeting_creator.length){
   
   
    monthly_organizers_result = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#00a0cd'
            },
            title: {
                text: 'Monthly organizers of real meetings',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: 'Source: Meetin.gs',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: month,

                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                  color: '#FFFFFF'
                }
                },
                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                       + this.y + '' ;
                }
            },
            plotOptions: {
                area: {
                    dataLabels: {
                        borderWidth: 0,
                        enabled: true,
                        style: {
                        fontWeight:'bold'
                         }
                    },
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 0,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    },
                    fillOpacity: 1.0
                }
            },
            series: [
            { color: '#6c6c6c',
                name: 'Repeat organizer',
                data: old_meeting_creator,
                dataLabels: {x: -16, y:15,color: 'white'}
            },{ 
                color: '#7bc8e1',
                name: 'First real meeting',
                data: monthly_first_real_meeting_creator,
                dataLabels: {x: 20, y:9,color: 'white'}

            }]
        }
  }
  
 

 
 


  return JSON.stringify(monthly_organizers_result)
}



    var any_partner = [];

    var seats2meet =[];

    var slush = [];

    var kpn = [];

    var arctic_startup = [];
    var months = [];
    var monthly_new_organizers_results =""

function monthly_new_organizers_by_channel(){
  var url1 = "https://meetingstats.dicole.net/js/stats/jsonv/partnerized_combined_monthly_new_and_tos_accepted_users.jsonv"
  


    

  request(url1, function(error, response, body) {
    if (!error && response.statusCode == 200) {
     
      any_partner = [];
      seats2meet =[];
      slush = [];
      kpn = [];
      arctic_startup = [];
     
      json_body = parse_json_string(body)
      months = [];
      for (var key in json_body) {
        var obj = json_body[key];
    

        if (json_body[key].partner == "any"){
          months.push(json_body[key].month);
          any_partner.push(json_body[key].tos_acceptions)
         
        }

        if (json_body[key].partner == "Seats2meet.com"){
       
          seats2meet.push(json_body[key].tos_acceptions)
       
        }

        if (json_body[key].partner == "SLUSH"){

          slush.push(json_body[key].tos_acceptions)

       
        }

         if (json_body[key].partner == "KPN"){
      
          kpn.push(json_body[key].tos_acceptions)
         
        }
         if (json_body[key].partner == "Arctic Startup"){
     
          arctic_startup.push(json_body[key].tos_acceptions)
       
        }

       
      }
  //  console.log(any_partner,seats2meet,months)
      
    }


  });
  


 if(months.length == seats2meet.length){
   
   
    monthly_new_organizers_results = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#00a0cd'
            },
            title: {
                text: 'Meetings created, cumulative',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: 'Source: Meetin.gs',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: months,

                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                  color: '#FFFFFF'
                }
                },
                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                       + this.y + '' ;
                }
            },
            plotOptions: {
                area: {
                    dataLabels: {
                        borderWidth: 0,
                        enabled: true,
                        style: {
                        fontWeight:'bold'
                         }
                    },
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 0,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    },
                    fillOpacity: 1.0
                }
            },
            series: [
            { color: '#6c6c6c',
                name: 'Seats2meet',
                data: seats2meet,
                dataLabels: {x: 0, y:0,color: 'white'}
            },{ 
                color: '#7bc8e1',
                name: 'Meetin.gs',
                data: any_partner,
                dataLabels: {x: 20, y:9,color: 'white'}

            }]
        }
  }
  
 

 
 


  return JSON.stringify(monthly_new_organizers_results)
}


   var total_meetings_created = [];

    var total_real_meetings_created =[];

    var draft_and_test_meetings = [];
    var meetings_cum_results =""

function meetings_created_cum(){
  var url1 = "https://meetingstats.dicole.net/js/stats/jsonv/total_meetings_created_by_month.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/stats/jsonv/total_real_meetings_created_by_month.jsonv"


    

  request(url1, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      total_meetings_created = [];
    
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

         if (prop == "count"){
            total_meetings_created.push(obj[prop]);

         }

            
        }
      }

      
    }


  });
  request(url2, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      total_real_meetings_created =[];
      month = [];
   
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            total_real_meetings_created.push(obj[prop]);

          } 
     
          if (prop == "month"){
              month.push(obj[prop]);

          }  

        
        }
      }
    }

  });


 if(total_meetings_created.length == total_real_meetings_created.length){
    draft_and_test_meetings = [];
    for (var i = 0; i < total_meetings_created.length; i++){
       
      draft_and_test_meetings.push(total_meetings_created[i]-total_real_meetings_created[i]);
   

    }


   
    meetings_cum_results = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#00a0cd'
            },
            title: {
                text: 'Meetings created, cumulative',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: 'Source: Meetin.gs',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: month,

                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            yAxis: {
                title: {
                    text: '',
                    style: {
                  color: '#FFFFFF'
                }
                },
                labels: {
                style: {
                    color: 'white'
                }
            }
            },
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                       + this.y + '' ;
                }
            },
            plotOptions: {
                area: {
                    dataLabels: {
                        borderWidth: 0,
                        enabled: true,
                        style: {
                        fontWeight:'bold'
                         }
                    },
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 0,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    },
                    fillOpacity: 1.0
                }
            },
            series: [{ 
                color: '#7bc8e1',
                name: 'Real meetings',
                data: total_real_meetings_created,
                dataLabels: {x: 20, y:9,color: 'white'}

            },
            { color: '#6c6c6c',
                name: 'Draft and test meetings',
                data: draft_and_test_meetings,
                dataLabels: {x: -16, y:15,color: 'white'}
            }]
        }
  }
  
 

 
 


  return JSON.stringify(meetings_cum_results)
}




exports.repeat_users = repeat_users;
exports.registered_within_three = registered_within_three;
exports.reg_organizers = reg_organizers;
exports.real_user_registrations = real_user_registrations;
exports.percent_of_new_real_meeting = percent_of_new_real_meeting;
exports.new_registered_users_each_month = new_registered_users_each_month;
exports.monthly_sent_invitations = monthly_sent_invitations;
exports.monthly_organizers_of_real_meetings = monthly_organizers_of_real_meetings;
exports.monthly_new_organizers_by_channel = monthly_new_organizers_by_channel;
exports.meetings_created_cum = meetings_created_cum;

