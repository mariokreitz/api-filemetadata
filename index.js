var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
	console.log(req.file);
	const { originalname, mimetype, size } = req.file;
	res.json({
		name: originalname,
		type: mimetype,
		size,
	});
	/*{
  fieldname: 'upfile',
  originalname: 'th.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'public/uploads/',
  filename: '1f76cd18e2f1a439e8d1beb5883f4f8c',
  path: 'public\\uploads\\1f76cd18e2f1a439e8d1beb5883f4f8c',
  size: 29207
}
 */
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Your app is listening on port ' + port);
});
