
import React, { useState, useEffect } from "react"
import io from "socket.io-client"
import "./App.scss"
const socket = io("http://localhost:4001/");

function App() {
  const [message, setMessage] = useState()
  const [allMessages, setAllMessages] = useState([])


  console.log('allMessages')
  console.log(allMessages)

  function receiveMessage(message) {
    setAllMessages([message, ...allMessages])
  }

  useEffect(() => {
    socket.on("message", receiveMessage)
    return () => {
      socket.off("message", receiveMessage)
    }
  }, [allMessages])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', message)
    setMessage("")
    const newMessage = { body: message, from: "Me" }
    setAllMessages([newMessage, ...allMessages])
  }

  return (
    <div className="App">
      <h3>
        Hola mamacita chat
      </h3>
      <p>MILFS EN TU ZONA chatea con ellas</p>
      <div className="container">
        <form onSubmit={handleSubmit} className="form__message">
          <div>
            <input className="form__message__input" type="text" onChange={(e) => setMessage(e.target.value)} value={message} />
          </div>
          <button style={{ background: 'grey', fontSize: "0.8rem", marginLeft: "0rem", borderRadius: '6px' }}>Mandar</button>
        </form>
        <div className="messages">
          {allMessages.map((message, key) =>
            <div className="message" key={`${key}`}>
              <b>
                {message.from}
              </b>: <span>{message.body}</span>
            </div>)}
        </div>

        {/* below closes Container */}
      </div>
    </div>

  )
}

export default App
