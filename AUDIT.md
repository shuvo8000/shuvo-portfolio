# Accessibility and Performance Audit

## Project
BloodConnect Portfolio

## Live URL
https://shuvo-portfolio-taupe.vercel.app/

## Lighthouse Audit

The deployed portfolio was tested using Chrome Lighthouse with the Mobile preset.

### Baseline Results
- Performance: 90
- Accessibility: 100

The Lighthouse run showed a browser-extension warning that may affect performance measurement. The audit was completed on the deployed site.

## WAVE Accessibility Audit

The deployed portfolio was also tested with WAVE.

### Results
- Errors: 0
- Contrast Errors: 0
- Alerts: 1
- Features: 1
- Structure: 12
- ARIA: 1
- AIM Score: 10/10

The only alert was a redundant link. WAVE reported no accessibility errors or contrast errors.

## Keyboard Accessibility Test

A keyboard-only navigation check was performed using the Tab and Shift+Tab keys.

### Result
- Navigation links were reachable using the keyboard.
- Interactive elements received visible focus.
- The Register Donor navigation item showed a visible focus indicator.
- Primary navigation could be reached without using the mouse.

Result: Passed.

## Accessibility Improvements

The portfolio was checked for:
- Keyboard navigation
- Visible focus states
- Proper heading structure
- Color contrast
- Accessible navigation
- ARIA usage
- General WAVE accessibility errors

The final WAVE audit reported 0 errors and 0 contrast errors, and the Lighthouse accessibility score was 100.

## Final Results

| Audit | Result |
|---|---:|
| Lighthouse Performance | 90 |
| Lighthouse Accessibility | 100 |
| WAVE Errors | 0 |
| WAVE Contrast Errors | 0 |
| WAVE AIM Score | 10/10 |
| Keyboard Navigation | Passed |

## Evidence

The audit results were verified using:
1. Chrome Lighthouse Mobile audit
2. WAVE Web Accessibility Evaluation Tool
3. Manual keyboard-only navigation testing