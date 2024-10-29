import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

if (!process.env.GOOGLE_API_KEY) {
  console.error("GOOGLE_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  try {
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

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');

    console.log('Image converted to base64');

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      console.log('Model initialized');

      // ... previous imports and setup ...

      const prompt = "Analyze this bird image and provide details in this exact JSON format:\n" +
        "{\n" +
        '  "commonName": "Name of the bird",\n' +
        '  "scientificName": "Scientific name",\n' +
        '  "habitat": "Brief description of typical habitat",\n' +
        '  "diet": "What the bird typically eats",\n' +
        '  "behavior": "Detailed description of behavioral patterns and characteristics",\n' +
        '  "migrationPattern": "Information about migration routes and timing",\n' +
        '  "conservationStatus": "Current conservation status and population trends",\n' +
        '  "interestingFacts": "A fascinating fact about this bird"\n' +
        "}";

      // ... rest of the API route code ...

      // Updated request format
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
        // If parsing fails, provide a structured error response
        return NextResponse.json(
          { 
            result: {
              commonName: "Unidentified Bird",
              scientificName: "Not available",
              habitat: "Unable to determine",
              diet: "Unable to determine",
              interestingFacts: "Could not process bird information"
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