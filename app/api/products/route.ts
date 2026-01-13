import { NextResponse } from "next/server";
import { ProductService } from "@/modules/inventory/products/application/product-service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    const result = await ProductService.getProducts({
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "100"),
      startSerial: searchParams.get("startSerial"),
      endSerial: searchParams.get("endSerial"),
      searchScope: searchParams.get("searchScope") || "serial",
      startDate: searchParams.get("startDate"),
      endDate: searchParams.get("endDate"),
      type: searchParams.get("type"),
    });

    return NextResponse.json({
        ...result,
        type: 'product'
    });
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
