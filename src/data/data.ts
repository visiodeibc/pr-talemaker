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
  {
    index: 1,
    title: "Japan",
    color: "#b3ffb3",
    image: "/cover/japan.png",
    firstLine:
      "Bao is obviously a foodie, and Japan has been on his travel list for a really long time. He’s ready to meet new friends - ramen, sushi, katsu. Who shall we grab lunch with first?",
  },
  {
    index: 2,
    title: "China",
    color: "#b3b3ff",
    image: "/cover/china.png",
    firstLine:
      "Bao, a little dumpling with a big dream, rolled out of his steam basket home in Beijing, craving an adventure. Eager to see the Great Wall, which he'd heard was like a giant dragon, he bravely navigated bustling markets and ancient temples to reach the massive stone beast. Climbing the wall’s steep steps, Bao was in awe of the stunning views. Beside him, there’s a big smiling Panda who approaches Bao. The Panda asks Hello young explorer! How long does it take to build the great wall?",
  },
  {
    index: 3,
    title: "Singapore",
    color: "#ffffb3",
    image: "/cover/singapore.png",
    firstLine:
      "Bao, with a backpack slung over one shoulder, stepped off the train at Little India. The air hummed with a symphony of honking rickshaws and chattering vendors. The vibrant colors of saris and marigold garlands overwhelmed his senses. What would you like Bao to explore first?",
  },
  {
    index: 4,
    title: "India",
    color: "#b3ffff",
    image: "/cover/india.png",
    firstLine:
      "Bao, a little dumpling with a big dream, rolled out of his steam basket home in Beijing, craving an adventure. Along with his friends, sushi roll, and taco, they decided to explore the enchanting land of India. Upon exploring, Bao stumbled upon a magnificent building and see people practicing Yoga. While being fascinated by the wonderful scene, Bao is approached by Samosa. Hello young explorer! Do you know what this magnificent building of India?",
  },
  {
    index: 5,
    title: "Indonesia",
    color: "#ffb3ff",
    image: "/cover/indonesia.png",
    firstLine:
      "Once upon a time, a brave explorer named Bao found a magical map leading to a secret island where real-life dragons lived! Bao and a his indo friends, Siomay, sailed on a big, strong ship across the bumpy sea, all the way to Dragon Island. When they got there, they saw it was a wild, green place with big dragons called Komodo that roamed around like kings and queens. What do you think a Komodo dragon is capable of?",
  },
];

export const prePrompts = {
  story:
    "This is a interactive educational story generation with narration, questions to the reader[who are around 5-7 years old] and response from reader. It's a story of a little dumpling called Bao travelling around South East Asia, what would be a proper next context that are composed of interesting story line including the answer from user also it should finish with a question that reader can answer to proceed for the next plot, each narration and answer should not exceed 20 words each, please provide next narration and questions part and here are the context so far: ",
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
