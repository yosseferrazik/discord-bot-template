# Discord Bot Template
Una plantilla de bot de discord 

# Configuración 
## `config.js`
Ves al archivo `./settings/config.js`
```js
module.exports = {
    prefix:">",// Prefix
    id:"", // ID del bot
    testguild:"",// ID del servidor de prueba
    ownerid:"",// Tu ID
    messages: {
        cooldown:"⏳ 🡆 Espera `<duration>` para usar este comando otra vez",
        botperms:"⛔ 🡆 Necesito permisos  `<perms>` para ejecutar este comando",
        userperms:"🚷 🡆 Necesitas permisos `<perms>` para ejecutar este comando"   
    }
};
```
## `.env`
```json
TOKEN="" // Token del bot
MONGO="" // URI de Mongo DB
```