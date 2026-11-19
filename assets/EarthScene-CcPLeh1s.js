import{b as s,j as e,C as L,u as B,c as y,S as M,d as w,B as _,A as C,T as I,M as b,V as A,L as R,e as U,f as F,D as O}from"./three-DyaDTt7q.js";const X=["earth-day.jpg","earth-night.jpg","earth-normal.jpg","earth-specular.jpg","earth-clouds.png"].map(r=>`./textures/${r}`),j=6.15,E=[.34,3.88,-.13],P=`
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vTangent;
  varying vec3 vBitangent;
  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    // Derive the tangent from longitude so it remains defined at both poles.
    float longitude = uv.x * 6.28318530718;
    vec3 tangent = vec3(-sin(longitude), 0.0, -cos(longitude));
    vTangent = normalize(mat3(modelMatrix) * tangent);
    vBitangent = normalize(cross(vWorldNormal, vTangent));
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`,k=`
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uNormal;
  uniform sampler2D uSpecular;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec3 vTangent;
  varying vec3 vBitangent;
  void main() {
    vec3 n = normalize(vWorldNormal);
    vec3 normalTex = texture2D(uNormal, vUv).xyz * 2.0 - 1.0;
    n = normalize(n + (vTangent * normalTex.x + vBitangent * normalTex.y) * 0.24);
    vec3 sun = normalize(vec3(0.8, 1.25, 1.2));
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float daylight = smoothstep(-0.22, 0.65, dot(n, sun));
    vec3 day = texture2D(uDay, vUv).rgb;
    float landLuminance = dot(day, vec3(0.2126, 0.7152, 0.0722));
    day = mix(day, vec3(landLuminance) * vec3(0.65, 0.92, 1.24), 0.62);
    vec3 night = texture2D(uNight, vUv).rgb;
    vec3 color = day * (0.075 + daylight * 0.82);
    color += night * (1.0 - smoothstep(-0.12, 0.25, dot(n, sun))) * vec3(0.7, 0.84, 1.0) * 0.65;
    float specular = pow(max(dot(reflect(-sun, n), viewDir), 0.0), 32.0) * texture2D(uSpecular, vUv).r;
    color += vec3(0.27, 0.55, 0.82) * specular * 0.22;
    float rim = pow(1.0 - max(dot(normalize(vWorldNormal), viewDir), 0.0), 3.5);
    color += vec3(0.035, 0.26, 0.7) * rim * (0.22 + daylight * 0.6);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,V=`
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float intensity = pow(max(0.0, 1.0 - abs(dot(normalize(vWorldNormal), viewDir))), 5.5);
    float sun = max(dot(normalize(vWorldNormal), normalize(vec3(0.8, 1.25, 1.2))), 0.0);
    gl_FragColor = vec4(0.16, 0.52, 1.0, intensity * (0.12 + sun * 0.4));
    #include <colorspace_fragment>
  }
`;function S({radius:r,rotation:o,opacity:t=.22}){const n=s.useMemo(()=>{const a=Array.from({length:361},(l,c)=>{const m=c/360*Math.PI*2;return new A(Math.cos(m)*r,Math.sin(m)*r,0)});return new R(new U().setFromPoints(a),new F({color:"#60baff",transparent:!0,opacity:t,depthWrite:!1}))},[r,t]);return s.useEffect(()=>()=>{n.geometry.dispose(),n.material.dispose()},[n]),e.jsx("primitive",{object:n,rotation:o})}function Y({paused:r,resetKey:o}){const t=s.useRef(null),n=s.useRef(0);return s.useEffect(()=>{n.current=0},[o]),w((a,l)=>{if(r||(n.current+=Math.min(l,.05)),!t.current)return;const c=.9+Math.sin(n.current*.018)*.105;t.current.position.set(Math.cos(c)*6.9,Math.sin(c)*6.9,3),t.current.rotation.set(.3,-.28+Math.sin(n.current*.04)*.08,-.22)}),e.jsxs("group",{ref:t,scale:.77,children:[e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[.52,.65,.5]}),e.jsx("meshStandardMaterial",{color:"#b3c4d7",metalness:.8,roughness:.3})]}),e.jsxs("mesh",{position:[0,0,.27],children:[e.jsx("boxGeometry",{args:[.42,.5,.06]}),e.jsx("meshStandardMaterial",{color:"#d3ba88",metalness:.75,roughness:.43})]}),e.jsxs("mesh",{position:[0,-.38,0],rotation:[Math.PI/2,0,0],children:[e.jsx("cylinderGeometry",{args:[.16,.2,.18,20]}),e.jsx("meshStandardMaterial",{color:"#738ba5",metalness:.9,roughness:.3})]}),e.jsxs("mesh",{rotation:[0,0,Math.PI/2],children:[e.jsx("cylinderGeometry",{args:[.025,.025,3.25,8]}),e.jsx("meshStandardMaterial",{color:"#b9cfe4",metalness:.8,roughness:.25})]}),[-1,1].map(a=>e.jsxs("group",{position:[a*1.13,0,0],children:[e.jsxs("mesh",{children:[e.jsx("boxGeometry",{args:[1.45,.55,.028]}),e.jsx("meshStandardMaterial",{color:"#7090ad",metalness:.75,roughness:.35})]}),e.jsxs("mesh",{position:[0,0,.019],children:[e.jsx("planeGeometry",{args:[1.4,.5]}),e.jsx("meshStandardMaterial",{color:"#123c72",metalness:.55,roughness:.32,emissive:"#0e3475",emissiveIntensity:.18})]}),Array.from({length:9},(l,c)=>e.jsxs("mesh",{position:[-.7+c*.175,0,.024],children:[e.jsx("boxGeometry",{args:[.007,.51,.005]}),e.jsx("meshBasicMaterial",{color:"#607fa5"})]},c)),[-.125,0,.125].map(l=>e.jsxs("mesh",{position:[0,l,.026],children:[e.jsx("boxGeometry",{args:[1.4,.006,.005]}),e.jsx("meshBasicMaterial",{color:"#48688f"})]},l))]},a)),e.jsxs("group",{position:[.02,.38,.02],rotation:[.3,0,-.2],children:[e.jsxs("mesh",{position:[0,.08,0],children:[e.jsx("cylinderGeometry",{args:[.024,.024,.2,8]}),e.jsx("meshStandardMaterial",{color:"#d1dfed",metalness:.7})]}),e.jsxs("mesh",{position:[0,.22,0],rotation:[Math.PI,0,0],children:[e.jsx("sphereGeometry",{args:[.21,24,12,0,Math.PI*2,0,.9]}),e.jsx("meshStandardMaterial",{color:"#d6e8f8",metalness:.7,roughness:.2,side:O})]}),e.jsxs("mesh",{position:[0,.25,0],children:[e.jsx("cylinderGeometry",{args:[.008,.008,.25,6]}),e.jsx("meshStandardMaterial",{color:"#dbeaff"})]})]}),e.jsxs("mesh",{position:[.22,.2,.29],children:[e.jsx("sphereGeometry",{args:[.025,8,8]}),e.jsx("meshBasicMaterial",{color:"#93e7ff"})]})]})}function $(){const r=s.useMemo(()=>{const o=new Float32Array(1800);let t=42;const n=()=>(t=t*1664525+1013904223>>>0,t/4294967296);for(let a=0;a<600;a++)o[a*3]=(n()-.5)*35,o[a*3+1]=(n()-.5)*22,o[a*3+2]=-20-n()*5;return o},[]);return e.jsxs("points",{children:[e.jsx("bufferGeometry",{children:e.jsx("bufferAttribute",{attach:"attributes-position",args:[r,3]})}),e.jsx("pointsMaterial",{color:"#b1d1f5",size:.009,transparent:!0,opacity:.48,sizeAttenuation:!0})]})}function H({paused:r,active:o,resetKey:t,onReady:n}){const[a,l,c,m,f]=B(I,X),u=s.useRef(null),h=s.useRef(null),g=s.useRef(null),v=s.useRef(!1),x=s.useRef([0,0]),{gl:d}=y(),D=s.useMemo(()=>(a.colorSpace=M,l.colorSpace=M,[a,l,c,m,f].forEach(i=>{i.anisotropy=Math.min(8,d.capabilities.getMaxAnisotropy())}),{uDay:{value:a},uNight:{value:l},uNormal:{value:c},uSpecular:{value:m}}),[a,l,c,m,f,d]);s.useEffect(()=>{n()},[n]),s.useEffect(()=>{u.current&&u.current.rotation.set(...E),h.current&&(h.current.rotation.y=0)},[t]),w((i,N)=>{const p=Math.min(N,.05);if(!r&&!v.current&&u.current&&(u.current.rotation.y+=p*.006),!r&&h.current&&(h.current.rotation.y+=p*.002),g.current){const T=o==="overview"?-8:-8.4;g.current.position.x=b.damp(g.current.position.x,T,2.6,p)}});const G=i=>{i.stopPropagation(),v.current=!0,x.current=[i.clientX,i.clientY],i.target.setPointerCapture(i.pointerId),d.domElement.style.cursor="grabbing"},z=i=>{v.current=!1,i.target.releasePointerCapture(i.pointerId),d.domElement.style.cursor="grab"},W=i=>{!v.current||!u.current||(u.current.rotation.y+=(i.clientX-x.current[0])*.004,u.current.rotation.x=b.clamp(u.current.rotation.x+(i.clientY-x.current[1])*.002,-.8,.8),x.current=[i.clientX,i.clientY])};return e.jsxs("group",{ref:g,position:[-8,-3.65,0],children:[e.jsxs("group",{ref:u,rotation:[...E],children:[e.jsxs("mesh",{onPointerDown:G,onPointerUp:z,onPointerMove:W,onPointerOver:()=>{d.domElement.style.cursor="grab"},onPointerOut:()=>{v.current||(d.domElement.style.cursor="default")},children:[e.jsx("sphereGeometry",{args:[j,128,80]}),e.jsx("shaderMaterial",{uniforms:D,vertexShader:P,fragmentShader:k})]}),e.jsxs("mesh",{ref:h,scale:1.003,children:[e.jsx("sphereGeometry",{args:[j,96,64]}),e.jsx("meshPhongMaterial",{map:f,transparent:!0,opacity:.48,depthWrite:!1,color:"#b1d4f4",shininess:2})]})]}),e.jsxs("mesh",{scale:1.016,children:[e.jsx("sphereGeometry",{args:[j,96,64]}),e.jsx("shaderMaterial",{vertexShader:P,fragmentShader:V,transparent:!0,blending:C,depthWrite:!1,side:_})]}),e.jsx(S,{radius:6.75,rotation:[.83,.1,-.26],opacity:.31}),e.jsx(S,{radius:7.13,rotation:[1.08,-.25,.48],opacity:.11}),e.jsx(Y,{paused:r,resetKey:t})]})}function q({paused:r}){const o=y(t=>t.setFrameloop);return s.useEffect(()=>{const t=()=>o(document.hidden?"never":"always");return document.addEventListener("visibilitychange",t),()=>document.removeEventListener("visibilitychange",t)},[o,r]),null}function J({onError:r}){const o=y(t=>t.gl.domElement);return s.useEffect(()=>{const t=n=>{n.preventDefault(),r()};return o.addEventListener("webglcontextlost",t),()=>o.removeEventListener("webglcontextlost",t)},[o,r]),null}function Z(r){const[o]=s.useState(()=>{try{const n=document.createElement("canvas").getContext("webgl2"),a=!!n;return n?.getExtension("WEBGL_lose_context")?.loseContext(),a}catch{return!1}});return s.useEffect(()=>{o||r.onError()},[o,r.onError]),o?e.jsxs(L,{orthographic:!0,resize:{offsetSize:!0},camera:{position:[0,0,50],zoom:1,left:-9.6,right:9.6,top:5.4,bottom:-5.4,near:.1,far:150,manual:!0},dpr:[1,1.5],gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},onCreated:({gl:t,camera:n})=>{n.updateProjectionMatrix(),t.setClearColor("#030c18",1)},fallback:null,children:[e.jsx("ambientLight",{intensity:.5,color:"#8db9e7"}),e.jsx("directionalLight",{position:[8,10,12],intensity:3,color:"#e5f2ff"}),e.jsx("directionalLight",{position:[-7,3,5],intensity:.45,color:"#338cff"}),e.jsx($,{}),e.jsx(s.Suspense,{fallback:null,children:e.jsx(H,{...r})}),e.jsx(q,{paused:r.paused}),e.jsx(J,{onError:r.onError})]}):null}export{Z as default};
