"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";



// Galaxy Generator
function Galaxy() {
    const points = useMemo(() => {
        const count = 10000; // Increased density
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const randoms = new Float32Array(count); // For blink offset

        const colorInside = new THREE.Color("#00D9FF"); // Cyan
        const colorOutside = new THREE.Color("#00FF94"); // Neon Green

        for (let i = 0; i < count; i++) {
            // Spiral math
            const radius = Math.random() * 5 + 1;
            const spinAngle = radius * 5;
            const branchAngle = (i % 3) * ((2 * Math.PI) / 3);

            const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
            const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
            const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;

            const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
            const y = randomY * 2;
            const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Color mixing
            const mixedColor = colorInside.clone().lerp(colorOutside, radius / 5);
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            // Random blinking phase
            randoms[i] = Math.random();
        }
        return { positions, colors, randoms };
    }, []);

    const materialRef = useRef<any>(null);
    const ref = useRef<any>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.05;
            const { x, y } = mouseRef.current;
            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -y * 0.2, 0.1);
            ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, x * 0.2, 0.1);
        }
        if (materialRef.current) {
            // Animate blinking
            materialRef.current.uniforms.uTime.value += delta;
        }
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uSize: { value: 40.0 } // Adjusted size scaling
    }), []);

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.positions.length / 3}
                    array={points.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={points.colors.length / 3}
                    array={points.colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aRandom"
                    count={points.randoms.length}
                    array={points.randoms}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                uniforms={uniforms}
                vertexShader={`
                    uniform float uTime;
                    uniform float uSize;
                    attribute float aRandom;
                    attribute vec3 color;
                    varying vec3 vColor;
                    varying float vAlpha;
                    void main() {
                        vColor = color;
                        // Blink animation: sine wave offset by random attribute
                        vAlpha = 0.5 + 0.5 * sin(uTime * 3.0 + aRandom * 15.0);
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_Position = projectionMatrix * mvPosition;
                        gl_PointSize = uSize * (1.0 / -mvPosition.z);
                    }
                `}
                fragmentShader={`
                    varying vec3 vColor;
                    varying float vAlpha;
                    void main() {
                         // Circular particle shape
                        float r = distance(gl_PointCoord, vec2(0.5));
                        if (r > 0.5) discard;
                        // Soft edge glow
                        float glow = 1.0 - (r * 2.0);
                        glow = pow(glow, 1.5);
                        gl_FragColor = vec4(vColor, vAlpha * glow);
                    }
                `}
            />
        </points>
    );
}

export default function NeuralBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-bg-primary">
            <Canvas camera={{ position: [0, 4, 6], fov: 60 }} gl={{ alpha: true }}>
                <Galaxy />
                <ambientLight intensity={1} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>
    );
}

