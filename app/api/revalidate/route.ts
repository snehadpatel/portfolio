import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");
    const path = request.nextUrl.searchParams.get("path") || "/";

    // Validate secret token if configured
    if (process.env.REVALIDATION_SECRET && secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: "Invalid revalidation secret token" }, { status: 401 });
    }

    try {
        revalidatePath(path);
        revalidatePath("/");
        revalidatePath("/about");
        revalidatePath("/projects");
        return NextResponse.json({ revalidated: true, path, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ message: "Error revalidating path", error: String(err) }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    return GET(request);
}
