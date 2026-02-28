"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerPopupSizeVariants = tv({
  variants: {
    size: {
      xs: "text-xs data-[swipe-direction=down]:px-4 data-[swipe-direction=down]:pt-3 data-[swipe-direction=down]:pb-[calc(1rem+env(safe-area-inset-bottom,0px)+var(--bleed))] data-[swipe-direction=left]:w-[calc(18rem+var(--bleed))] data-[swipe-direction=left]:p-4 data-[swipe-direction=left]:pl-[calc(1rem+var(--bleed))] data-[swipe-direction=right]:w-[calc(18rem+var(--bleed))] data-[swipe-direction=right]:p-4 data-[swipe-direction=right]:pr-[calc(1rem+var(--bleed))] data-[swipe-direction=up]:px-4 data-[swipe-direction=up]:pt-[calc(1rem+var(--bleed))] data-[swipe-direction=up]:pb-3",
      sm: "text-sm data-[swipe-direction=down]:px-5 data-[swipe-direction=down]:pt-3.5 data-[swipe-direction=down]:pb-[calc(1.25rem+env(safe-area-inset-bottom,0px)+var(--bleed))] data-[swipe-direction=left]:w-[calc(19rem+var(--bleed))] data-[swipe-direction=left]:p-5 data-[swipe-direction=left]:pl-[calc(1.25rem+var(--bleed))] data-[swipe-direction=right]:w-[calc(19rem+var(--bleed))] data-[swipe-direction=right]:p-5 data-[swipe-direction=right]:pr-[calc(1.25rem+var(--bleed))] data-[swipe-direction=up]:px-5 data-[swipe-direction=up]:pt-[calc(1.25rem+var(--bleed))] data-[swipe-direction=up]:pb-3.5",
      md: "text-sm",
      lg: "text-sm data-[swipe-direction=down]:px-7 data-[swipe-direction=down]:pt-5 data-[swipe-direction=down]:pb-[calc(1.75rem+env(safe-area-inset-bottom,0px)+var(--bleed))] data-[swipe-direction=left]:w-[calc(22rem+var(--bleed))] data-[swipe-direction=left]:p-7 data-[swipe-direction=left]:pl-[calc(1.75rem+var(--bleed))] data-[swipe-direction=right]:w-[calc(22rem+var(--bleed))] data-[swipe-direction=right]:p-7 data-[swipe-direction=right]:pr-[calc(1.75rem+var(--bleed))] data-[swipe-direction=up]:px-7 data-[swipe-direction=up]:pt-[calc(1.75rem+var(--bleed))] data-[swipe-direction=up]:pb-5",
      xl: "text-base data-[swipe-direction=down]:px-8 data-[swipe-direction=down]:pt-6 data-[swipe-direction=down]:pb-[calc(2rem+env(safe-area-inset-bottom,0px)+var(--bleed))] data-[swipe-direction=left]:w-[calc(24rem+var(--bleed))] data-[swipe-direction=left]:p-8 data-[swipe-direction=left]:pl-[calc(2rem+var(--bleed))] data-[swipe-direction=right]:w-[calc(24rem+var(--bleed))] data-[swipe-direction=right]:p-8 data-[swipe-direction=right]:pr-[calc(2rem+var(--bleed))] data-[swipe-direction=up]:px-8 data-[swipe-direction=up]:pt-[calc(2rem+var(--bleed))] data-[swipe-direction=up]:pb-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type DrawerPopupVariantProps = Omit<
  VariantProps<typeof drawerPopupSizeVariants>,
  "size"
> & {
  size?: UISize;
};

export type DrawerPopupSize = UISize;
export type DrawerPopupProps = DrawerPrimitive.Popup.Props &
  DrawerPopupVariantProps;

const DrawerPopup = ({ className, size, ...props }: DrawerPopupProps) => {
  const resolvedSize = useResolvedDrawerSize(size);

  return (
    <DrawerPrimitive.Popup
      className={cn(
        "bg-card text-card-foreground outline-border data-nested-drawer-open:after:bg-foreground/5 relative box-border flex touch-auto flex-col overflow-y-auto overscroll-contain outline transition-[transform,height,box-shadow,padding-bottom] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] [--bleed:3rem] [--peek:1rem] [--stack-height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))-var(--bleed)))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05] [--viewport-padding:0px] [transition:transform_450ms_cubic-bezier(0.32,0.72,0,1),height_450ms_cubic-bezier(0.32,0.72,0,1),box-shadow_450ms_cubic-bezier(0.32,0.72,0,1),padding-bottom_450ms_cubic-bezier(0.32,0.72,0,1)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-transparent after:transition-[background-color] after:duration-450 after:ease-[cubic-bezier(0.32,0.72,0,1)] after:content-[''] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-expanded:shadow-none data-nested-drawer-open:h-[calc(var(--stack-height)+var(--bleed))] data-nested-drawer-open:overflow-hidden data-nested-drawer-swiping:duration-0 data-swiping:duration-0 data-swiping:select-none data-[swipe-direction=down]:-mb-(--bleed) data-[swipe-direction=down]:h-(--drawer-height,auto) data-[swipe-direction=down]:max-h-[calc(80vh+var(--bleed))] data-[swipe-direction=down]:w-full data-[swipe-direction=down]:origin-[50%_calc(100%-var(--bleed))] data-[swipe-direction=down]:transform-[translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height))))_scale(var(--stack-scale))] data-[swipe-direction=down]:rounded-t-2xl data-[swipe-direction=down]:px-6 data-[swipe-direction=down]:pt-4 data-[swipe-direction=down]:pb-[calc(1.5rem+env(safe-area-inset-bottom,0px)+var(--bleed))] data-[swipe-direction=down]:data-ending-style:transform-[translateY(calc(100%-var(--bleed)))] data-[swipe-direction=down]:data-starting-style:transform-[translateY(calc(100%-var(--bleed)))] data-[swipe-direction=down]:data-[nested-drawer-open]:!h-[calc(var(--stack-height)+var(--bleed))] data-[swipe-direction=down]:data-[nested-drawer-open]:transform-[translateY(calc(var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height))))_scale(var(--stack-scale))] data-[swipe-direction=left]:mr-auto data-[swipe-direction=left]:-ml-(--bleed) data-[swipe-direction=left]:h-full data-[swipe-direction=left]:w-[calc(20rem+var(--bleed))] data-[swipe-direction=left]:max-w-[calc(100vw-3rem+var(--bleed))] data-[swipe-direction=left]:transform-[translateX(var(--drawer-swipe-movement-x))] data-[swipe-direction=left]:p-6 data-[swipe-direction=left]:pl-[calc(1.5rem+var(--bleed))] data-[swipe-direction=left]:data-ending-style:transform-[translateX(calc(-100%+var(--bleed)-var(--viewport-padding)))] data-[swipe-direction=left]:data-starting-style:transform-[translateX(calc(-100%+var(--bleed)-var(--viewport-padding)))] data-[swipe-direction=right]:-mr-(--bleed) data-[swipe-direction=right]:ml-auto data-[swipe-direction=right]:h-full data-[swipe-direction=right]:w-[calc(20rem+var(--bleed))] data-[swipe-direction=right]:max-w-[calc(100vw-3rem+var(--bleed))] data-[swipe-direction=right]:transform-[translateX(var(--drawer-swipe-movement-x))] data-[swipe-direction=right]:p-6 data-[swipe-direction=right]:pr-[calc(1.5rem+var(--bleed))] data-[swipe-direction=right]:data-ending-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)))] data-[swipe-direction=right]:data-starting-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)))] data-[swipe-direction=up]:-mt-(--bleed) data-[swipe-direction=up]:h-(--drawer-height,auto) data-[swipe-direction=up]:max-h-[calc(80vh+var(--bleed))] data-[swipe-direction=up]:w-full data-[swipe-direction=up]:origin-[50%_var(--bleed)] data-[swipe-direction=up]:transform-[translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height))))_scale(var(--stack-scale))] data-[swipe-direction=up]:self-start data-[swipe-direction=up]:rounded-b-2xl data-[swipe-direction=up]:px-6 data-[swipe-direction=up]:pt-[calc(1.5rem+var(--bleed))] data-[swipe-direction=up]:pb-4 data-[swipe-direction=up]:data-ending-style:transform-[translateY(calc(-100%+var(--bleed)))] data-[swipe-direction=up]:data-starting-style:transform-[translateY(calc(-100%+var(--bleed)))] data-[swipe-direction=up]:data-[nested-drawer-open]:!h-[calc(var(--stack-height)+var(--bleed))] data-[swipe-direction=up]:data-[nested-drawer-open]:transform-[translateY(calc(var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height))))_scale(var(--stack-scale))] supports-[-webkit-touch-callout:none]:data-[swipe-direction=left]:ml-0 supports-[-webkit-touch-callout:none]:data-[swipe-direction=left]:w-[20rem] supports-[-webkit-touch-callout:none]:data-[swipe-direction=left]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:data-[swipe-direction=left]:rounded-[10px] supports-[-webkit-touch-callout:none]:data-[swipe-direction=left]:pl-6 supports-[-webkit-touch-callout:none]:data-[swipe-direction=left]:[--bleed:0px] supports-[-webkit-touch-callout:none]:data-[swipe-direction=right]:mr-0 supports-[-webkit-touch-callout:none]:data-[swipe-direction=right]:w-[20rem] supports-[-webkit-touch-callout:none]:data-[swipe-direction=right]:max-w-[calc(100vw-20px)] supports-[-webkit-touch-callout:none]:data-[swipe-direction=right]:rounded-[10px] supports-[-webkit-touch-callout:none]:data-[swipe-direction=right]:pr-6 supports-[-webkit-touch-callout:none]:data-[swipe-direction=right]:[--bleed:0px]",
        drawerPopupSizeVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="drawer-popup"
      {...props}
    />
  );
};

export { DrawerPopup };
