import type { SimpleIcon as SimpleIconData } from "simple-icons";

/** Renders a Simple Icons logo (24×24) in the current text color. */
export default function SimpleIcon({
  icon,
  className = "",
}: {
  icon: SimpleIconData;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}
