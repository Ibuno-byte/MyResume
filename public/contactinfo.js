// the inputs validation
function nameValidation() {
    let nameinput = document.getElementById('name');
    let namepara = document.getElementById('namePara');
    if (nameinput.value == "") {
       namepara.innerHTML = 'Please enter your name'
       nameinput.style.border = '2px solid red';
    }
    else {
       nameinput.style.border = '3px solid green';
       namepara.innerHTML = ''
    }
 
 };
 
 function emailValidation() {
    let emailinput = document.getElementById('email');
    let emailpara = document.getElementById('emailPara');
    console.log(emailpara)
    if (emailinput.value == "") {
       emailpara.innerHTML = 'Please enter an email'
       emailinput.style.border = '2px solid red';
    }
    else if (!emailinput.value.includes('@')) {
       emailinput.style.border = '2px solid red';
       emailpara.innerHTML = ' Invalid email'
    }
    else {
       emailinput.style.border = '2px solid green';
       emailpara.innerHTML = ''
    }
 
 };
 
 
 document.getElementById('name').onblur = nameValidation;
 document.getElementById('email').onblur = emailValidation;
 
 
 const sendButton = document.getElementById('signup');
 const successMsg = document.getElementById('success-message')
 
 signupButton.addEventListener('click', (e) => {
    e.preventDefault()
 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contactMessage = document.getElementById('contactMessage').value;
 
    let contactDetails = {
       "name": name,
       "email": email,
       "contactMessage": contactMessage
    }
    fetch('/info', {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json',
          'Origin': '*',
          'Access-Control-Allow-Origin': '*'
       },
       redirect: 'follow',
       body: JSON.stringify(contactDetails)
    })
       .then(response => response.json())
       .then(
          (data) => {
             if (data['message']) {
                successMsg.textContent = data['message']
             }
          }
       )
       .catch(err => console.log(err))
 })