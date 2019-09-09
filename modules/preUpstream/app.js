const { Mqtt : Transport } = require('azure-iot-device-mqtt');
const { ModuleClient : Client } = require('azure-iot-device');
const { Message } = require('azure-iot-device');


const rawMessageToJSON = rawMessage => JSON.parse( rawMessage.getBytes().toString('utf8') )

const handleInputMessage = client => (inputName, rawMessage) => {
  const message = rawMessageToJSON(rawMessage)

  console.log('inputName', inputName)
  console.log('inputName', inputName, 'handleInputMessage: ', message)
}

Client.fromEnvironment(Transport, async (err, client) => {
  try {
    if ( err ) throw err;
    console.log('Client created from env')
    client.on('error', (err) => { throw err })

  
    // await openClient(client); //I am not entirely sure what the point of this --> see simulated device example
    client.on('inputMessage', handleInputMessage(client) );

  } catch (err) {
    console.error('fromEnvironment catch', err)
  }
})


