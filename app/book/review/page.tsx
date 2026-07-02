import { Suspense } from "react";
import ReviewConfirm from "@/components/book/ReviewConfirm";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-8 text-center text-muted-foreground animate-pulse">Loading summary...</div>}>
      <ReviewConfirm />
    </Suspense>
  );
}
