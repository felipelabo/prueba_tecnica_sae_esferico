import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/prisma_client";

// Esto es un endpoint de ejemplo que puedes eliminar o modificar según tus necesidades
export const GET = async (req: NextRequest) => {
    return NextResponse.json({ message: "Hello, World!" });
}