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

window.weekly_real_meeting_creators_who_were_old_users = [{"count":36,"week":"2012_04"},{"count":42,"week":"2012_05"},{"count":26,"week":"2012_06"},{"count":24,"week":"2012_07"},{"count":36,"week":"2012_08"},{"count":37,"week":"2012_09"},{"count":63,"week":"2012_10"},{"count":52,"week":"2012_11"},{"count":49,"week":"2012_12"},{"count":77,"week":"2013_01"},{"count":67,"week":"2013_02"},{"count":52,"week":"2013_03"},{"count":65,"week":"2013_04"},{"count":76,"week":"2013_05"}];

Output example:

OUTPUT data from a function
  {"chart":{"renderTo":"container","type":"area","zoomType":"x","spacingRight":20,"backgroundColor":"#00a0cd"},"title":{"text":"Repeat users","style":{"color":"#FFFFFF"}},"subtitle":{"text":"","style":{"color":"#FFFFFF"}},"xAxis":{"categories":["2012_04","2012_05","2012_06","2012_07","2012_08","2012_09","2012_10","2012_11","2012_12","2013_01","2013_02","2013_03","2013_04","2013_05"],"labels":{"style":{"color":"white"}}},"yAxis":{"title":{"text":"","style":{"color":"#FFFFFF"}},"labels":{"style":{"color":"white"}}},"tooltip":{"enabled":true},"plotOptions":{"area":{"dataLabels":{"borderWidth":0,"enabled":true,"style":{"fontWeight":"bold"}},"stacking":"normal","lineColor":"#666666","lineWidth":0,"marker":{"lineWidth":1,"lineColor":"#666666"},"fillOpacity":1}},"series":[{"color":"#6c6c6c","name":"Repeat users","data":[36,42,26,24,36,37,63,52,49,77,67,52,65,76],"dataLabels":{"x":20,"y":9,"color":"white"}}]}

Color scheme from dark to light:
#0A4E7D
#346A90
#1E7CBE
#489DD9
#66A9D9

*/



var http = require('http');
var request = require('request');


function shorten_to_n_items(input_array,n){

  var length_of_array = input_array.length;

  var output_array = input_array.splice(length_of_array-n)

  return(output_array)


}


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
 var url = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/weekly_real_meeting_creators_who_were_old_users.jsonv"
  var old_user = [];
  var week = [];

  request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {


        json_body = parse_json_string(body)



        for (var key in json_body) {
           var obj = json_body[key];
           for (var prop in obj) {

              if (prop == "count"){
                old_user.push(obj[prop]);

              }
              if (prop == "week"){
                week.push(obj[prop]);

                  }

               }
        }
        //remove all data from arrays except last 6 weeks
        old_user = shorten_to_n_items(old_user,6)
        week = shorten_to_n_items(week,6)

       repeat = {
                chart: {
                    renderTo: 'container',
                    type: 'area',
                    zoomType: 'x',
                    spacingRight: 20,
                    backgroundColor:'#2a2a2a'
                },
                title: {
                    text: '',
                    style: {
                      color: '#FFFFFF'
                    }
                },
                subtitle: {
                    text: '',
                    style: {
                      color: '#FFFFFF'
                    }
                },
                xAxis: {
                    categories: week,

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
                    color: '#0D5487',
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
    var url = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/combined_weekly_users_with_n_real_created_as_any_user_within_a_3_week_window.jsonv"
    var total_meetings_created = [];

    var total_real_meetings_created =[];

    var draft_and_test_meetings = [];

    var week = [];

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




            if (prop == "week"){
              week.push(obj[prop]);

            }


         }
      }
      for (var i = 0; i < total_meetings_created.length; i++){

         draft_and_test_meetings[i] = total_meetings_created[i]-total_real_meetings_created[i];


      }

      //remove all data from arrays except last 6 weeks
      week = shorten_to_n_items(week,6)
      total_real_11 = shorten_to_n_items(total_real_11,6)
      total_real_10 = shorten_to_n_items(total_real_10,6)
      total_real_9 = shorten_to_n_items(total_real_9,6)
      total_real_8 = shorten_to_n_items(total_real_8,6)
      total_real_7 = shorten_to_n_items(total_real_7,6)
      total_real_6 = shorten_to_n_items(total_real_6,6)
      total_real_5 = shorten_to_n_items(total_real_5,6)
      total_real_4 = shorten_to_n_items(total_real_4,6)
      total_real_3 = shorten_to_n_items(total_real_3,6)
      total_real_2 = shorten_to_n_items(total_real_2,6)
      total_real_1 = shorten_to_n_items(total_real_1,6)



     registered = {
              chart: {
                  renderTo: 'container',
                  type: 'line',
                  zoomType: 'x',
                  spacingRight: 20,
                  backgroundColor:'#2a2a2a'
              },
              title: {
                  text: '',
                   style: {
                    color: '#FFFFFF'
                  }
              },
              subtitle: {
                  text: '',
                   style: {
                    color: '#FFFFFF'
                  }
              },
              xAxis: {
                  categories: week,
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
              legend: {

            itemStyle: {

                color: '#ffffff'
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
                  color: '#B2DFFF',
                  name: 'n=11',
                  data: total_real_11,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },
              {
                  color: '#A4D9FF',
                  name: 'n=10',
                  data: total_real_10,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },
              {
                  color: '#8AB7D7',
                  name: 'n=9',
                  data: total_real_9,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },
              {
                  color: '#4F95C7',
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
                  color: '#469cab',
                  name: 'n=6',
                  data: total_real_6,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },
              {
                  color: '#6FAFDC',
                  name: 'n=5',
                  data: total_real_5,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },{
                  color: '#4DA1DC',
                  name: 'n=4',
                  data: total_real_4,
                  dataLabels: {x: 0, y:20,color:'white',enabled:true}

              },{
                  color: '#1E7CBE',
                  name: 'n=3',
                  data: total_real_3,
                  dataLabels: {x: 20, y:9,color:'white',enabled:true}

              },{
                  color: '#326D96',
                  name: 'n=2',
                  data: total_real_2,
                  dataLabels: {x: 20, y:9,color:'white',enabled:true}

              },
              { color: '#0D5487',
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
var a_real_meeting_by_week = [];

var three_real_meetings_by_week =[];

var five_real_meetings_by_week = [];
var week = [];
var data1 = [];
var data2= [];
var data3= [];
var data4 = [];

function reg_organizers(){
  var url1 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/total_users_who_have_created_a_real_meeting_by_week.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/total_users_who_have_created_3_real_meetings_by_week.jsonv"
  var url3 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/total_users_who_have_created_5_real_meetings_by_week.jsonv"


  var with_agenda_an_ap =[];

  var with_agenda = [];


  request(url1, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        a_real_meeting_by_week = [];

        json_body = parse_json_string(body)
          for (var key in json_body) {
            var obj = json_body[key];
            for (var prop in obj) {

              if (prop == "count"){
                a_real_meeting_by_week.push(obj[prop]);

              }

            }
        }


      }


  });
  request(url2, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        three_real_meetings_by_week =[];
        week = [];

        json_body = parse_json_string(body)
        for (var key in json_body) {
          var obj = json_body[key];
          for (var prop in obj) {

            if (prop == "count"){
              three_real_meetings_by_week.push(obj[prop]);

            }

            if (prop == "week"){
                week.push(obj[prop]);

              }


          }
        }
      }

});

  request(url3, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      five_real_meetings_by_week = [];

      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            five_real_meetings_by_week.push(obj[prop]);

          }

        }
      }


    }

  });
  if(a_real_meeting_by_week.length == three_real_meetings_by_week.length && three_real_meetings_by_week.length ==five_real_meetings_by_week.length && a_real_meeting_by_week.length == five_real_meetings_by_week.length){
   //console.log(a_real_meeting_by_week,three_real_meetings_by_week,five_real_meetings_by_week)
    for (var i = 0; i < a_real_meeting_by_week.length; i++){


      data1[i] = three_real_meetings_by_week[i]-five_real_meetings_by_week[i];


      data2[i] = a_real_meeting_by_week[i] - data1[i] - five_real_meetings_by_week[i];


    }

    five_real_meetings_by_week = shorten_to_n_items(five_real_meetings_by_week,6)
    week = shorten_to_n_items(week,6)
    data1 = shorten_to_n_items(data1,6)
    data2 = shorten_to_n_items(data2,6)

    organizers = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#2a2a2a'
            },
            title: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: week,
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
            legend: {

            itemStyle: {

                color: '#ffffff'
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
                        color: 'white',
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
                color: '#1E7CBE',
                name: 'organized five',
                data: five_real_meetings_by_week,
                dataLabels: {x: 0, y:0,color: 'white'}
            },{ color: '#326D96',
                name: 'organized three',
                data: data1,
                dataLabels: {x: -13, y:9,color: 'white'}
            },{
                color: '#0D5487',
                name: 'organized one',
                data: data2,
                dataLabels: {x: 20, y:9,color: 'white'}

            }]
        }
  }






return JSON.stringify(organizers)
}

var users_by_week = [];
var users_who_have_been_invited_to_or_created_a_real_meeting_by_week =[];
var draft_and_test_meetings = [];

var real_user_reg=""

var data_1 = []
var data_2= []
var data_3 = []
var data_4 = []


function real_user_registrations(){
  var url1 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/total_users_who_have_created_a_real_meeting_by_week.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/total_users_who_have_created_3_real_meetings_by_week.jsonv"
  var url3 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/total_users_who_have_created_5_real_meetings_by_week.jsonv"
  var url4 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/total_users_who_have_been_invited_to_or_created_a_real_meeting_by_week.jsonv"
  var url5 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/total_users_by_week.jsonv"

  var with_agenda_an_ap =[];
  var with_agenda = [];


  request(url1, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        a_real_meeting_by_week = [];

        json_body = parse_json_string(body)
    for (var key in json_body) {
      var obj = json_body[key];
      for (var prop in obj) {

        if (prop == "count"){
          a_real_meeting_by_week.push(obj[prop]);

        }


      }
    }



  }

  });

  request(url2, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        three_real_meetings_by_week =[];
        week = [];

        json_body = parse_json_string(body)

        for (var key in json_body) {
          var obj = json_body[key];
            for (var prop in obj) {

              if (prop == "count"){
                three_real_meetings_by_week.push(obj[prop]);

              }

              if (prop == "week"){
                  week.push(obj[prop]);

                }


            }
        }

    }
  });

  request(url3, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      five_real_meetings_by_week = [];

      json_body = parse_json_string(body)
      for (var key in json_body) {
         var obj = json_body[key];
         for (var prop in obj) {

            if (prop == "count"){
              five_real_meetings_by_week.push(obj[prop]);

            }

         }
      }

    }
  });

  request(url4, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      users_who_have_been_invited_to_or_created_a_real_meeting_by_week = [];

      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            users_who_have_been_invited_to_or_created_a_real_meeting_by_week.push(obj[prop]);

          }

        }
      }

    }
  });

  request(url5, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      users_by_week = [];

      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            users_by_week.push(obj[prop]);

          }


        }
      }

    }
  });


  if(a_real_meeting_by_week.length == three_real_meetings_by_week.length && three_real_meetings_by_week.length == five_real_meetings_by_week.length && a_real_meeting_by_week.length == five_real_meetings_by_week.length&& a_real_meeting_by_week.length == users_who_have_been_invited_to_or_created_a_real_meeting_by_week.length && a_real_meeting_by_week.length == users_by_week.length){
   // console.log(a_real_meeting_by_week.length,three_real_meetings_by_week.length,five_real_meetings_by_week.length,users_by_week.length,users_who_have_been_invited_to_or_created_a_real_meeting_by_week.length )
    for (var i = 0; i < users_by_week.length; i++){

      data_3[i] = users_by_week[i]-users_who_have_been_invited_to_or_created_a_real_meeting_by_week[i];



    }
    for (var i = 0; i < users_who_have_been_invited_to_or_created_a_real_meeting_by_week.length; i++){

      data_4[i] = users_who_have_been_invited_to_or_created_a_real_meeting_by_week[i]-a_real_meeting_by_week[i];



    }

    for (var i = 0; i < a_real_meeting_by_week.length; i++){

      data_1[i] = a_real_meeting_by_week[i]-three_real_meetings_by_week[i];



    }

    for (var i = 0; i < three_real_meetings_by_week.length; i++){

      data_2[i] = three_real_meetings_by_week[i]-five_real_meetings_by_week[i];



    }
   // console.log(a_real_meeting_by_week,three_real_meetings_by_week,five_real_meetings_by_week )


   week = shorten_to_n_items(week,6)
   five_real_meetings_by_week = shorten_to_n_items(five_real_meetings_by_week,6)
    data_1 = shorten_to_n_items(data_1,6)
    data_2 = shorten_to_n_items(data_2,6)
    data_3 = shorten_to_n_items(data_3,6)
    data_4 = shorten_to_n_items(data_4,6)


    real_user_reg = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#2a2a2a',

            },
            title: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }

            },
            subtitle: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: week,
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
            legend: {

            itemStyle: {

                color: '#ffffff'
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
                color: '#6FAFDC',
                name: 'Organized 5',
                data: five_real_meetings_by_week,
                dataLabels: {x: -20, y:-9,enabled: true,
                    color: 'white'},


            },{
                color: '#4DA1DC',
                name: 'Organized 3',
                data: data_2,
                dataLabels: {x: 0, y:0,enabled: true,
                    color: 'white'}

            },{
                color: '#1E7CBE',
                name: 'Organized 1',
                data: data_1,
                dataLabels: {x: 20, y:9,enabled: true,
                    color: 'white'}

            },{
                color: '#326D96',
                name: 'Participant',
                data: data_4,
                dataLabels: {x: 20, y:9,enabled: true,
                    color: 'white'}

            },
            { color: '#0D5487',
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

  var url1 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/weekly_first_real_meeting_creators.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/weekly_first_real_meeting_creators_who_had_been_invited_to_a_real_meeting_before.jsonv"


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
      week = [];

      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            old_creator.push(obj[prop]);

          }

          if (prop == "week"){
            week.push(obj[prop]);

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

    week = shorten_to_n_items(week,6)
    percentage = shorten_to_n_items(percentage,6)
    //console.log(percentage)

    percent_of_new_real_result = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#2a2a2a'
            },
            title: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: week,

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
            legend: {

            itemStyle: {

                color: '#ffffff'
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
            { color: '#0D5487',
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

function new_registered_users_each_week(){
  var url1 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/combined_weekly_new_and_tos_accepted_users.jsonv"

  request(url1, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      new_users = [];
      tos_acceptions = [];
      new_meetings_users = [];
      week = [];

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

            if (prop == "week"){
              week.push(obj[prop]);

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


  tos_acceptions = shorten_to_n_items(tos_acceptions,6)
  new_meetings_users = shorten_to_n_items(new_meetings_users,6)
  week = shorten_to_n_items(week,6)

  new_registered_users_result = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#2a2a2a'
            },
            title: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: week,

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
            legend: {

            itemStyle: {

                color: '#ffffff'
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
                color: '#326D96',
                name: 'New organizers',
                data: tos_acceptions,
                dataLabels: {x: 20, y:9,color: 'white'}

            },
            { color: '#0D5487',
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
var weekly_sent_invitations_to_users_with_no_real_meetings_created =[];
var weekly_sent_result = ""

function weekly_sent_invitations(){
  var url1 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/weekly_sent_friend_invitations.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/weekly_sent_invitations.jsonv"
  var url3 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/weekly_sent_invitations_to_new_users.jsonv"
  var url4 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/weekly_sent_invitations_to_users_with_no_real_meetings_created.jsonv"

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
      week = [];

      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
          for (var prop in obj) {

            if (prop == "count"){
              sent_invitations.push(obj[prop]);

            }

            if (prop == "week"){
                week.push(obj[prop]);

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
      weekly_sent_invitations_to_users_with_no_real_meetings_created = [];

      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            weekly_sent_invitations_to_users_with_no_real_meetings_created.push(obj[prop]);

          }




        }
      }

    }
  });



  if(sent_friend_invitations.length == sent_invitations.length && sent_invitations.length == sent_invitations_to_new_users.length && sent_invitations_to_new_users.length == weekly_sent_invitations_to_users_with_no_real_meetings_created.length){

    sent_invitations_to_existing_users = []

    for (var i = 0; i < sent_friend_invitations.length; i++){

      sent_invitations_to_existing_users.push(sent_invitations[i]- sent_invitations_to_new_users[i]-weekly_sent_invitations_to_users_with_no_real_meetings_created[i]);


    }
   // console.log(sent_invitations_to_existing_users)
    week = shorten_to_n_items(week,6)

    sent_friend_invitations = shorten_to_n_items(sent_friend_invitations,6)
    sent_invitations_to_existing_users = shorten_to_n_items(sent_invitations_to_existing_users,6)
    weekly_sent_invitations_to_users_with_no_real_meetings_created = shorten_to_n_items(weekly_sent_invitations_to_users_with_no_real_meetings_created,6)
    sent_invitations_to_new_users = shorten_to_n_items(sent_invitations_to_new_users,6)

    weekly_sent_result = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#2a2a2a'
            },
            title: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: week,
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
            legend: {

            itemStyle: {

                color: '#ffffff'
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
                color: '#4DA1DC',
                name: 'sent friend invitations',
                data: sent_friend_invitations,

                dataLabels: {x: 0, y:-8,color: 'white'}

            },
            { color: '#1E7CBE',
                name: 'sent invitations to existing users',
                data: sent_invitations_to_existing_users,
                dataLabels: {x: -16, y:15,color: 'white'}
            },{
                color: '#326D96',
                name: 'sent_invitations_to_users_with_no_real_meetings',
                data: weekly_sent_invitations_to_users_with_no_real_meetings_created,
                dataLabels: {x: 20, y:9,color: 'white'}

            },{
                color: '#0D5487',
                name: 'sent invitations to new users',
                data: sent_invitations_to_new_users,
                dataLabels: {x: 0, y:0,color: 'white'}
            }]
        }
   }





  return JSON.stringify(weekly_sent_result)
}


var weekly_first_real_meeting_creator = [];

var old_meeting_creator =[];

var draft_and_test_meetings = [];
var weekly_organizers_result = ""

function weekly_organizers_of_real_meetings(){
  var url1 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/weekly_first_real_meeting_creators.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/weekly_real_meeting_creators_who_were_old_real_creators.jsonv"


  request(url1, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      weekly_first_real_meeting_creator = [];

      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            weekly_first_real_meeting_creator.push(obj[prop]);

          }


        }
      }


    }


  });

  request(url2, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      old_meeting_creator =[];
      week = [];
      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            old_meeting_creator.push(obj[prop]);

          }

          if (prop == "week"){
            week.push(obj[prop]);

          }


        }
      }
    }

  });


 if(weekly_first_real_meeting_creator.length == old_meeting_creator.length){

    old_meeting_creator = shorten_to_n_items(old_meeting_creator,6)
    week = shorten_to_n_items(week,6)
    weekly_first_real_meeting_creator = shorten_to_n_items(weekly_first_real_meeting_creator,6)


    weekly_organizers_result = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#2a2a2a'
            },
            title: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: week,

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
            legend: {

            itemStyle: {

                color: '#ffffff'
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
            { color: '#326D96',
                name: 'Repeat organizer',
                data: old_meeting_creator,
                dataLabels: {x: -16, y:15,color: 'white'}
            },{
                color: '#0D5487',
                name: 'First real meeting',
                data: weekly_first_real_meeting_creator,
                dataLabels: {x: 20, y:9,color: 'white'}

            }]
        }
  }







  return JSON.stringify(weekly_organizers_result)
}



    var any_partner = [];

    var seats2meet =[];

    var slush = [];

    var kpn = [];

    var arctic_startup = [];
    var weeks = [];
    var weekly_new_organizers_results =""

function weekly_new_organizers_by_channel(){
  var url1 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/partnerized_combined_weekly_new_and_tos_accepted_users.jsonv"





  request(url1, function(error, response, body) {
    if (!error && response.statusCode == 200) {

      any_partner = [];
      seats2meet =[];
      slush = [];
      kpn = [];
      arctic_startup = [];

      json_body = parse_json_string(body)
      weeks = [];
      for (var key in json_body) {
        var obj = json_body[key];


        if (json_body[key].partner == "any"){
          weeks.push(json_body[key].week);
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
  //  console.log(any_partner,seats2meet,weeks)

    }


  });



 if(weeks.length == seats2meet.length){
    seats2meet = shorten_to_n_items(seats2meet,6)
    any_partner = shorten_to_n_items(any_partner,6)
    weeks = shorten_to_n_items(weeks,6)

    weekly_new_organizers_results = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#2a2a2a'
            },
            title: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: weeks,

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
            legend: {

            itemStyle: {

                color: '#ffffff'
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
            { color: '#326D96',
                name: 'Seats2meet',
                data: seats2meet,
                dataLabels: {x: 0, y:0,color: 'white'}
            },{
                color: '#0D5487',
                name: 'Meetin.gs',
                data: any_partner,
                dataLabels: {x: 20, y:9,color: 'white'}

            }]
        }
  }







  return JSON.stringify(weekly_new_organizers_results)
}


   var total_meetings_created = [];

    var total_real_meetings_created =[];

    var draft_and_test_meetings = [];
    var meetings_cum_results =""

function meetings_created_cum(){
  var url1 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/total_meetings_created_by_week.jsonv"
  var url2 = "https://meetingstats.dicole.net/js/weekly_stats/jsonv/total_real_meetings_created_by_week.jsonv"




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
      week = [];

      json_body = parse_json_string(body)
      for (var key in json_body) {
        var obj = json_body[key];
        for (var prop in obj) {

          if (prop == "count"){
            total_real_meetings_created.push(obj[prop]);

          }

          if (prop == "week"){
              week.push(obj[prop]);

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

    total_real_meetings_created = shorten_to_n_items(total_real_meetings_created,6)
    draft_and_test_meetings = shorten_to_n_items(draft_and_test_meetings,6)
    week = shorten_to_n_items(week,6)

    meetings_cum_results = {
            chart: {
                renderTo: 'container',
                type: 'area',
                zoomType: 'x',
                spacingRight: 20,
                backgroundColor:'#2a2a2a'
            },
            title: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            subtitle: {
                text: '',
                style: {
                  color: '#FFFFFF'
                }
            },
            xAxis: {
                categories: week,

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
            legend: {

            itemStyle: {

                color: '#ffffff'
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
                color: '#326D96',
                name: 'Real meetings',
                data: total_real_meetings_created,
                dataLabels: {x: 20, y:9,color: 'white'}

            },
            { color: '#0D5487',
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
exports.new_registered_users_each_week = new_registered_users_each_week;
exports.weekly_sent_invitations = weekly_sent_invitations;
exports.weekly_organizers_of_real_meetings = weekly_organizers_of_real_meetings;
exports.weekly_new_organizers_by_channel = weekly_new_organizers_by_channel;
exports.meetings_created_cum = meetings_created_cum;

