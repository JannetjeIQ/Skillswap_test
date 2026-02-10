type CategoryBadgeProps = {
  category: string;
};

// Keep this tiny: just a styled pill for categories.
export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-gray-700">
      {category}
    </span>
  );
}

