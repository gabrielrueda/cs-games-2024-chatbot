const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');

appendMessage('bot', 'Hello! I am med bot. Here to diagnose you!');
appendMessage('bot', 'Please enter your symptoms. Eg: fever, cough, headache');

// appendMessage('user', 'This is a user bubble');

let q_num = 0;

let symptoms_list = "";

let diagnosed_condition = "";

let not_conditions = [];




chatForm.addEventListener('submit', async event => {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;
  chatInput.value = '';
  appendMessage('user', text);

  if(q_num == 0){
    symptoms_list = text;
    appendMessage('bot', 'How long have you been experiencing these symptoms?');
    q_num += 1;
  }else if(q_num == 1){
    

    let message = "Question: The patient has the following symptoms: " + symptoms_list + ". The patient has been experiencing these symptoms for " + text + ". What condition would this be? \n\n Answer:";
    let x = await query({  "inputs": message} );


    diagnosed_condition = x.substring(x.indexOf(" of ") + 4, x.length -1 );   
    
    appendMessage('bot', "You have been diagonised with " + diagnosed_condition + ".");

    message = "Question: Describe the symptoms for " + diagnosed_condition + ". \n\n Answer:";
    x = await query({  "inputs": message} );

    appendMessage('bot', x);
    appendMessage('bot', 'Is this correct (yes/no)?');

    q_num += 1;

  }else if(q_num == 2){

    if(text == "yes"){
      // Answer if hospital is needed, meds. etc...

      message1 = "Question: What over-the-counter medication can I use to help with " + diagnosed_condition + "? \n\n Answer:";

      message2 = "Question: Should i visit my doctor or emergency room if I had " + diagnosed_condition + " for a duration of "  + text + "? \n\n Answer:";


      x = await query({  "inputs": message1} );
      y = await query({  "inputs": message2} );

      appendMessage('bot', "You have been diagonised with " + diagnosed_condition + ".");

      appendMessage('bot', x + "\n\n" + y);
      appendMessage('bot', 'Thank you!');
      q_num += 1;
    }

    else if (text == "no"){
      not_conditions.push(diagnosed_condition);

      let message = "Question: The patient has the following symptoms: " + symptoms_list + ". The patient has been experiencing these symptoms for " + text + ". ";
      
      for(let i = 0; i < not_conditions.length; i++){
        message += "The patient does not have " + not_conditions[i] + ". ";
      }
      
      message += "What condition would this be? \n\n Answer:";
      
      
      let x = await query({  "inputs": message} );
  
  
      diagnosed_condition = x.substring(x.indexOf(" of ") + 4, x.length -1 );   
      
      appendMessage('bot', "You have been diagonised with " + diagnosed_condition + ".");
  
      message = "Question: Describe the symptoms for " + diagnosed_condition + ". \n\n Answer:";
      x = await query({  "inputs": message} );
  
      appendMessage('bot', x);

      appendMessage('bot', 'Is this correct (yes/no)?');

      q_num = 2;

    }
    else{
        appendMessage('bot', 'Please enter a valid input (yes/no)');
    }
  
  }
    // appendMessage('bot', x);

    

    // Answer if hospital is needed, meds. etc...

    // message1 = "Question: What over-the-counter medication can I use to help with " + diagnosed_condition + "? \n\n Answer:";

    // message2 = "Question: Should i visit my doctor or emergency room if I had " + diagnosed_condition + " for a duration of "  + text + "? \n\n Answer:";


    // x = await query({  "inputs": message1} );
    // y = await query({  "inputs": message2} );

    // appendMessage('bot', "You have been diagonised with " + diagnosed_condition + ".");

    // appendMessage('bot', x + "\n\n" + y);
    // q_num += 1;
    // appendMessage('bot', 'Thank you!');


});

function appendMessage(side, text) {
  const bubble = `
    <div class="msg -${side}">
        <div class="bubble">${text}</div>
    </div>`;
  chatBox.insertAdjacentHTML('beforeend', bubble);
  chatBox.scrollTop += 500;
}

async function query(data) {
	const response = await fetch(
		"https://xevhza5rhd1jhkq8.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept" : "application/json",
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
  
  // await getSymptoms(result[0]['generated_text']);

	return result[0]['generated_text'];
}




// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}
