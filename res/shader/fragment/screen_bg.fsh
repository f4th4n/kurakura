#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

varying mediump vec2 v_texCoord;
varying vec4 v_fragmentColor;

void main (void) {
    
    gl_FragColor = v_fragmentColor;
}