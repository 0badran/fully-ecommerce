import { Card } from "../ui/card";

export default function CategoryCard() {
  return (
    <Card className="text-center border-black/30 rounded transition-colors hover:bg-main-hover hover:text-white">
      <svg
        width={56}
        height={56}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <path
          d="M38.9375 6.125H17.0625C15.5523 6.125 14.3281 7.34922 14.3281 8.85938V47.1406C14.3281 48.6508 15.5523 49.875 17.0625 49.875H38.9375C40.4477 49.875 41.6719 48.6508 41.6719 47.1406V8.85938C41.6719 7.34922 40.4477 6.125 38.9375 6.125Z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.6667 7H31.1354"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 44.0052V44.0305"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="15.1667"
          y1="39.8334"
          x2="40.8333"
          y2="39.8334"
          stroke="currentColor"
          strokeWidth={2}
        />
      </svg>

      <h2>Phones</h2>
    </Card>
  );
}
