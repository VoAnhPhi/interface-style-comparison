import arrowUpRightFromSquareSvg from "../../assets/icons/fontawesome/light/arrow-up-right-from-square.svg?raw";
import arrowsRotateSvg from "../../assets/icons/fontawesome/light/arrows-rotate.svg?raw";
import barsFilterSvg from "../../assets/icons/fontawesome/light/bars-filter.svg?raw";
import bellSvg from "../../assets/icons/fontawesome/light/bell.svg?raw";
import buildingSvg from "../../assets/icons/fontawesome/light/building.svg?raw";
import chevronDownSvg from "../../assets/icons/fontawesome/light/chevron-down.svg?raw";
import circleCheckSvg from "../../assets/icons/fontawesome/light/circle-check.svg?raw";
import circleExclamationSvg from "../../assets/icons/fontawesome/light/circle-exclamation.svg?raw";
import codeBranchSvg from "../../assets/icons/fontawesome/light/code-branch.svg?raw";
import cubeSvg from "../../assets/icons/fontawesome/light/cube.svg?raw";
import databaseSvg from "../../assets/icons/fontawesome/light/database.svg?raw";
import downloadSvg from "../../assets/icons/fontawesome/light/download.svg?raw";
import fileLinesSvg from "../../assets/icons/fontawesome/light/file-lines.svg?raw";
import flaskSvg from "../../assets/icons/fontawesome/light/flask.svg?raw";
import gearSvg from "../../assets/icons/fontawesome/light/gear.svg?raw";
import heartSvg from "../../assets/icons/fontawesome/light/heart.svg?raw";
import magnifyingGlassSvg from "../../assets/icons/fontawesome/light/magnifying-glass.svg?raw";
import penLineSvg from "../../assets/icons/fontawesome/light/pen-line.svg?raw";
import plusSvg from "../../assets/icons/fontawesome/light/plus.svg?raw";
import rocketSvg from "../../assets/icons/fontawesome/light/rocket.svg?raw";
import serverSvg from "../../assets/icons/fontawesome/light/server.svg?raw";
import shieldSvg from "../../assets/icons/fontawesome/light/shield.svg?raw";
import triangleExclamationSvg from "../../assets/icons/fontawesome/light/triangle-exclamation.svg?raw";
import usersSvg from "../../assets/icons/fontawesome/light/users.svg?raw";
import userSvg from "../../assets/icons/fontawesome/light/user.svg?raw";

const fontAwesomeIcons = {
  "arrow-up-right-from-square": arrowUpRightFromSquareSvg,
  "arrows-rotate": arrowsRotateSvg,
  "bars-filter": barsFilterSvg,
  bell: bellSvg,
  building: buildingSvg,
  "chevron-down": chevronDownSvg,
  "circle-check": circleCheckSvg,
  "circle-exclamation": circleExclamationSvg,
  "code-branch": codeBranchSvg,
  cube: cubeSvg,
  database: databaseSvg,
  download: downloadSvg,
  "file-lines": fileLinesSvg,
  flask: flaskSvg,
  gear: gearSvg,
  heart: heartSvg,
  "magnifying-glass": magnifyingGlassSvg,
  "pen-line": penLineSvg,
  plus: plusSvg,
  rocket: rocketSvg,
  server: serverSvg,
  shield: shieldSvg,
  "triangle-exclamation": triangleExclamationSvg,
  users: usersSvg,
  user: userSvg,
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
