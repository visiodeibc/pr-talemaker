import { Story } from "./type";

// Define your tiles here
export const stories: Story[] = [
  {
    index: 0,
    title: "Korea",
    subtitle: "Adventure time in Namsan tower, Seoul",
    color: "#ffb3b3",
    storyImage: "/story/korea.png",
    coverImage: "/cover/korea.png",
    firstLine:
      "It’s Korean new year! Bao is meeting his cousins in Korea and doing a special bowing tradition. Bao's mother told Bao to put on korean traditional clothing, and go hike the Seoul tower. What should Bao pack for this day? ",
  },
  {
    index: 1,
    title: "Japan",
    subtitle: "Bao’s food frenzy in Tokyo",
    color: "#b3ffb3",
    storyImage: "/story/japan.png",
    coverImage: "/cover/japan.png",
    firstLine:
      "Bao loves food and Japan is on his travel list for a really long time. He’s ready to meet new friends - ramen, sushi, katsu. Who shall we grab lunch with first?",
  },
  {
    index: 2,
    title: "China",
    subtitle: "Let’s go to Bao's home to China!",
    color: "#b3b3ff",
    storyImage: "/story/china.png",
    coverImage: "/cover/china.png",
    firstLine:
      "Bao is traveling to the Great Wall of China. He successfully climbed to the top of the wall and was stunned by the views. Beside him, there’s a big smiling Panda. The Panda asks: Hello young explorer! How long do you think it takes to build the great wall?",
  },
  {
    index: 3,
    title: "Singapore",
    subtitle: "Mystery missions in Singapore!",
    color: "#ffffb3",
    storyImage: "/story/singapore.png",
    coverImage: "/cover/singapore.png",
    firstLine:
      "Bao travels to Singapore and steps off the train at a place called Little India. The place is filled with Indian music and chattering vendors. What would you like Bao to explore first?",
  },
  {
    index: 4,
    title: "India",
    subtitle: "Friends making fun in India!",
    color: "#b3ffff",
    storyImage: "/story/india.png",
    coverImage: "/cover/india.png",
    firstLine:
      "Bao, and his friends, sushi roll, and taco, decided to explore the enchanting land of India. Upon exploring, Bao stumbles upon a big building and people are doing funny movements. While being fascinated by the wonderful scene, Bao is approached by Samosa. Hello young explorer! Do you know what is the name of this great building of India?",
  },
  {
    index: 5,
    title: "Indonesia",
    subtitle: "Mythical adventures with Komodo dragons in Indonesia",
    color: "#ffb3ff",
    storyImage: "/story/indonesia.png",
    coverImage: "/cover/indonesia.png",
    firstLine:
      "Bao’s favorite animal is a dragon and when he heard about the last dragon in the world being in Indonesia, he swiftly jumped to his ship and set sail to Komodo Dragon Island. What do you think a Komodo dragon will look like?",
    demoImage: "/story/indonesia-2.png",
  },
];

export const prePrompts = {
  story:
    "This is a interactive educational story generation with narration, questions to the reader[who are around 5-7 years old] and response from reader. It's a story of a little dumpling called Bao travelling around Asia, what would be a proper next context that are composed of interesting story line including the answer from user also it should finish with a question that reader can answer to proceed for the next plot, each narration and answer should not exceed 20 words each and the model generated text should be a storyline ending with a question, here are the context so far: ",
  image:
    "This image will be used for children story book targeting 5-7 years old, It's a story of a little dumpling called Bao travelling around Asia image should be cute cartoonish and reflective of the latest situation of the story, image should not include any text or conversational material,image should be cute cartoonish cute and pastel toned,image should be ituitive and easily understandble of the context. here is the story so far:",
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
