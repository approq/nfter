import Tippy, { type TippyProps } from "@tippyjs/react";
import cn from "classnames";
import { roundArrow } from "tippy.js";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away-subtle.css";
import "tippy.js/dist/svg-arrow.css";

export const Tooltip = ({ className, offset, ...properties }: TippyProps): JSX.Element => (
    <Tippy
        animation="shift-away-subtle"
        offset={offset ?? [0, 7]}
        arrow={roundArrow}
        duration={150}
        className={cn(
            "text-theme-secondary-200 p-2 font-sans text-sm font-medium",
            "[&.tippy-box]:bg-theme-secondary-900 [&.tippy-box]:leading-5.5 [&.tippy-box]:rounded-lg [&_.tippy-content]:p-0", // to unset some of Tippy default styles
            className,
        )}
        {...properties}
    />
);
