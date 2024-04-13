import { Story } from "./type";

// Define your tiles here
export const stories: Story[] = [
  {
    index: 0,
    title: "Korea",
    color: "#ffb3b3",
    image: "/cover/korea.png",
    firstLine:
      "It’s Seollal (Korean lunar new year) ! We are meeting our cousins (mandoos) in Korea and doing saebae (special bowing tradition in Korea). Mom bao told us we can put on our own hanboks (korean traditional clothing), and go hiking in namsan tower. What should i pack for this day? ",
  },
  { index: 1, title: "Japan", color: "#b3ffb3", image: "/cover/japan.png" },
  { index: 2, title: "China", color: "#b3b3ff", image: "/cover/china.png" },
  {
    index: 3,
    title: "Singapore",
    color: "#ffffb3",
    image: "/cover/singapore.png",
  },
  { index: 4, title: "India", color: "#b3ffff", image: "/cover/india.png" },
  {
    index: 5,
    title: "Indonesia",
    color: "#ffb3ff",
    image: "/cover/indonesia.png",
  },
  { index: 6, title: "+", color: "#qab3df", image: "/cover/indonesia.png" },
];

export const prePrompts = {
  story:
    "This is a interactive story generation with narration, questions to the reader[who are around 5-7 years old] and response from reader. It's a story of a little dumpling called Bao travelling around South East Asia, what would be a proper next context that are composed of interesting story line including the answer from user also it should finish with a question that reader can answer to proceed for the next plot, each narration and answer should not exceed 20 words each, please provide next narration and questions part and here are the context so far: ",
  image: "",
};

export const defaultPlot = [
  {
    role: "user",
    parts: [
      {
        text: prePrompts.story,
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: "",
      },
    ],
  },
];
