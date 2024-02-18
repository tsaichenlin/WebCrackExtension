import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers"; //
import { RunnableSequence } from "@langchain/core/runnables"; //

export async function relatedURls(b) {
  const googleBeginningQuerry = "https://www.google.com/search?q=";
  const modifyiedURL =
    googleBeginningQuerry + b.key_word_search.replace(" ", "+");
  const a = await fetch(modifyiedURL)
    .then((response) => response.text())
    .then((html) => {
      //const URLRegEx = new RegExp('<a href="/url.*?&', 'g');
      const URLRegEx = new RegExp('<a href="/url.q=https://www(.*?&)', "g");
      //console.log(html);
      const author = b.author;
      const rawURL = author.substring(
        0,
        author.indexOf("/", author.indexOf("/", author.indexOf("/") + 1) + 1)
      );
      const a = html.match(URLRegEx);
      const companyRegex = new RegExp(rawURL);
      var q = [];
      for (let c in a) {
        if (!companyRegex.test(a[c])) {
          q.push(a[c].substring(16, a[c].length - 1));
        }
      }
      return q;
    })
    .catch((error) => console.error("Error fetching HTML:", error));
  const openAIAPIKey = "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";

  const llm = new ChatOpenAI({ openAIApiKey: openAIAPIKey });

  const testTemplate =
    "which 3 articles from a list of urls (list) \
                            give the most diverse perspectives in terms of political bias, legal, finantial etc.\
                            and give a 1 sentence explain why for each indivisaual one differs fromt the other articles\
                            Format the output in json to be a dictionary containing URLs (URLs), Explinations (Explinations)\
                            The variable names are defined in parentheses for each entry in the dictionary. \
                            The URLs will be a list of strings and Explinations will be a list of strings, \
                            main:{file}, list:{list} ";

  const testPrompt = PromptTemplate.fromTemplate(testTemplate);
  const testchain = RunnableSequence.from([
    testPrompt,
    llm,
    new StringOutputParser(),
  ]);

  return await testchain.invoke({ file: b.content, list: a });
}
