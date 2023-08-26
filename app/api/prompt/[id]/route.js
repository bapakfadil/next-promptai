import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read delete and edit request)
export const GET = async (request, {params}) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        
        // if the prompt didn't found
        if(!prompt) return new Response("Promp not found", { status: 404 });
        
        // if the prompt found
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        // if the conditions and command can't be fulfilled
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

// PATCH (to save updated prompt post)
export const PATCH = async (request, {params}) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        
        /* 
            In tutorial Adrian create this code below and it returns error 500 in PATCH,
            but somehow the prompt successfully updated in DB.
        */
        // return new Response(json.stringify(existingPrompt), { status: 200 });

        // use the code below to remove error 5000
        return new Response("Prompt updated successfully!", { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 });
    }
}

// DELETE (to delete prompt post)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt has been deleted", { status: 200 });

    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 });
    }
}