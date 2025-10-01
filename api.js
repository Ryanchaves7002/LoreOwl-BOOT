const express = require('express')
const app = express()
const port = 3000



app.get('/', (req, res) => {
  res.send(`<h1>Teste de usuario!</h1>`)
})

app.listen(port, () => {
  console.log(`Servidor iniciado com sucesso ${port}`)
})
