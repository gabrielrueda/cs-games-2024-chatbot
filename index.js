const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');

appendMessage('bot', 'Hello! I am med bot. Here to diagnose you!');
appendMessage('bot', 'Please enter your symptoms in a comma separated list. Eg: fever, cough, headache');

// appendMessage('user', 'This is a user bubble');

let q_num = 0;

let symptoms_list = "";

let diagnosed_condition = "";




chatForm.addEventListener('submit', async event => {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;
  chatInput.value = '';

  if(q_num == 0){
    appendMessage('user', text);
    symptoms_list = text;
    appendMessage('bot', 'How long have you been experiencing these symptoms?');
    q_num += 1;
  }else if(q_num == 1){
    appendMessage('user', text);

    let message = "Question: The patient has the following symptoms: " + symptoms_list + ". The patient has been experiencing these symptoms for " + text + ". What condition would this be? \n\n Answer:";
    let x = await query({  "inputs": message} );


    diagnosed_condition = x.substring(x.indexOf(" of ") + 4, x.length);    
    appendMessage('bot', x);
    q_num += 1;
  }


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
