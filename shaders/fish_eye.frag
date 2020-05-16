#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

void main() {
    //scale and translate the texture coordinate such that it is in the range [-1.0, 1.0]
    console.log(texcoord);
    
    //multiply by 2, then subtract 1
    vec2 newTexCoord = vec2(texcoord.x * 2.0 - 1.0, texcoord.y * 2.0 - 1.0);
    
    //calculate 𝜽 = arctan(texture_coordinate_y, texture_coordinate_x)
    float theta = atan(newTexCoord.y, newTexCoord.x);
    
    //calculate radius = magnitude of texture coordinate, raised to the power of 1.5
    float radius = pow(length(newTexCoord), 1.5);
    
    //calculate final texture coordinate = (radius * cos(𝜽),  radius * sin(𝜽))
    vec2 finalTexCoord = vec2(radius * cos(theta), radius * sin(theta));
    
    FragColor = texture(image, finalTexCoord);
}
