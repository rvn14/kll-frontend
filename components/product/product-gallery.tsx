"use client";

import { useState } from "react";
import { ProductVisual } from "./product-visual";

export function ProductGallery({ visuals }: { visuals: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!visuals || visuals.length === 0) {
    return <ProductVisual visual="package" className="aspect-[4/3] min-h-[340px] rounded-[2rem] sm:min-h-[520px]" />;
  }

  return (
    <div>
      <ProductVisual visual={visuals[activeIndex]} className="aspect-[4/3] min-h-[340px] rounded-[2rem] sm:min-h-[520px]" />
      {visuals.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {visuals.map((visual, index) => (
            <button
              type="button"
              className={`overflow-hidden rounded-2xl border bg-white p-1 transition ${index === activeIndex ? "border-brand ring-1 ring-brand ring-offset-2" : "border-border hover:border-brand/50"}`}
              aria-label={`View product image ${index + 1}`}
              key={`${visual}-${index}`}
              onClick={() => setActiveIndex(index)}
            >
              <ProductVisual visual={visual} className="aspect-square" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
