# 🎨 Animation & Visual Effects Documentation

This document explains the technical implementation of the key visual effects in this portfolio.

## 1. Neural Galaxy Background (`NeuralBackground.tsx`)

This is the centerpiece of the visual theme. It's a custom 3D particle system built with **Three.js** and **React Three Fiber**.

### The Math: Logarithmic Spiral
The galaxy structure isn't a simple image; it's 10,000 mathematically generated points. We use a **Golden Spiral** formula:

```javascript
const radius = Math.random() * 5 + 1;
const spinAngle = radius * 5; 
const branchAngle = (i % 3) * ((2 * Math.PI) / 3); // 3 Arms

const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
const y = randomY * 2; // Flatness
const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;
```
*   **Branches**: We offset particles by `(2 * PI) / 3` to create 3 distinct arms.
*   **Spin**: `spinAngle` increases with `radius`, twisting the arms as they extend outward.
*   **Randomness**: Gaussian randomness is added to `x, y, z` to simulate a nebular cloud rather than perfect lines.

### Custom Shaders (GLSL)
Standard materials (`PointsMaterial`) don't support individual star blinking. We wrote a custom **ShaderMaterial**:

*   **Vertex Shader**:
    *   Accepts a `aRandom` attribute (0-1) for each star.
    *   Calculates `vAlpha = 0.5 + 0.5 * sin(uTime * 3.0 + aRandom * 15.0);`.
    *   This creates a sine wave blinking pattern, but `aRandom` ensures every star blinks at a different phase (time offset).

*   **Fragment Shader**:
    *   Draws a circle using `distance(gl_PointCoord, vec2(0.5))`.
    *   Applies a soft glow using `pow(1.0 - r * 2.0, 1.5)` to mimic emission.

### Interactive Parallax
*   We track the mouse position globally in `window`.
*   The galaxy group tilts (`rotation.x`, `rotation.y`) based on mouse coordinates using `THREE.MathUtils.lerp` for smooth inertia.

---

## 2. Horizontal Scroll Section (`AboutSection.tsx`)

This section creates the illusion of scrolling *sideways* while the user scrolls *down*.

### The "Pinning" Technique
1.  **Container**: The section body has a height of `300vh` (300% of the viewport).
2.  **Sticky Wrapper**: Inside, a `div` is set to `sticky top-0 h-screen`. This forces the content to stay pinned to the screen while the user scrolls through the 300vh container.
3.  **Transform**: We use Framer Motion's `useTransform` to map the scroll progress:
    ```javascript
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);
    ```
    *   As `scrollYProgress` goes from 0 to 1 (top to bottom of the 300vh container), the content moves Left by 66.6%.
    *   Since we have 3 screens width (100% visible + 200% hidden), moving -66.6% perfectly reveals the 2nd and 3rd panels.

### Mobile Adaptation
On mobile, horizontal scrolling is poor UX. We use a `isMobile` state check:
*   **If Mobile**: The css `x` transform is set to `0`. The container height becomes `auto`. The layout switches to `flex-col` (vertical stack).
*   **If Desktop**: The complex 300vh/sticky logic is active.

---

## 3. Pop-out 3D Profile Image

This effect makes the head appear to "pop out" of the circle frame.

### Layered Masking Strategy
We render the image **twice** in the same position:

1.  **Layer 1 (Background)**:
    *   Contained inside the circular border (`overflow: hidden`).
    *   This shows the torso and shoulders, perfectly clipped.

2.  **Layer 2 (Foreground)**:
    *   Placed *outside* and *above* the circle.
    *   Uses a CSS `mask-image` (gradient):
        ```css
        mask-image: linear-gradient(to bottom, black 50%, transparent 50%);
        ```
    *   This makes the *bottom* half of this layer invisible (so it doesn't overlap the circle border logic), but keeps the *top* half (the head) visible.
    *   **Result**: The head extends beyond the circle's bounding box, creating pseudo-3D depth.

---

## 4. Glassmorphism System

The "Glass" effect used throughout cards uses standard Backdrop Filters:
```css
.glass {
    background: rgba(255, 255, 255, 0.03); /* Extremely low opacity */
    backdrop-filter: blur(10px);          /* Blurs content behind */
    border: 1px solid rgba(255, 255, 255, 0.05); /* Subtle rim */
}
```
This ensures content is readable on top of the complex animated galaxy background without completely hiding it.
