#version 300 es

precision mediump float;

in vec2 texcoord;

uniform float time;
uniform sampler2D image;

out vec4 FragColor;

void main() {
    //scale and translate the texture coordinate such that it is in the range [-1.0, 1.0]
    mat4 translate = mat4(
        1.0, 0.0, 0.0, -texcoord.x,
        0.0, 1.0, 0.0, -texcoord.y,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0);
    mat4 scale = mat4(
        2 * texcoord.x, 0.0, 0.0, 0.0,
        0.0, 2 * texcoord.y, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0);
    
    vec4 scaleTex = (vec4(texcoord.xy, 0.0, 0.0) * translate * scale);
    
    //multiply by 2, then subtract 1
    vec2 newTexCoord = vec2(scaleTex.x * 2.0 - 1.0, scaleTex.y * 2.0 - 1.0);
    
    //calculate radius = magnitude of texture coordinate
    float radius = length(newTexCoord);
    
    //calculate a texture coordinate offset = texture_coordinate * (sin(radius * 30.0 - time * 5.0) + 0.5) / 60.0
    vec2 offset = newTexCoord * (sin(radius * 30.0 - time * 5.0) + 0.5) / 60.0;
    
    //calculate final texture coordinate = original_texture_coordinate + texture_coordinate_offset
    vec2 finalTexCoord = newTexCoord + offset;
    
    FragColor = texture(image, finalTexCoord);
}
