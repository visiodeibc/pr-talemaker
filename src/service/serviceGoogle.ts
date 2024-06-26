import { prePrompts } from "@/data/data";
import axios from "axios";

export async function transcribeSpeech(audioFile: any): Promise<any> {
  try {
    const response = await axios.post(
      `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.GCP_KEY}`,
      {
        config: {
          encoding: "WEBM_OPUS",
          languageCode: "en-US",
          // sampleRateHertz: 8000,
          enableWordTimeOffsets: false,
        },
        audio: {
          content: audioFile,
        },
      }
    );
    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].alternatives[0].transcript;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Failed to fetch data from Google API");
  }
}

export async function textToSpeech(text: string): Promise<any> {
  try {
    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GCP_KEY}`,
      {
        input: {
          text,
        },
        voice: {
          languageCode: "en-US",
          ssmlGender: "FEMALE",
          name: "en-US-Wavenet-F",
        },
        audioConfig: {
          audioEncoding: "LINEAR16",
          speakingRate: 0.9,
          pitch: 2.5,
        },
      }
    );
    return response?.data;
  } catch (error) {
    throw new Error("Failed to fetch data from Google API");
  }
}

export async function generateImage(prompt: string): Promise<any> {
  // https://platform.openai.com/docs/api-reference/images/createEdit
  const headers = {
    Authorization: `Bearer ${process.env.AI_KEY}`,
    "Content-Type": "application/json",
  };
  const data = {
    model: "dall-e-3",
    prompt: prePrompts.image + prompt,
    n: 1,
    size: "1792x1024", // Image size
  };
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

export async function generateStory(story: []): Promise<any> {
  //https://ai.google.dev/tutorials/rest_quickstart#text-only_input
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GCP_KEY}`,
      {
        contents: story,
      }
    );
    return response?.data;
  } catch (error) {
    throw new Error("Failed to fetch data from Google API");
  }
}

// export async function generateImageG(prompt: string): Promise<any> {
//  https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/imagegeneration?hl=en&project=visiodeibc
//   const headers = {
//     Authorization: ``,
//     "Content-Type": "application/json",
//   };
//   const data = {
//     instances: [
//       {
//         prompt: prompt,
//       },
//     ],
//     parameters: {
//       sampleCount: 1,
//     },
//   };
//   try {
//     const response = await axios.post(
//       "https://us-central1-aiplatform.googleapis.com/v1/projects/visiodeibc/locations/us-central1/publishers/google/models/imagegeneration:predict",
//       data,
//       { headers }
//     );
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error generating image:", error);
//     return null;
//   }
// }
