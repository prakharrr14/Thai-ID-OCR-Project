const vision = require('@google-cloud/vision');
require('dotenv').config();

const extractAllDates = (input) => {
    const dateRegex = /\b(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[, .]+(\d{4})\b/g;
    const dates = [];
    let match;
    while ((match = dateRegex.exec(input)) !== null) {
      dates.push(match[0]);
    }
    return dates;  
  };

  const extractIndex = (reg, input) => {
    const match = input.match(reg);
    if (match) {
      const startIdx = match.index;
      const endIdx = startIdx + match[0].length;
      return [startIdx, endIdx];
    }
    return [-1, -1];  
  };

  const extractFirstName = (input, start, end) => {
    return input.substring(start, end);  
  };

  const extractLastName = (input, start) => {
    const regex = /\bLast Name\b/i;
    let s = '';
    while (start < input.length && (regex.test(input[start]) || /[a-zA-Z0-9\s]/.test(input[start]))) {
      s += input[start];
      start++;
    }
    console.log(s);
    return s;  
  };


  const extractId = (input, start) => {
    let s = '';
    while (start < input.length && (/\d/.test(input[start]) || /\s/.test(input[start]))) {
      s += input[start];
      start++;
    }
    return s;  
  };

  const refine = (myString) => {
    const firstNonSpace = myString.search(/\S/);
    if (firstNonSpace !== -1) {
      myString = myString.substring(firstNonSpace);
    }
    const lastNonSpace = myString.search(/\s+$/);
    if (lastNonSpace !== -1) {
      myString = myString.substring(0, lastNonSpace);
    }
    return myString;  
  };

  const handleExtraction = (input) => {
    const firstNameRegex = /\bname\b/i;
    const lastNameRegex = /\bLast Name\b/i;
    const idCardRegex = /\Thai National ID Card\b/i;

    const x1 = extractIndex(firstNameRegex, input);
    const x2 = extractIndex(lastNameRegex, input);
    const x3 = extractIndex(idCardRegex, input);
    const first=extractFirstName(input, x1[1], x2[0]);
      const last=extractLastName(input, x2[1]);



    if (x1[0] === -1 || x2[0] === -1 || x3[0] === -1) {
      if (x1[0] === -1) {
        console.log("index for first name not found. Hence not able to fetch the first name.");
      }
      if (x2[0] === -1) {
        console.log("index for last name not found. Hence not able to fetch the last name.");
      }
      if (x3[0] === -1) {
        console.log("index for Thai National ID Card not found. Hence not able to fetch the ID.");
      }
    } else {
      
      console.log("First name: ", refine(first));
      console.log("Last name: ", refine(last));
      console.log("Thai National Id: ", extractId(input, x3[1]));
    }

    const dates = extractAllDates(input);

    if (dates.length !== 0) {
      console.log("Date of Birth: ", dates[0]);
      console.log("Date of issue: ", dates[1]);
      console.log("Date of expiry: ", dates[2]);
    } else {
      console.log("Not enough dates fetched.");
    } 
    
    const id = extractId(input, x3[1]);

    const data = {
      name: refine(first),
      last_name: refine(last),
      identification_number: id.substring(1,id.length-1),
      date_of_birth:dates[0],
      date_of_issue:dates[1],
      date_of_expiry:dates[2],
    };
    return data
  };

const CONFIG = {
    credentials: {
        private_key: process.env.VISION_PRIVATE_KEY,
        client_email: process.env.VISION_CLIENT_EMAIL
    }
};

const client = new vision.ImageAnnotatorClient(CONFIG);

const detectText = async (file_path) => {

    let [result] = await client.textDetection(file_path);
    let extractedResult = handleExtraction(result.fullTextAnnotation.text);
    return extractedResult;
};

module.exports = detectText;