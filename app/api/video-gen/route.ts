import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: Request) {
    try {
        const { prompt, token } = await req.json();
        const replicate = new Replicate({
            auth: token
        })
        const output = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    prompt: prompt
                }
            }
        );
        return NextResponse.json({ output }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}