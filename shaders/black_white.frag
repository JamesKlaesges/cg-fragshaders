#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

void main() {

    //Luminance is calculated as L = 0.299 * Red + 0.587 * Green + 0.114 * Blue
    //Black and white images are created by assigning the luminance value to all 3 color components
    vec3 L = vec3(0.299, 0.587, 0.114);
    FragColor = texture(image, texcoord) * L;
}
