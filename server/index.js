// import lib
const express = require('express')
const cors = require('cors')

// create PORt
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create cart variable
const cart = [
  { id: '1', item: 'apple', qty: 10 },
  { id: '2', item: 'pear', qty: 8 },
  { id: '3', item: 'orange', qty: 7 },
  { id: '4', item: 'watermelon', qty: 4 },
]

// create instance of app
const app = express()

// to allow CORS
app.use(cors())
// must use express json to parse the body of request from json to string
app.use(express.json())

// create resources

// Delete item

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  const index = cart.findIndex((ele) => ele.id === id)
  if (index < 0) {
    res.status(404).type('application/json')
    res.send({})
  } else {
    cart.splice(index,1)
    res.status(200).type('application/json')
    res.send({})
  }
})

// POST new item

app.post('/create', (req, res) => {
  const payload = req.body
  const id = payload.id
  console.log('payload', req.body)
  const index = cart.findIndex((ele) => ele.id === id)
  if (index < 0) {
    cart.push({ id: id, item: payload.item, qty: payload.qty })
    res.status(200).type('application/json')
    res.send({})
  } else {
    res.status(404).type('application/json')
    res.send({})
  }
})

// PUT updated item
app.put('/cart/:id', (req, res) => {
  const id = req.params.id
  const payload = req.body
  console.log('id', id)
  console.log('payload', payload)

  // findIndex() returns -1 if no match
  const index = cart.findIndex((ele) => ele.id === id)
  // condition must be less than 0 as first element has index of 0
  if (index < 0) {
    cart.push(payload)
    // update and insert
  } else {
    cart[index] = payload
  }

  res.status(200).type('application/json')
  res.send({})
})

// GET individual cart item
app.get('/cart/:id', (req, res) => {
  const id = req.params.id
  console.log('id', id)
  let data
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      data = cart[i]
      break
    }
  }
  if (data == undefined) {
    res.status(404).type('application/json')
    res.json({})
  } else {
    res.status(200).type('application/json')
    res.json(data)
  }
})

// GET all cart item
app.get('/cart', (req, res) => {
  res.status(200).type('application/json')
  // to allow CORS access
  // res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(cart)
})

// start app
app.listen(PORT, () => {
  console.log(`app listening on ${PORT} at ${new Date()}`)
})
