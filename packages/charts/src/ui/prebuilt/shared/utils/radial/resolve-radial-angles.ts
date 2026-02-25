interface ResolveRadialAnglesOptions {
  endAngle?: number;
  isSemicircle?: boolean;
  startAngle?: number;
}

interface ResolvedRadialAngles {
  endAngle: number;
  startAngle: number;
}

const resolveRadialAngles = ({
  endAngle,
  isSemicircle = false,
  startAngle,
}: ResolveRadialAnglesOptions): ResolvedRadialAngles => {
  if (startAngle !== undefined || endAngle !== undefined) {
    return {
      startAngle: startAngle ?? (isSemicircle ? 180 : 90),
      endAngle: endAngle ?? (isSemicircle ? 0 : -270),
    };
  }

  if (isSemicircle) {
    return {
      startAngle: 180,
      endAngle: 0,
    };
  }

  return {
    startAngle: 90,
    endAngle: -270,
  };
};

export type { ResolveRadialAnglesOptions, ResolvedRadialAngles };
export { resolveRadialAngles };
