/*global chrome*/
import { extract } from "@extractus/article-extractor";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { RunnablePassthrough } from "@langchain/core/runnables";
import { relatedURls } from "./getRelatedArticles.js";

export async function extractor() {
  var input = "";
  function getURL() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var currTab = tabs[0];
        var url = currTab.url;
        console.log("Current tab URL:", url);
        input = url;
        resolve();
      });
    });
  }

  await getURL();
  console.log("input");
  console.log(input);

  //"https://www.bbc.com/news/world-europe-68323366";

  var article = "";
  // here we use top-level await, assume current platform supports it
  try {
    article = await extract(input);
  } catch (err) {
    console.error(err);
  }

  //console.log(article);

  console.log(typeof article);
  console.log(input);

  let curr_article = {
    title: article.title,
    author: article.author,
    publish_date: article.published,
    content: article.content,
    topics: [],
    genre: "",
    key_word_search: "",
  };
  console.log("curr:");
  console.log(curr_article);

  const openAIAPIKey = "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";
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: openAIAPIKey });

  const llm = new ChatOpenAI({ openAIApiKey: openAIAPIKey });

  const testTemplate =
    "given the content of the file, only produce the content as a string without the html tags and tabs. \
                        Include a list of topics discussed in the article.    \
                        Also identify the genre of the article (e.g. political, health, science)      \
                        Come up with a 5 key word search for google to find out more information about the article. \
                        Format the output in json to be a dictionary containing content (content), topics (topic), genre (genre), \
                        and one sentence to inquire further about the article (key_word_search).\
                        The variable names are defined in parentheses for each entry in the dictionary. \
                        The content will be a string, topics will be a list of a string of topics, \
                        genre will be a string, and the key_word_search will be a string. file:{file} article:";

  const testPrompt = PromptTemplate.fromTemplate(testTemplate);
  const testchain = RunnableSequence.from([
    testPrompt,
    llm,
    new StringOutputParser(),
  ]);
  console.log("a");
  const response = await testchain.invoke({ file: article.content });

  console.log(response);

  var output = JSON.parse(response);

  // console.log(output);
  // console.log(output.content);
  // console.log(output.topics);

  curr_article.content = output.content;
  curr_article.topics = output.topics;
  curr_article.genre = output.genre;
  curr_article.key_word_search = output.key_word_search;
  console.log("final");

  return curr_article;
}
