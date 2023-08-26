const express = require('express');
const carbone = require('carbone');
const app = express();

app.use(express.json());  // for parsing application/json

app.post('/generate-invoice', (req, res) => {
  const data = req.body;
  carbone.render('./path_to_template.odt', data, (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.attachment('invoice.odt');
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
