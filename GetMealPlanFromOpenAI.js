export const getMealPlanFromOpenAI = async (req, res) => {
  const openai = new OpenAIApi(configuration);
  const {cuisine, diet, noOfDays} = req.body;
  const prompt = `Hello ChatGPT, please suggest a ${noOfDays} days meals plan for a ${diet} with cuisines, ${cuisine}`;
  const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      //instruction: prompt,
      max_tokens: 1000,
  });
  const data = response.data.choices[0].text;
  print(response.data.choices, "response")
  console.log(response.data.choices, "response")
  res.send(data);
 };
