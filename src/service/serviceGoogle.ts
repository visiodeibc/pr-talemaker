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
        },
        audioConfig: {
          audioEncoding: "LINEAR16",
        },
      }
    );
    return response?.data;
  } catch (error) {
    throw new Error("Failed to fetch data from Google API");
  }
}

export async function generateImage(prompt: string): Promise<any> {
  const headers = {
    Authorization: `Bearer ${process.env.AI_KEY}`,
    "Content-Type": "application/json",
  };
  const data = {
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024", // Image size
  };
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      data,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

export async function generateStory(story: []): Promise<any> {
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
//   const headers = {
//     Authorization: `Bearer c0be57716b80b6018c1ced95c1bed9b33b646d95`,
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
