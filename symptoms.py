import requests

API_URL = "https://xevhza5rhd1jhkq8.us-east-1.aws.endpoints.huggingface.cloud"
headers = {
	"Accept" : "application/json",
	"Content-Type": "application/json" 
}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

# question = "What are the symptoms of diabetes?"
context = "Diabetes is a metabolic disease that causes high blood sugar. The symptoms include increased thirst, frequent urination, and unexplained weight loss."


# answer = "\n\nThe symptoms are:\n\n1. Excessive thirst\n2. Excessive urination\n3. Excessive hunger\n4. Fatigue\n5. Weight loss\n6. Blurred vision\n7. Nausea\n8. Vomiting\n9. Skin infections\n10. Weakness\n11. Irritability\n12. Headache\n"

# question = "The patient has the following symptoms: cough and sneezing. Give me three possible conditions for what it could be?"


# output = query({
# 	"inputs": f"Question: {question} \n\Answer: ",
# 	"parameters": {}
# })

# print(output)

# disease = "Upper respiratory tract infection"
# question = f"Give me a list of 5 symptoms of {disease}"


# output = query({
# 	"inputs": f"Question: {question} \n\Answer: ",
# 	"parameters": {}
# })

# print(output)

