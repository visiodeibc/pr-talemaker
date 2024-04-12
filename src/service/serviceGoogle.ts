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
          ssmlGender: "MALE",
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

export async function generateImage(prompt: any): Promise<any> {}

export async function generateStory(text: any): Promise<any> {}
