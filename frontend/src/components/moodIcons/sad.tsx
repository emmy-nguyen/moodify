export default function Sad() {
  return (
    <>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1_61)">
          <g filter="url(#filter0_i_1_61)">
            <circle cx="24" cy="24" r="24" fill="url(#paint0_radial_1_61)" />
          </g>
          <path
            d="M19 33.5V33.5C21.7251 29.7839 27.2749 29.7839 30 33.5V33.5"
            stroke="#DE6102"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M13 23L13.5938 23.4241C15.3323 24.6659 17.6677 24.6659 19.4062 23.4241L20 23"
            stroke="#232333"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M29 23L29.5938 23.4241C31.3323 24.6659 33.6677 24.6659 35.4062 23.4241L36 23"
            stroke="#232333"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_i_1_61"
            x="-1"
            y="0"
            width="49"
            height="50"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-1" dy="2" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.980183 0 0 0 0 0.920833 0 0 0 0.6 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_1_61"
            />
          </filter>
          <radialGradient
            id="paint0_radial_1_61"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(39) rotate(125.293) scale(54.5206)"
          >
            <stop stop-color="#FFFAEB" />
            <stop offset="0.21875" stop-color="#F5D163" />
            <stop offset="0.494792" stop-color="#FAD967" />
            <stop offset="0.791667" stop-color="#F2B456" />
            <stop offset="1" stop-color="#F78228" />
          </radialGradient>
          <clipPath id="clip0_1_61">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
