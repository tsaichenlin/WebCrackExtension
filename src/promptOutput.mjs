import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { relatedURls } from "./getRelatedArticles.js";
import { extractor } from "./extractor.mjs";

async function promptOutput() {
  var prev_output = await extractor();
  console.log(prev_output);
  const openAIAPIKey = "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";
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: openAIAPIKey });

  const llm = new ChatOpenAI({ openAIApiKey: openAIAPIKey });

  const testTemplate =
    "Read the content from this article and provide answers to these questions: \
                            What is the background of the publisher? Is any political slant or bias present in the article? \
                            What is the approximate length of the article to read (in minutes)? \
                            Format the response to be in JSON output as a dictionary of strings containing \
                            publisher background (publisher_background), \
                            bias (bias), and the approximate length of the article (article_length_minutes). \
                            The variable names are defined in parentheses for each entry in the dictionary. \
                            file:{file} ";

  const testPrompt = PromptTemplate.fromTemplate(testTemplate);
  const testchain = RunnableSequence.from([
    testPrompt,
    llm,
    new StringOutputParser(),
  ]);
  console.log(prev_output);
  const response = await testchain.invoke({
    file: prev_output.content,
  });

  let final_output = {
    title: prev_output.title,
    author: prev_output.author,
    publisher_background: "", // reputation of publisher
    bias: "", // political bias/slant
    article_length_minutes: "", // length of article
  };

  var response_output = JSON.parse(response);

  final_output.publisher_background = response_output.publisher_background;
  final_output.bias = response_output.bias;
  final_output.article_length_minutes = response_output.article_length_minutes;

  // console.log(response);
  console.log(final_output);
  //const related = relatedURls(prev_output);
  return { final: final_output, related: [] };
}

export default promptOutput;
