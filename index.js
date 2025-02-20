const microgenV3 = require("microgen-v3-sdk")
const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

const client = new microgenV3.MicrogenClient({
  apiKey: process.env.API_KEY
})

app.get('/', async (req, res) => {
  res.json({ "foo": "bar" })
})

app.get("/products", async (req, res) => {
  const response = await client.service('products').find()

  if (response.error) {
    if (response.error.message === "project not found") {
      return res.status(response.status).send({
        message: "failed to connect to your project, please check if the api had been set properly."
      })
    }

    return res.status(response.status).send(response.error)
  }

  res.status(response.status).send(response.data)
})

app.post("/products", async (req, res) => {
  const response = await client.service("products").create(req.body)

  if (response.error) {
    if (response.error.message === "project not found") {
      return res.status(response.status).send({
        message: "failed to connect to your project, please check if the api had been set properly."
      })
    }

    return res.status(response.status).send(response.error)
  }

  res.status(response.status).send(response.data)
})

app.get("/products/:id", async (req, res) => {
  const { id } = req.params

  const response = await client.service("products").getById(id)

  if (response.error) {
    if (response.error.message === "project not found") {
      return res.status(response.status).send({
        message: "failed to connect to your project, please check if the api had been set properly."
      })
    }

    return res.status(response.status).send(response.error)
  }

  res.status(response.status).send(response.data)
})

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params

  const response = await client.service("products").updateById(id, req.body)

  if (response.error) {
    if (response.error.message === "project not found") {
      return res.status(response.status).send({
        message: "failed to connect to your project, please check if the api had been set properly."
      })
    }

    return res.status(response.status).send(response.error)
  }

  res.status(response.status).send(response.data)
})

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params

  const response = await client.service("products").deleteById(id)

  if (response.error) {
    if (response.error.message === "project not found") {
      return res.status(response.status).send({
        message: "failed to connect to your project, please check if the api had been set properly."
      })
    }

    return res.status(response.status).send(response.error)
  }

  res.status(response.status).send(response.data)
})

app.post('/compute', async (req, res) => {
  const data = [{foo: "bar"}, {foo: "bar2"}, {foo: "bar3"}]
  console.log(req.body)
  res.status(200).send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
