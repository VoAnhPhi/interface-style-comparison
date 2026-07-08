import arrowUpRightFromSquareSvg from "../../assets/icons/fontawesome/light/arrow-up-right-from-square.svg?raw";
import barsFilterSvg from "../../assets/icons/fontawesome/light/bars-filter.svg?raw";
import circleCheckSvg from "../../assets/icons/fontawesome/light/circle-check.svg?raw";
import fileLinesSvg from "../../assets/icons/fontawesome/light/file-lines.svg?raw";
import gearSvg from "../../assets/icons/fontawesome/light/gear.svg?raw";
import magnifyingGlassSvg from "../../assets/icons/fontawesome/light/magnifying-glass.svg?raw";
import penLineSvg from "../../assets/icons/fontawesome/light/pen-line.svg?raw";
import plusSvg from "../../assets/icons/fontawesome/light/plus.svg?raw";

const fontAwesomeIcons = {
  "arrow-up-right-from-square": arrowUpRightFromSquareSvg,
  "bars-filter": barsFilterSvg,
  "circle-check": circleCheckSvg,
  "file-lines": fileLinesSvg,
  gear: gearSvg,
  "magnifying-glass": magnifyingGlassSvg,
  "pen-line": penLineSvg,
  plus: plusSvg,
} as const;

export type FontAwesomeIconName = keyof typeof fontAwesomeIcons;

type FontAwesomeIconProps = {
  className?: string;
  name: FontAwesomeIconName;
  size?: number;
};

const injectedSvgAttrs = ' width="100%" height="100%" focusable="false" aria-hidden="true"';

export function FontAwesomeIcon({ className, name, size = 16 }: FontAwesomeIconProps) {
  const markup = fontAwesomeIcons[name].replace("<svg", `<svg${injectedSvgAttrs}`);

  return (
    <span
      aria-hidden="true"
      className={className ? `fa-icon ${className}` : "fa-icon"}
      dangerouslySetInnerHTML={{ __html: markup }}
      style={{ height: size, width: size }}
    />
  );
}
