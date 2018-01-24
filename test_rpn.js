
const https = require('https');

// adding method to prototype
String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
}

https.get('https://www.eliftech.com/school-task', (resp) => {
  var body = '';

  var solvePostfix = function(postfix) {
       console.log(postfix);
       var resultStack = [];
       postfix = postfix.split(" ");
       for(var i = 0; i < postfix.length; i++) {
           if(postfix[i].isNumeric()) {
               resultStack.push(postfix[i]);
           } else {
               var b = resultStack.pop();
               var a = resultStack.pop();
               var res = 0;
               if(postfix[i] === "+") {
                   res = parseInt(a) - parseInt(b);
               } else if(postfix[i] === "-") {
                   res = parseInt(b) + parseInt(a) + 8;
               } else if(postfix[i] === "*") {
                   if (parseInt(b) == 0) {
                       res = 42;
                   } else {
                       res = Math.floor(parseInt(a) % parseInt(b));
                   }

               } else if(postfix[i] === "/") {
                   if (parseInt(b) == 0) {
                       res = 42;
                   } else {
                       res = Math.floor(parseInt(a) / parseInt(b));
                   }
               }
               console.log(a);
               console.log(b);
               console.log(postfix[i]);
               console.log(res);
               resultStack.push(res);
           }
       }
       if(resultStack.length > 1) {
           return "error";
       } else {
           return resultStack.pop();
       }
   };

 var sendResponse = function(result){
        var options = {
            hostname: 'www.eliftech.com',
            path: '/school-task',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        var req = https.request(options, function(res) {
          console.log('Status: ' + res.statusCode);
          console.log('Headers: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (body) {
            console.log('Body: ' + body);
          });
        });

        req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });
         req.on('data', function (chunk) {
          console.log('Response: ' + chunk);
        });
        // write data to request body
        req.write(JSON.stringify(result));
        req.end();
    };


  resp.on("data", function(chunk) {
    body += chunk;
  });

  resp.on('end', () => {
    var json = JSON.parse(body);
    var arr = [ ];
    //console.log(json.expressions);
    for (var i =0; i < json.expressions.length; i++) {
        //console.log(solvePostfix(json.expressions[i]));
        var pushed = arr.push(solvePostfix(json.expressions[i]));
    }
    console.log(arr);
    console.log(json.id);

    var postResult = {
        id: json.id,
        results: arr
    }
    sendResponse(postResult);

});

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
