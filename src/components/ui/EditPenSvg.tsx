import { forwardRef } from "react";

const EditPenSvg = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  function svgicon(props, ref) {
    return (
      <svg
        {...props}
        ref={ref}
        className="cursor-pointer"
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.8984 1.29688C11.582 0.613281 12.7031 0.613281 13.3867 1.29688L14.4531 2.36328C15.1367 3.04688 15.1367 4.16797 14.4531 4.85156L13.1406 6.16406L9.58594 2.60938L10.8984 1.29688ZM12.5117 6.79297L6.14062 13.1641C5.86719 13.4375 5.51172 13.6562 5.12891 13.7656L1.82031 14.7227C1.60156 14.8047 1.35547 14.75 1.19141 14.5586C1 14.3945 0.945312 14.1484 1 13.9297L1.98438 10.6211C2.09375 10.2383 2.3125 9.88281 2.58594 9.60938L8.95703 3.23828L12.5117 6.79297Z"
          fill="black"
        />
      </svg>
    );
  }
);

export default EditPenSvg;
