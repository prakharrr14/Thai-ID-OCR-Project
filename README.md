# Thai-ID-OCR-App
An application that utilizes Optical Character Recognition (OCR) to analyze thai id cards and extract relevant data. This app integrates with Google Vision API for OCR processing and then parse the response to interpret the OCR results, returning the final data in JSON format. 
Here, we have taken MongoDB database and saved the results in the database. We have also implemented CRUD api to create the ocr data, modify some data, filter them or delete certain id cards.
In this application I have used Google Vision Api to extract the Text in the form of a string from the uploaded image. I have also applied some pre-processing and post-processing to the image. Then I have generated a logic using regular expressions which extracts the useful data from the string retreived from the Google Vision API.
This data is then converted in the form of an object and then all the save, fetch,delete and update operations are performed.
