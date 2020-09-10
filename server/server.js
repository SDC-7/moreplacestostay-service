const express = require('express')
const app = express()
const port = 3000

app.get('/loaderio-d7de8df48e5df1e7e615ec78bdf1d8e4', (req, res) => {
  res.send('loaderio-d7de8df48e5df1e7e615ec78bdf1d8e4')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})