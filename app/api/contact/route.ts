import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {

    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: "Web Portfolio <onboarding@resend.dev>",
      to: "ingridledesma22@gmail.com",
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Alguien se contactó por tu portafolio web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });

  }catch (error) {
  console.error("RESEND ERROR:", error);

  return NextResponse.json(
    { error: "Error enviando email" },
    { status: 500 }
  );
}
}