//server writen in node.js to run every hour a call to wallapop api and see if there is new products using the keyword "shure sm57"
//Using the following link as an example call:
///API_url=https://api.wallapop.com/api/v3/general/search?user_province=M%C3%A1laga&keywords=shure+sm57&latitude=36.59742&start=0&user_region=Andaluc%C3%ADa&user_city=Mijas&search_id=5321bd9f-0758-40a1-ae38-572095f868d3&country_code=ES&items_count=0&density_type=20&filters_source=quick_filters&pagination_date=2022-04-06T13%3A00%3A52Z&order_by=newest&step=4&longitude=-4.63652

// app.js

const axios = require('axios')
const http = require('https')
const fs = require('fs')
const mailer = require('nodemailer')
const termSearch = 'shure sm57'
//Variable saving the result of the call to wallapop api
var result
var result_old
// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
  // Set a response type of plain text for the response
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  // Send back a response and end the connection
  res.end(result)
})
// Start the server on port 3000
app.listen(3000, '127.0.0.1')

//The same function but using axios instead of http
 setInterval(function () {
    termSearch.replace(/ /g, '+')
   axios.get(
        'https://api.wallapop.com/api/v3/general/search?user_province=M%C3%A1laga&keywords=' +
        termSearch +
        '&latitude=36.59742&start=0&user_region=Andaluc%C3%ADa&user_city=Mijas&search_id=5321bd9f-0758-40a1-ae38-572095f868d3&country_code=ES&items_count=0&density_type=20&filters_source=quick_filters&pagination_date=2022-04-06T13%3A00%3A52Z&order_by=newest&step=4&longitude=-4.63652'
        )
        .then(function (response) {
            console.log(response.data);
            //save the old result   
            result_old = result
            result = response.data

            //If the result is different from the previous result
            //then send and email of alert to the user matvetron@gmail.com
          
            //also save in a file
            fs.writeFile('result.json', JSON.stringify(response.data), function (err) {
                if (err) throw err;
                //cOnsole.log('Saved!
                console.log('Saved!');
            });

        })
        .catch(function (error) {
            console.log(error);
        });
}, 20000) //3600000 milliseconds = 1 hour
//Listener for new products in wallapop api with the keyword "shure sm57"

console.log('Node server running on port 3000')
