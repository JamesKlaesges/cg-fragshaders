#version 300 es

precision mediump float;

in vec2 texcoord;

uniform float width;
uniform float height;
uniform sampler2D image;

out vec4 FragColor;

void main() {
    //Retrieve color values for all texels surrounding current texel (RGB only)
    //Sample 1.0 / texture_width left and right, 1.0 / texture_height down and up
    float w = 1.0/width;
    float h = 1.0/height;
    
    //Compute horizontal gradient as follows:
    //sobel_h = bottom_right + (2.0 * center_right) + top_right - bottom_left - (2.0 * center_left) - top_left
    vec2 botRight = vec2(w, -h);
    vec2 topRight = vec2(w, h);
    vec2 botLeft = vec2(-w, -h);
    vec2 topLeft = vec2(-w, h);
    vec2 centerRight = vec2(w, 0.0);
    vec2 centerLeft = vec2(-w, 0.0);
    vec2 sobel_h = (botRight + (2.0 * centerRight) + topRight - (botLeft + (2.0 * centerLeft) + topLeft)); 
    
    //Compute vertical gradient as follows:
    //sobel_v = bottom_left + (2.0 * bottom_center) + bottom_right - top_left - (2.0 * top_center) - top_right
    vec2 botCenter = vec2(0.0, -h);
    vec2 topCenter = vec2(0.0, h); 
    vec2 sobel_v = (botLeft + (2.0 * botCenter) + botRight - (topLeft + (2.0 * topCenter) + topRight)); 
    
    //The Sobel edge values can then be computed using the distance formula with the horizontal and vertical gradients
    //sobel_edge = sqrt(sobel_h^2 + sobel_v^2)
    vec2 sobel_edge = sqrt(sobel_h * sobel_h + sobel_v * sobel_v);
    
    //If the magnitude of the sobel edge vector is greater than or equal to 0.5, then make pixel black, otherwise make pixel normal color from the texture
    FragColor = texture(image, texcoord) * vec4( 1.0 - sobel.xy, 1.0, 1.0 );
    //if (length(sobel_edge) >= 0.5)
    //{
      //  FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    //}
}
