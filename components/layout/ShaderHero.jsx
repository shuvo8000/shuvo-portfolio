"use client";

import { useEffect, useRef } from "react";

export default function ShaderHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 a_position;

      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;

      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;

        vec2 p = uv - 0.5;
        p.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.18;

        float wave1 = sin(p.x * 4.0 + t);
        float wave2 = cos(p.y * 5.0 - t * 1.2);

        float glow =
          sin((p.x + wave1 * 0.12) * 7.0 + t) *
          cos((p.y + wave2 * 0.10) * 6.0 - t);

        vec3 base = vec3(0.02, 0.05, 0.12);
        vec3 blue = vec3(0.02, 0.25, 0.75);
        vec3 cyan = vec3(0.05, 0.55, 1.0);

        float intensity = 0.5 + 0.5 * glow;

        vec3 color = mix(base, blue, intensity * 0.65);
        color = mix(color, cyan, smoothstep(0.55, 1.0, intensity) * 0.35);

        float vignette =
          smoothstep(1.2, 0.25, length(p));

        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(type, source) {
      const shader = gl.createShader(type);

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    const vertexShader = createShader(
      gl.VERTEX_SHADER,
      vertexShaderSource
    );

    const fragmentShader = createShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,

        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(
      program,
      "a_position"
    );

    gl.enableVertexAttribArray(positionLocation);

    gl.vertexAttribPointer(
      positionLocation,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    const timeLocation = gl.getUniformLocation(
      program,
      "u_time"
    );

    const resolutionLocation = gl.getUniformLocation(
      program,
      "u_resolution"
    );

    const mouseLocation = gl.getUniformLocation(
      program,
      "u_mouse"
    );

    let mouseX = 0;
    let mouseY = 0;

    function handleMouseMove(event) {
      mouseX = event.clientX;
      mouseY = window.innerHeight - event.clientY;
    }

    window.addEventListener("mousemove", handleMouseMove);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const width = Math.floor(
        canvas.clientWidth * dpr
      );

      const height = Math.floor(
        canvas.clientHeight * dpr
      );

      if (
        canvas.width !== width ||
        canvas.height !== height
      ) {
        canvas.width = width;
        canvas.height = height;

        gl.viewport(
          0,
          0,
          canvas.width,
          canvas.height
        );
      }
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrame;

    function render(time) {
      resize();

      gl.uniform1f(
        timeLocation,
        prefersReducedMotion ? 0 : time * 0.001
      );

      gl.uniform2f(
        resolutionLocation,
        canvas.width,
        canvas.height
      );

      gl.uniform2f(
        mouseLocation,
        mouseX,
        mouseY
      );

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
      );

      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    }

    render(0);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  return (
    <section className="shader-hero">
      <canvas
        ref={canvasRef}
        className="shader-canvas"
        aria-hidden="true"
      />

      <div className="shader-overlay">
        <div className="shader-content">
          <p className="shader-eyebrow">
            Front-end AI Engineering
          </p>

          <h1 className="shader-title">
            Building interfaces
            <br />
            that feel alive.
          </h1>

          <p className="shader-description">
            A fullscreen WebGL fragment shader built
            specifically for my portfolio.
          </p>

          <div className="shader-tags">
            <span>WebGL</span>
            <span>GLSL</span>
            <span>Interactive</span>
          </div>
        </div>
      </div>
    </section>
  );
}