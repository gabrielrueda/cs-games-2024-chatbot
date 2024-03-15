import requests

API_URL = "https://xevhza5rhd1jhkq8.us-east-1.aws.endpoints.huggingface.cloud"
headers = {
	"Accept" : "application/json",
	"Content-Type": "application/json" 
}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

question = "What are the symptoms of diabetes?"
context = "Diabetes is a metabolic disease that causes high blood sugar. The symptoms include increased thirst, frequent urination, and unexplained weight loss."


answer = "\n\nThe symptoms of diabetes are:\n\n1. Excessive thirst\n2. Excessive urination\n3. Excessive hunger\n4. Fatigue\n5. Weight loss\n6. Blurred vision\n7. Nausea\n8. Vomiting\n9. Skin infections\n10. Weakness\n11. Irritability\n12. Headache\n"

output = query({
	"inputs": f"Answer: {answer} \n\nQuestion: ",
	"parameters": {}
})

print(output)