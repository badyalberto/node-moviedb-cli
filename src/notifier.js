const notifier = require("node-notifier");

function getNotify(title = "Stored", message = "Succesful") {
    console.log('hola');
  /*  return notifier.notify({
    title: title,
    message: message,
  }); */
  //notifier.notify("Message");
  notifier.notify({
    title: "My notification",
    message: "Hello, there!",
    wait: true
  },
  function(error, response) {
    if (error) console.log('hola'+error);
    if (response) console.log('adios'+response);
  });
}

module.exports = {
  getNotify
};
