import { APIGatewayProxyEvent } from "aws-lambda";
import { hardSpaceGenerator } from "./hardSpaceGenerator";

export const handler = async (event: APIGatewayProxyEvent) => {
    const reqBody = event.body ? JSON.parse(event.body) : null;
    const textToProcess = reqBody.text;

    if(!textToProcess) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: 'Missing text to process'}),
        }
    }

    try {
        const processedText = hardSpaceGenerator(textToProcess);
        return {
            statusCode: 200,
            body: processedText,
        }
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({message: err}),
        }
    }
}