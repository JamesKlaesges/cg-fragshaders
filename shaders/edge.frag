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
    vec2 sample = vec2(1.0 / ((texcoord.x - width) + (texcoord.x + width)), 1.0 / ((texcoord.y - height) + (texcoord.y + height)));
    
    //Compute horizontal gradient as follows:
    //sobel_h = bottom_right + (2.0 * center_right) + top_right - bottom_left - (2.0 * center_left) - top_left
    vec2 botRight = (texcoord.x + width/2, texcoord.y - height/2);
    vec2 topRight = (texcoord.x + width/2, texcoord.y + height/2);
    vec2 botLeft = (texcoord.x - width/2, texcoord.y - height/2);
    vec2 topLeft = (texcoord.x - width/2, texcoord.y + height/2);
    vec2 centerRight = (texcoord.x + width/2, texcoord.y);
    vec2 centerLeft = (texcoord.x - width/2, texcoord.y);
    vec2 sobel_h = (botRight + (2.0 * centerRight) + topRight - botLeft - (2.0 * centerLeft) - topLeft); 
    
    //Compute vertical gradient as follows:
    //sobel_v = bottom_left + (2.0 * bottom_center) + bottom_right - top_left - (2.0 * top_center) - top_right
    vec2 botCenter = (texcoord.x, texcoord.y - height/2);
    vec2 topCenter = (texcoord.x, texcoord.y + height/2); 
    vec2 sobel_v = (botLeft + (2.0 * botCenter) + botRight - botLeft - (2.0 * topCenter) - topRight); 
    
    //The Sobel edge values can then be computed using the distance formula with the horizontal and vertical gradients
    //sobel_edge = sqrt(sobel_h2 + sobel_v2)
    vec2 sobel_edge = sqrt(sobel_h + sobel_v);
    
    //If the magnitude of the sobel edge vector is greater than or equal to 0.5, then make pixel black, otherwise make pixel normal color from the texture
    FragColor = texture(image, texcoord);
    if (length(sobel_edge) >= 0.5)
    {
        FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
}
