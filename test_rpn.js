const https = require('https');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
// adding method to prototype
String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
}

https.get('https://www.eliftech.com/school-task', (resp) => {
  var body = '';

   var solvePostfix = function(postfix) {
        var resultStack = [];
        postfix = postfix.split(" ");
        for(var i = 0; i < postfix.length; i++) {
            if(postfix[i].isNumeric()) {
                resultStack.push(postfix[i]);
            } else {
                var a = resultStack.pop();
                var b = resultStack.pop();
                if(postfix[i] === "+") {
                    resultStack.push(parseInt(a) - parseInt(b));
                } else if(postfix[i] === "-") {
                    resultStack.push(parseInt(b) + parseInt(a) + 8);

                } else if(postfix[i] === "*") {
                    if (parseInt(b) == 0) {
                        resultStack.push(42);
                    } else {
                        resultStack.push(parseInt(a) % parseInt(b));
                    }

                } else if(postfix[i] === "/") {
                    if (parseInt(a) == 0) {
                        resultStack.push(42);
                    } else {
                        resultStack.push(parseInt(b) / parseInt(a));
                    }
                }
            }
        }
        if(resultStack.length > 1) {
            return "error";
        } else {
            return resultStack.pop();
        }
    }

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
  });
}

  test_rpn.post('/test_rpn', urlencodedParser, function(req, res) {
    console.log('test_rpn-success', {data: req.body});
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
