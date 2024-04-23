## Introduction

This is project from team TB Neighbors, creating interactive story application that kids can explore their imagination.

Demo link: https://talemaker.vercel.app/

## Architecture
![architecture](https://github.com/visiodeibc/pr-tb-neighbors/assets/35718406/8ee32fc3-2026-4045-be5f-f0f8d3b5a6f1)
![flow diagram](https://github.com/visiodeibc/pr-tb-neighbors/assets/35718406/0eb6eb26-0528-49e9-a383-a7945a3e6a9b)

## Used Technology

### APIs

- Google Genimi Pro
- Google Speech
- Google Text to Speech

### Framework

- Nextjs
- FastaAPI

## TODO

1. [x] Text to Speech - [https://cloud.google.com/text-to-speech/docs/reference/rest]
2. [x] Hook up gemini for story progression
   1. [x] restAPI - https://ai.google.dev/tutorials/rest_quickstart#text-only_input
      1. [x] https://ai.google.dev/tutorials/rest_quickstart
   2. [ ] image gen - https://console.cloud.google.com/vertex-ai/publishers/google/model-garden/imagegeneration?hl=en&project=visiodeibc
      1. [x] ai - https://platform.openai.com/docs/api-reference/images/createEdit
3. [ ] Put general desciption/purpose on the landing page
4. [x] change logo
5. [x] change title
6. [x] change font
7. [ ] multi image/record saving
8. [ ] google cloud storage에 이전 스토리 저장
9. [ ] embed image in conversation for better context
10. [x] image lazy loading placeholder
11. [x] put home button in the main page[stop audio if so]
12. [ ] readme 작성
13. [ ] API 콜 보안 작성[key 노출이 클라이언트 사이드에서 되는 현재 이슈 고쳐야해...]
14. [x] safari 안되는 이슈
15. [x] 모바일에서 확인은 될정도로..
16. [x] 버그 픽스
    1. [x] voice input 없는 경우 대응 가능하도록 수정
    2. [x] Img load 완료시 loading indicator 수정
17. [ ] Fine tune voice reading parts

## How It Works

The Python/FastAPI server is mapped into to Next.js app under `/api/`.

This is implemented using [`next.config.js` rewrites](https://github.com/digitros/nextjs-fastapi/blob/main/next.config.js) to map any request to `/api/:path*` to the FastAPI API, which is hosted in the `/api` folder.

On localhost, the rewrite will be made to the `127.0.0.1:8000` port, which is where the FastAPI server is running.

In production, the FastAPI server is hosted as [Python serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python) on Vercel.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The FastApi server will be running on [http://127.0.0.1:8000](http://127.0.0.1:8000) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).
