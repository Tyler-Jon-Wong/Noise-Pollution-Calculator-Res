console.log('Client side javascript is loaded.')

const locationForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


locationForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    //message1.textContent = 'Loading...'
    message1.textContent = 'Loading';

   fetch('http://localhost:3000/noise?address=' + location).then((response) => { //sends location variable to json
       response.json().then((data) => { //receives data
           //console.log(data);
        if (data.error) {
            message1.textContent = data.error

        } else {
            message1.textContent = data.locationUpdate.latitude
            message2.textContent = data.locationUpdate.longitude
            //send back info to html.
        }
    })
})
})