const { Mqtt : Transport } = require('azure-iot-device-mqtt');
const { ModuleClient : Client } = require('azure-iot-device');
const { Message } = require('azure-iot-device');


const generateMessage = () => new Message(
  JSON.stringify({ beep : Math.random(), boop : Math.random() })
)

const run = async(client) => {
  const interval = Math.random()*10*1000
  const eventLabel = 'beepBoop'

  try {
    setInterval( () => {
        client.sendOutputEvent(eventLabel, generateMessage())
        .then( _ => console.log('Send Success') )            
        .catch( console.error.bind(null, ` ${eventLabel} : message failed to send`) )
    }, interval);
      
  } catch ( err ) { 
      console.error(eventLabel, err)
  }
}


Client.fromEnvironment(Transport, async (err, client) => {
  try {
    if ( err ) throw err;
    console.log('Client created from env')
    client.on('error', (err) => { throw err })
    await client.open(); //I am not entirely sure what the point of this --> see simulated device example
    run(client)

  } catch (err) {
    console.error('fromEnvironment catch', err)
  }
})
