import fetch from 'node-fetch'
const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1Yjg1NGVkZjM1ZjA5M2I0NzA4ZjcyZGVjNGYxNTE0OTgzNmU4YWMifQ.eyJhenAiOiI1NTcyNTgzMzQzOTktazZ1OTAzaTAxZTViNnVrc3FqZjNxNG40MW9rb2N1NW4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NTcyNTgzMzQzOTktazZ1OTAzaTAxZTViNnVrc3FqZjNxNG40MW9rb2N1NW4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTMwODUwMTgyODE3ODIwOTkxNDEiLCJlbWFpbCI6InBhcGF3YXR0dUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkszTHI0OGxieFJvWFg5X3V4WkJ4WWciLCJleHAiOjE1MzYwMTMyMDEsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiI5MzM0YzNlNmFjNWIwZDVhZDk1MDRhMTYyM2ViNWYwNDBmODMyOTAxIiwiaWF0IjoxNTM2MDA5NjAxLCJuYW1lIjoiSmFtaWUgTnV0dGFsbCIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLVpzakhPN3dfM1p3L0FBQUFBQUFBQUFJL0FBQUFBQUFBSGU4L283OHczN08xTEEwL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJKYW1pZSIsImZhbWlseV9uYW1lIjoiTnV0dGFsbCIsImxvY2FsZSI6ImVuLUdCIn0.ImwpNSnTgYu-_f6hhWw9I75MjN2HowSthYntL1cP4wF25aZ7jSGcF8oBOdB5A8IcFwLrh6hiD9SwVzbDmGPqLZbL0DpYpUGCGUI-uR9LTNdZcCoDK842EiVGU3_DOPAjhgN9rcm8Sy6HzvWTaRNDXhhCqblLE0hjsls2HjpkduLE4CbMqbBcw8WZRrlXlppbsiNmnEolfATI5lHVjoE7Xj5nyRiWWI4-G9YtppcU9bUSSMCdR5QBTFKsmx8-DB99qWaeKVJSjKoOGFe61mSAMftWW-50A_53C8OtlapLj9K3mCFCCkTg-CC-KHci6fLb3mLiQ2sALJD4kYV9X1iAyA'

fetch('http://localhost:8010/phev-db3fa/us-central1/operations', {
    method: 'POST',
    body: JSON.stringify({state : {headLightsOn: true }}),
    mode: 'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        },
    }).then((res)=> {
        console.log('sent ' + JSON.stringify(res))
    })
