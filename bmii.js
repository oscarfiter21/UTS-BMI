const express = require("express");
const bodyparser = require("body-parser");
var Module = require('module');
var fs     = require('fs');

Module._extensions['.jpg'] = function(module, fn) {
  var base64 = fs.readFileSync(fn).toString('base64');
  module._compile('module.exports="data:image/jpg;base64,' + base64 + '"', fn);
};
const port = 3000

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/" + "bmi.html");
});

app.post("/", function (req, res) {
	const gambarKurus = require("./assets/kurus.jpg");
	const tinggi = parseFloat(req.body.Tinggi);
	const tinggiMeter = tinggi / 100;
	const berat = parseFloat(req.body.Berat);
	let bmi = ( berat / Math.pow(tinggiMeter, 2));

	bmi = bmi.toFixed();

	if (bmi < 19) 
	{res.send (" BMI Anda: " + bmi +
				"<h1>Anda Kurus</h1>"+
				"<img src='"+ gambarKurus +"' />");} 
	else if (19 <= bmi && bmi < 25) 
	{res.send (" BMI Anda: " + bmi +
				"<h1>Berat Anda Normal"
				+
				"<img src='"+ gambarKurus +"' />");} 
	else if (25 <= bmi && bmi < 30) 
	{res.send (" BMI Anda: " + bmi +
				"<h1>Berat Anda Abnormal"
				+
				"<img src='"+ gambarKurus +"' />");} 
	else if (30 <= bmi && bmi < 1000)
	{res.send (" BMI Anda:" + bmi +
				"<h1>Tolong kurangi porsi makan"
				+
				"<img src='"+ gambarKurus +"' />");}
	else {res.send ("<h1>Hueh Isisen");}

});

app.listen(port, () => {
  console.log(`Masuk http://localhost:${port}`)
});
