const { Mqtt : Transport } = require('azure-iot-device-mqtt');
const { ModuleClient : Client } = require('azure-iot-device');
const { Message } = require('azure-iot-device');


const openClient = client => new Promise( (resolve, reject) => {
  client.open( (err) => {
    if ( err) { reject(err) }
    else { resolve(true) }
  })  
})

const rawMessageToJSON = rawMessage => JSON.parse( rawMessage.getBytes().toString('utf8') )

const handleInputMessage = client => (inputName, rawMessage) => {
  const message = rawMessageToJSON(rawMessage)

  console.log('handleInputMessage: ', message)
}

Client.fromEnvironment(Transport, async (err, client) => {
  try {
    if ( err ) throw err;
    console.log('Client created from env')
    client.on('error', (err) => { throw err })

  
    await openClient(client); //I am not entirely sure what the point of this --> see simulated device example
    client.on('inputMessage', handleInputMessage(client) );
    client.on('*', console.log.bind('ANYTHING') );

  } catch (err) {
    console.error('fromEnvironment catch', err)
  }
})



