import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Get API key from Replit Secrets
const API_KEY = process.env['GOOGLE_API_KEY'];
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(request: Request) {
  try {
    if (!API_KEY) {
      console.error("API key not found");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const data = await request.formData();
    const file: File | null = data.get('image') as unknown as File;

    if (!file) {
      console.error("No file received");
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    console.log('Processing file:', {
      type: file.type,
      size: file.size,
      name: file.name
    });

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      console.log('Model initialized');

      const prompt = "Analyze this bird image and provide details in this exact JSON format:\n" +
        "{\n" +
        '  "commonName": "Name of the bird",\n' +
        '  "scientificName": "Scientific name",\n' +
        '  "habitat": "Brief description of typical habitat",\n' +
        '  "behavior": "Detailed description of behavioral patterns",\n' +
        '  "migrationPattern": "Information about migration routes and timing",\n' +
        '  "diet": "What the bird typically eats",\n' +
        '  "conservationStatus": "Current conservation status and population trends",\n' +
        '  "interestingFacts": "A fascinating fact about this bird"\n' +
        "}";

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: file.type,
            data: base64
          }
        }
      ]);

      console.log('Content generated');

      const response = await result.response;
      const text = response.text();

      console.log('Raw response:', text);

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        return NextResponse.json(
          { 
            result: {
              commonName: "Unidentified Bird",
              scientificName: "Not available",
              habitat: "Unable to determine",
              behavior: "Unable to determine",
              migrationPattern: "Unable to determine",
              diet: "Unable to determine",
              conservationStatus: "Unable to determine",
              interestingFacts: "Unable to determine"
            }
          }
        );
      }

      return NextResponse.json({ result: parsedResponse });

    } catch (modelError) {
      console.error('Model error:', modelError);
      return NextResponse.json(
        { error: "Error analyzing image with AI model: " + modelError.message },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('General error:', error);
    return NextResponse.json(
      { error: "Error processing image. Please try again." },
      { status: 500 }
    );
  }
}