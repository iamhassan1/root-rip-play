import{Dt as e,H as t,Kt as n,Ot as r,Qt as i,Wt as a,Zt as o,kt as s,nt as c,rt as l,st as u,ut as d,y as f}from"./index-CyXA0AEj.js";import{t as p}from"./RenderTexture-DHYlylyV.js";function m(e,t,n,r,i,a,o,s){let c=o-n,l=s-r,u=i-n,d=a-r,f=e-n,p=t-r,m=c*c+l*l,h=c*u+l*d,g=c*f+l*p,_=u*u+d*d,v=u*f+d*p,y=1/(m*_-h*h),b=(_*g-h*v)*y,x=(m*v-h*g)*y;return b>=0&&x>=0&&b+x<1}var h=class extends r{constructor(...e){let n=e[0];n instanceof t&&(o(i,`Mesh: use new Mesh({ geometry, shader }) instead`),n={geometry:n,shader:e[1]},e[3]&&(o(i,`Mesh: drawMode argument has been removed, use geometry.topology instead`),n.geometry.topology=e[3]));let{geometry:r,shader:s,texture:l,roundPixels:u,state:d,...f}=n;super({label:`Mesh`,...f}),this.renderPipeId=`mesh`,this._shader=null,this.allowChildren=!1,this.shader=s??null,this.texture=l??s?.texture??a.WHITE,this.state=d??c.for2d(),this._geometry=r,this._geometry.on(`update`,this.onViewUpdate,this),this.roundPixels=u??!1}get material(){return o(i,`mesh.material property has been removed, use mesh.shader instead`),this._shader}set shader(e){this._shader!==e&&(this._shader=e,this.onViewUpdate())}get shader(){return this._shader}set geometry(e){this._geometry!==e&&(this._geometry?.off(`update`,this.onViewUpdate,this),e.on(`update`,this.onViewUpdate,this),this._geometry=e,this.onViewUpdate())}get geometry(){return this._geometry}set texture(e){e||=a.EMPTY;let t=this._texture;t!==e&&(t&&t.dynamic&&t.off(`update`,this.onViewUpdate,this),e.dynamic&&e.on(`update`,this.onViewUpdate,this),this.shader&&(this.shader.texture=e),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}get batched(){return this._shader||this.state.data&12?!1:this._geometry instanceof f?this._geometry.batchMode===`auto`?this._geometry.positions.length/2<=100:this._geometry.batchMode===`batch`:!1}get bounds(){return this._geometry.bounds}updateBounds(){this._bounds=this._geometry.bounds}containsPoint(e){let{x:t,y:n}=e;if(!this.bounds.containsPoint(t,n))return!1;let r=this.geometry.getBuffer(`aPosition`).data,i=this.geometry.topology===`triangle-strip`?3:1;if(this.geometry.getIndex()){let e=this.geometry.getIndex().data,a=e.length;for(let o=0;o+2<a;o+=i){let i=e[o]*2,a=e[o+1]*2,s=e[o+2]*2;if(m(t,n,r[i],r[i+1],r[a],r[a+1],r[s],r[s+1]))return!0}}else{let e=r.length/2;for(let a=0;a+2<e;a+=i){let e=a*2,i=(a+1)*2,o=(a+2)*2;if(m(t,n,r[e],r[e+1],r[i],r[i+1],r[o],r[o+1]))return!0}}return!1}destroy(e){if(super.destroy(e),typeof e==`boolean`?e:e?.texture){let t=typeof e==`boolean`?e:e?.textureSource;this._texture.destroy(t)}this._geometry?.off(`update`,this.onViewUpdate,this),this._texture=null,this._geometry=null,this._shader=null}},g={Air:0,Topsoil:1,Pebble:2,Clay:3,Aquifer:4,Gravel:5,Rock:6,Cavern:7,Concrete:8,Pipe:9},_=class{cellM;w;h;mat;dug;constructor(e,t,n){this.cellM=n,this.w=Math.round(e/n),this.h=Math.round(t/n),this.mat=new Uint8Array(this.w*this.h).fill(g.Topsoil),this.dug=new Uint8Array(this.w*this.h)}get widthM(){return this.w*this.cellM}get depthM(){return this.h*this.cellM}inBounds(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}index(e,t){return t*this.w+e}get(e,t){return this.inBounds(e,t)?this.mat[this.index(e,t)]:t<0?g.Air:g.Concrete}set(e,t,n){this.inBounds(e,t)&&(this.mat[this.index(e,t)]=n)}isOpen(e,t){if(!this.inBounds(e,t))return t<0;let n=this.index(e,t);return this.dug[n]===1||this.mat[n]===g.Air||this.mat[n]===g.Cavern}cellAt(e,t){return[Math.floor(e/this.cellM),Math.floor(t/this.cellM)]}};function v(e){let t=e>>>0;return()=>{t=t+0x6d2b79f5>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function y(e,t){let n=Array.from({length:t+2},()=>e()*2-1);return e=>{let r=Math.floor(e),i=e-r,a=i*i*(3-2*i),o=n[(r%t+t)%t]??0;return o+((n[((r+1)%t+t)%t]??0)-o)*a}}function b(e){let t=new _(e.widthM,e.depthM,e.cellM),n=v(e.seed),r=y(n,64);for(let n=0;n<t.w;n++){let i=(n+.5)*e.cellM,a=e.clayTopM+r(i/3)*.35;for(let r=0;r<t.h;r++){let i=(r+.5)*e.cellM;t.set(n,r,i>=a?g.Clay:g.Topsoil)}}let i=[],a=(e.pebbleTopM+e.pebbleBottomM)/2,o=(e.pebbleBottomM-e.pebbleTopM)/2;for(let r=.4;r<e.widthM-.4;){let s=.18+n()*.2;if(n()<.14){r+=.9+n()*.6;continue}let c=a+(n()*2-1)*o*.6;i.push({x:r,y:c,r:s,sprite:Math.floor(n()*e.stoneSprites)});let l=e.cellM;for(let e=Math.floor((c-s)/l);e<=Math.floor((c+s)/l);e++)for(let n=Math.floor((r-s)/l);n<=Math.floor((r+s)/l);n++){let i=(n+.5)*l-r,a=(e+.5)*l-c;i*i+a*a<=s*s*.9&&t.set(n,e,g.Pebble)}r+=s*2+e.stoneSpacingM*(.3+n()*.7)}return{grid:t,stones:i}}var x={[g.Air]:{speed:1,minPower:0,diggable:!1},[g.Topsoil]:{speed:1,minPower:1,diggable:!0},[g.Pebble]:{speed:0,minPower:99,diggable:!1},[g.Clay]:{speed:.5,minPower:2,diggable:!0},[g.Aquifer]:{speed:.5,minPower:2,diggable:!0},[g.Gravel]:{speed:2,minPower:1,diggable:!0},[g.Rock]:{speed:.35,minPower:3,diggable:!0},[g.Cavern]:{speed:1,minPower:0,diggable:!1},[g.Concrete]:{speed:0,minPower:99,diggable:!1},[g.Pipe]:{speed:0,minPower:99,diggable:!1}},S=(e,t)=>x[e].diggable&&t>=x[e].minPower;function C(e,t,n,r,i){let a=e.cellM,o=Math.floor((t-r)/a),s=Math.floor((t+r)/a),c=Math.floor((n-r)/a),l=Math.floor((n+r)/a);for(let e=c;e<=l;e++)for(let c=o;c<=s;c++){let o=(c+.5)*a-t,s=(e+.5)*a-n;o*o+s*s<=r*r&&i(c,e)}}function w(e,t,n,r,i){let a=0;return C(e,t,n,r,(t,n)=>{e.inBounds(t,n)&&!e.isOpen(t,n)&&S(e.get(t,n),i)&&(e.dug[e.index(t,n)]=1,a++)}),a}function T(e,t,n,r){let i=1;return C(e,t,n,r,(t,n)=>{if(!e.inBounds(t,n)||e.isOpen(t,n))return;let r=x[e.get(t,n)];r.diggable&&(i=Math.min(i,r.speed))}),i}function E(e,t,n,r,i){let a=!1;return C(e,t,n,r,(t,n)=>{a||e.isOpen(t,n)||S(e.get(t,n),i)||(a=!0)}),a}function D(e,t,n,r){return{chunkM:n,padM:r,cols:Math.ceil(e/n),rows:Math.ceil(t/n)}}function O(e,t,n,r){let i=[],a=r+e.padM,o=Math.max(0,Math.floor((t-a)/e.chunkM)),s=Math.min(e.cols-1,Math.floor((t+a)/e.chunkM)),c=Math.max(0,Math.floor((n-a)/e.chunkM)),l=Math.min(e.rows-1,Math.floor((n+a)/e.chunkM));for(let e=c;e<=l;e++)for(let t=o;t<=s;t++)i.push([t,e]);return i}var k={skyTop:6272240,skyBottom:0xcdefff,grass:6140227,topsoil:9062956,clay:0xc4552f,pebble:9341574,rock:7236234,water:5219289,carrot:0xff8a1f,golden:0xffd84a,pipFur:5978723,uiCream:0xfff4e0,uiInk:3811866,calm:8177994,curious:0xf2c230,alert:0xf28a30,furious:0xe2553c,lipLight:[1,.86,.62]},A=`
in vec2 aPosition;
in vec2 aUV;
out vec2 vUV;
out vec2 vWorld;
uniform mat3 uProjectionMatrix;
uniform mat3 uWorldTransformMatrix;
uniform mat3 uTransformMatrix;
void main() {
  mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
  gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
  vUV = aUV;
  vWorld = aPosition;
}`,j=`
in vec2 vUV;
in vec2 vWorld;
uniform sampler2D uTopsoil;
uniform sampler2D uClay;
uniform sampler2D uGravel;
uniform sampler2D uRock;
uniform sampler2D uBack;
uniform sampler2D uLayers;
uniform sampler2D uMask;
uniform vec2 uMapSize;
uniform vec4 uMaskRect;   // xy = mask uv of the chunk origin, zw = mask uv per chunk uv
uniform float uMaskUvPerM;
uniform float uTile;
uniform vec3 uLip;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float mask(vec2 muv) { return texture(uMask, muv).r; }

void main() {
  vec2 tuv = vWorld / uTile;
  // painted layers, blended along wandering, slightly soft boundaries
  vec2 warp = vec2(vnoise(vWorld * 1.3), vnoise(vWorld * 1.3 + 17.3)) - 0.5;
  vec4 L = texture(uLayers, (vWorld + warp * 0.55) / uMapSize);
  vec4 w = smoothstep(0.38, 0.62, L);
  vec3 soil = texture(uTopsoil, tuv).rgb;
  soil = mix(soil, texture(uClay, tuv).rgb, w.g);
  soil = mix(soil, texture(uGravel, tuv).rgb, w.b);
  soil = mix(soil, texture(uRock, tuv).rgb, w.a);
  float band = w.g * (1.0 - w.g) * 4.0;              // a darker seam where layers meet
  soil *= 1.0 - band * 0.18;
  soil *= mix(1.0, 0.82, clamp(vWorld.y / 24.0, 0.0, 1.0)); // a little darker with depth

  // the dug tunnel
  vec2 muv = uMaskRect.xy + vUV * uMaskRect.zw;
  float d = uMaskUvPerM;
  float m = mask(muv);
  float rough = (vnoise(vWorld * 7.0) - 0.5) * 0.42 + (vnoise(vWorld * 21.0) - 0.5) * 0.18;
  float hole = smoothstep(0.42, 0.58, m + rough);
  // occlusion: how much soil surrounds this point (8 taps at ~0.16 m)
  float r = 0.16 * d;
  float around = (mask(muv + vec2(r, 0.0)) + mask(muv - vec2(r, 0.0)) + mask(muv + vec2(0.0, r)) + mask(muv - vec2(0.0, r))
    + mask(muv + vec2(r, r) * 0.7) + mask(muv + vec2(-r, r) * 0.7) + mask(muv + vec2(r, -r) * 0.7) + mask(muv - vec2(r, r) * 0.7)) / 8.0;
  float above = mask(muv - vec2(0.0, 0.22 * d));      // y grows downward: "above" is -y
  float aboveNear = mask(muv - vec2(0.0, 0.12 * d));
  vec3 back = texture(uBack, tuv * 0.9 + 0.37).rgb * 0.72;
  float ao = clamp((1.0 - around) * 1.7, 0.0, 1.0);
  back *= mix(1.0, 0.42, ao);                          // inner rim darker
  back *= mix(1.0, 0.7, clamp(1.0 - above * 1.4, 0.0, 1.0)); // ceiling overhang shadow
  back *= mix(1.0, 0.8, clamp(vWorld.y / 20.0, 0.0, 1.0));
  // soil side of the edge: a crumbly dark outline all round, and a warm lit lip on the tunnel FLOOR (soil with the hole above it)
  float outline = smoothstep(0.02, 0.4, around + rough * 0.5) * (1.0 - hole);
  vec3 soilEdge = soil * mix(1.0, 0.55, outline);
  float lip = smoothstep(0.25, 0.75, aboveNear) * (1.0 - hole);
  soilEdge = mix(soilEdge, soil * uLip * 1.3, lip * 0.8);
  finalColor = vec4(mix(soilEdge, back, hole), 1.0);
}`;function M(){let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.62,`rgba(255,255,255,1)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64),a.from(e)}function N(e){let t=new Uint8Array(e.w*e.h*4);for(let n=0;n<e.w*e.h;n++){let r=e.mat[n];t[n*4]=r===g.Topsoil||r===g.Pebble?255:0,t[n*4+1]=r===g.Clay||r===g.Aquifer?255:0,t[n*4+2]=r===g.Gravel?255:0,t[n*4+3]=r===g.Rock?255:0}let r=new n({resource:t,width:e.w,height:e.h,format:`rgba8unorm`,scaleMode:`linear`,addressMode:`clamp-to-edge`,alphaMode:`no-premultiply-alpha`});return new a({source:r})}var P=class{renderer;grid;o;container=new s;layout;chunks=[];brush=new e(M());program=d.from({vertex:A,fragment:j,name:`terrain-soil`});empty;maskPx;stampMs=0;maskBytes=0;maskCount=0;constructor(e,n,r,i){this.renderer=e,this.grid=n,this.o=i;for(let e of Object.values(r))e.source.style.addressMode=`repeat`;this.layout=D(n.widthM,n.depthM,i.chunkM,i.padM),this.maskPx=Math.round((i.chunkM+2*i.padM)*i.maskPxPerM),this.brush.anchor.set(.5),this.empty=p.create({width:4,height:4}),e.render({container:new s,target:this.empty,clear:!0,clearColor:[0,0,0,1]});let a=N(n),o=i.chunkM+2*i.padM;for(let e=0;e<this.layout.rows;e++)for(let s=0;s<this.layout.cols;s++){let c=s*i.chunkM,d=e*i.chunkM,f=Math.min(n.widthM,c+i.chunkM),p=Math.min(n.depthM,d+i.chunkM),m=(f-c)/i.chunkM,g=(p-d)/i.chunkM,_=new t({attributes:{aPosition:[c,d,f,d,f,p,c,p],aUV:[0,0,m,0,m,g,0,g]},indexBuffer:[0,1,2,0,2,3]}),v=new u({uMapSize:{value:new Float32Array([n.widthM,n.depthM]),type:`vec2<f32>`},uMaskRect:{value:new Float32Array([i.padM/o,i.padM/o,i.chunkM/o,i.chunkM/o]),type:`vec4<f32>`},uMaskUvPerM:{value:1/o,type:`f32`},uTile:{value:i.tileM,type:`f32`},uLip:{value:new Float32Array(k.lipLight),type:`vec3<f32>`}}),y=new l({glProgram:this.program,resources:{uTopsoil:r.topsoil.source,uClay:r.clay.source,uGravel:r.gravel.source,uRock:r.rock.source,uBack:r.backwall.source,uLayers:a.source,uMask:this.empty.source,terrainUniforms:v}}),b=new h({geometry:_,shader:y});this.container.addChild(b),this.chunks.push({mesh:b,shader:y,mask:null})}}chunk(e,t){return this.chunks[t*this.layout.cols+e]}cull(e,t,n,r){let{chunkM:i,cols:a}=this.layout;this.chunks.forEach((o,s)=>{let c=s%a*i,l=Math.floor(s/a)*i;o.mesh.visible=c<n&&c+i>e&&l<r&&l+i>t})}stamp(e,t,n){let r=performance.now(),{chunkM:i,padM:a}=this.layout,o=this.o.maskPxPerM;this.brush.width=this.brush.height=n*2*o*1.18;for(let[r,c]of O(this.layout,e,t,n)){let n=this.chunk(r,c);n.mask||(n.mask=p.create({width:this.maskPx,height:this.maskPx,scaleMode:`linear`}),this.renderer.render({container:new s,target:n.mask,clear:!0,clearColor:[0,0,0,1]}),n.shader.resources.uMask=n.mask.source,this.maskBytes+=this.maskPx*this.maskPx*4,this.maskCount++),this.brush.position.set((e-r*i+a)*o,(t-c*i+a)*o),this.renderer.render({container:this.brush,target:n.mask,clear:!1})}this.stampMs+=performance.now()-r}};export{T as a,_ as c,w as i,g as l,k as n,b as o,E as r,v as s,P as t,h as u};