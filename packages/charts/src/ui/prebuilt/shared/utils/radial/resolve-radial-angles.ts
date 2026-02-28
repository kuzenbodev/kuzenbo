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
      endAngle: endAngle ?? (isSemicircle ? 0 : -270),
      startAngle: startAngle ?? (isSemicircle ? 180 : 90),
    };
  }

  if (isSemicircle) {
    return {
      endAngle: 0,
      startAngle: 180,
    };
  }

  return {
    endAngle: -270,
    startAngle: 90,
  };
};

export type { ResolveRadialAnglesOptions, ResolvedRadialAngles };
export { resolveRadialAngles };
