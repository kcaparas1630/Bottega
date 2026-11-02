import { useFrame } from '@react-three/fiber';
import { useRef, type ReactNode, type RefObject } from 'react';
import { MathUtils, type Group } from 'three';

import type { TurnTarget } from '../../../hooks/use-turntable';

// How far, in radians, a product swings through as it arrives on the stage.
const ARRIVAL_SWING = 1.1;
const EASE_RATE = 3.6;
// Radians per second; a full celebratory turn then reads as a turntable, not a whip.
const MAX_TURN_SPEED = 3.4;

type TurntableProps = {
  turnRef: RefObject<TurnTarget>;
  restAngle: number;
  children: ReactNode;
};

// Eases the product towards the angle the viewer has turned it to, like a hand turning it under the light.
export function Turntable({ turnRef, restAngle, children }: TurntableProps) {
  const groupRef = useRef<Group>(null);
  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const targetAngle = restAngle + turnRef.current.angle;
    const easedAngle = MathUtils.damp(group.rotation.y, targetAngle, EASE_RATE, delta);
    const largestStep = MAX_TURN_SPEED * delta;
    group.rotation.y += MathUtils.clamp(easedAngle - group.rotation.y, -largestStep, largestStep);
  });
  return (
    <group ref={groupRef} rotation-y={restAngle - ARRIVAL_SWING}>
      {children}
    </group>
  );
}
