## Introduction

This is project from team TB Neighbors, creating interactive story application that kids can explore their imagination.

Demo link: https://talemaker.vercel.app/

## Used Technology

### APIs

- Google Genimi Pro
- Google Speech
- Google Text to Speech

### Framework

- Nextjs
- FastaAPI

## Architecture

![architecture](https://github.com/visiodeibc/pr-talemaker/assets/35718406/2fab76fc-4198-41ce-87f6-2c1ba444230c)
![flow diagram](https://github.com/visiodeibc/pr-tb-neighbors/assets/35718406/0eb6eb26-0528-49e9-a383-a7945a3e6a9b)

## TODO

1. [x] Text to Speech - [https://cloud.google.com/text-to-speech/docs/reference/rest]
2. [x] Hook up gemini for story progression
3. [x] Put general desciption/purpose on the landing page
4. [x] change logo
5. [x] change title
6. [x] change font
7. [x] image lazy loading placeholder
8. [x] put home button in the main page[stop audio if so]
9. [x] readme 작성
10. [x] safari 안되는 이슈
11. [x] 모바일에서 확인은 될정도로..
12. [x] 버그 픽스
    1. [x] voice input 없는 경우 대응 가능하도록 수정
    2. [x] Img load 완료시 loading indicator 수정
13. [x] Fine tune voice reading parts
14. [ ] error handling 추가하기[토스트]
15. [ ] API 콜 보안 작성[key 노출이 클라이언트 사이드에서 되는 현재 이슈 고쳐야해...]
16. [ ] multi image/record saving
17. [ ] google cloud storage에 이전 스토리 저장
18. [ ] embed image in conversation for better context
19. [ ] multi language support / learning
