# 3D Blood Bag Experience

## What I Built

I built an interactive 3D blood bag experience for the BloodConnect project using React Three Fiber and Three.js.

The scene displays a lightweight 3D blood bag and allows users to select different blood groups. The blood inside the bag changes based on the selected blood group.

## Interactions

- Drag to rotate the 3D blood bag.
- Scroll to zoom.
- Select a blood group using the control buttons.
- The blood color changes when the selected blood group changes.
- Animation can be paused or resumed.
- The experience supports keyboard-accessible controls.
- Reduced-motion support is included for users who prefer less animation.

## Performance Note

I used lightweight low-poly geometry instead of loading a large external 3D model. The scene uses simple geometry and a limited number of objects to keep rendering lightweight.

I also avoided unnecessary external model loading and kept the 3D scene simple so it can work smoothly on normal devices and mobile screens.

## Mobile and Accessibility

The layout is responsive and the controls are designed to work on smaller screens.

The interface includes keyboard-accessible controls and respects the user's reduced-motion preference.

## What I Would Add With More Time

With more time, I would add a more realistic blood bag model, improved lighting and materials, and additional visual effects. I would also add more detailed blood-group information and improve the 3D interaction experience.