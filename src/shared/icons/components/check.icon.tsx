import { Icon } from "../types";

function CheckIcon({ className, size = "24" }: Icon) {
  return (
    <svg
      className={`${className} `}
      width={size}
      viewBox="0 0 23 17"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="20.8839"
        y="0.106934"
        width="3"
        height="20"
        transform="rotate(45 20.8839 0.106934)"
        fill=""
      />
      <rect
        y="7.12134"
        width="3"
        height="12"
        transform="rotate(-45 0 7.12134)"
        fill=""
      />
    </svg>
  );
}

export { CheckIcon };
