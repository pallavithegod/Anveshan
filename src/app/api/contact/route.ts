import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";

const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/mrpbjjak";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Anveshan Contact API is running",
    service: "Formspree",
    configured: {
      endpoint: Boolean(FORMSPREE_ENDPOINT),
      database: Boolean(process.env.DATABASE_URL),
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 },
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    // 1. Submit to Formspree
    let formspreeSuccess = false;
    let errorMessage = "";

    try {
      const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await formspreeRes.json().catch(() => null);

      if (formspreeRes.ok) {
        formspreeSuccess = true;
      } else {
        errorMessage =
          data?.errors?.map((e: { message: string }) => e.message).join(", ") ||
          "Formspree submission rejected.";
        console.error("Formspree Error:", errorMessage);
      }
    } catch (err: any) {
      console.error("Failed to reach Formspree:", err);
      errorMessage = err.message || "Failed to reach form submission service.";
    }

    // 2. Optional: If MongoDB is configured, save a backup copy
    if (process.env.DATABASE_URL) {
      try {
        await connectDB();
        await Contact.create({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        });
      } catch (dbErr) {
        console.warn("MongoDB backup save failed:", dbErr);
      }
    }

    if (!formspreeSuccess && errorMessage) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent successfully! The Anveshan team will get back to you soon.",
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      {
        error:
          error.message || "Failed to send message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
