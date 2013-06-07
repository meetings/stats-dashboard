

var dummy = "{      chart: {         renderTo: 'container',         plotBackgroundColor: 'rgba(35,37,38,0)',  	 backgroundColor: 'rgba(35,37,38,100)',		 borderColor: 'rgba(35,37,38,100)',		 lineColor: 'rgba(35,37,38,100)',		 plotBorderColor: 'rgba(35,37,38,100)',         plotBorderWidth: null,         plotShadow: false,		 height: 170      },	colors: [		'#058DC7', 		'#50B432', 		'#EF561A'	],	  credits: {         enabled: false	  },      title: {         text: null      },      tooltip: {         formatter: function() {            return '<b>'+ this.point.name +'</b>: '+ this.y +' users';         }      },	  legend: {		borderColor: 'rgba(35,37,38,100)',		itemWidth: 55,		margin: 5,		width: 200	  },      plotOptions: {         pie: {			animation: true,            allowPointSelect: true,            cursor: 'pointer',            dataLabels: {               enabled: false            },            showInLegend: true,			size: '100%'         }      },       series: [{         type: 'pie',         name: 'New vs Returning',         data: [            ['Free', 13491],            {               name: 'Basic',                   y: 1882,               sliced: true,               selected: true            },	        ['Premium', 313]         ]      }]   }";

var url = "https://meetingstats.dicole.net/js/stats.ba/total_meetings_created_by_month.jsonv"




var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(dummy);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

/*http.get(url, function(res) {
      var body = '';

      res.on('data', function(chunk) {
         body += chunk;
      });

      res.on('end', function() {
        var fbResponse = JSON.parse(body)
        console.log("Got response: " + fbResponse);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
 });
*/