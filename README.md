# WebCrack Extension!
Check out our website: https://github.com/hryow/WebCrack.git
## Inspiration
Driven by the unique challenges immigrants and international students face in English-speaking countries, we were motivated to launch a bias tracker Chrome extension tailored for ESL (English as a Second Language) individuals. Grappling with language barriers is hard enough, and the added complexity of identifying bias and objective reporting in a non-native language can be overwhelming. Recognizing this, our mission is to empower ESL individuals to sift through information confidently, liberated from the linguistic veils that might mask bias. In today’s digital age, where misinformation is uncontrollable, our tool becomes not just helpful but essential for ESL speakers. We are committed to enabling them to assess the content they come across critically. By providing the means to recognize bias, our platform does more than just improve language proficiency; it provides them with the critical thinking skills needed to traverse the complex digital information landscape. This is not just a tool; it is an incentive for empowerment designed to enhance linguistic abilities and intellectual perception in the face of bias.

## What it does
Our project is a Chrome Extension that not only detects for bias by checking the background of the source and author, but it also determines the approximate length of time that it would take for the average person to read the article and suggests additional articles that may help as well. 

## How we built it
Our team used javascript and multiple APIs to create the backend part of our extension, while our frontend (extension visuals and website) was made using CSS and HTML. We used React.js to seamlessly blend our front and back end. The APIs used for backend were ChatGPT’s OpenAI and LangChain for prompting as well as Extractus to extract article data. Our website visuals and animations were made from scratch.

## Challenges we ran into
We ran into some challenges in the backend part of our project because we had some trouble formalizing the pipeline from obtaining the article data to finally output the results, and combining the front and back end together. After figuring out the Extractus API, we decided to use React.js because a regular Chrome Extension didn’t allow users to use it as the API had many other embedded packages. Another challenge that we ran into was figuring out how to blend different techniques such as fetch with regex. After isolating the issue, we found a creative workaround that involved the utilization of built-in functions.

## Accomplishments that we're proud of
An accomplishment that we’re proud of is figuring out how to blend our APIs to work together for backend. We’re also proud of using OpenAI to get the prompts to extract new data from the article parameters, such as bias. <at least one more accomplishment>

## What we learned
We learned how to use LangChain and OpenAI in combination with prompt engineering to effectively extract the data or information we’d like. We also learned the steps on how to create a working Chrome Extension that takes the url of the site the user is currently on to evaluate for potential bias. In the frontend, we learned how to use flex to help us to align the objects within our website. 

## What's next for WebCrack
To improve our project further, we’d like to create a feature that gets additional information from other sources in order to find stronger inclinations for bias and gives the user more background on the article subject and author. Additionally, we’d like to add on a stronger, more streamlined, recommender system that gives similar articles to the user that offer a different perspective to decrease held biases, as well as adding a fact-checking feature.

<img width="342" alt="WebCrack Start Page" src="https://github.com/tsaichenlin/WebCrackExtension/assets/91178384/ab88ff53-ce01-487e-ac35-f235282eaac9">
.<img width="342" alt="WebCrack Welcome" src="https://github.com/tsaichenlin/WebCrackExtension/assets/91178384/90246770-14f7-47fd-80f2-bba264ce0ac3">
<img width="339" alt="WebCrack Loading" src="https://github.com/tsaichenlin/WebCrackExtension/assets/91178384/1c0eb06f-27c4-40e2-8c6a-90ea9bc3121f">
<img width="338" alt="WebCrack Info Page" src="https://github.com/tsaichenlin/WebCrackExtension/assets/91178384/c8903662-6aa1-4998-acd7-8cebc4be98de">


