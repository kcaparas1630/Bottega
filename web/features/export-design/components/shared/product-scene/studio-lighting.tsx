import { useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import { PMREMGenerator } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Soft studio daylight: a room to reflect in the glaze, and a key light from the upper left that casts the shadow.
export function StudioLighting() {
  const renderer = useThree((state) => state.gl);
  const environment = useMemo(() => {
    const generator = new PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environmentTexture = generator.fromScene(room, 0.04).texture;
    room.dispose();
    generator.dispose();
    return environmentTexture;
  }, [renderer]);
  useEffect(() => () => environment.dispose(), [environment]);

  return (
    <>
      <primitive object={environment} attach="environment" />
      <directionalLight
        position={[-4, 11, 7]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-radius={10}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      >
        <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 0.5, 30]} />
      </directionalLight>
      <directionalLight position={[6, 3, -5]} intensity={0.55} />
    </>
  );
}
