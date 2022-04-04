#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

#include <ios>
#include <string>
#include <sstream>
#include <unordered_map>
#include <fstream>
#include <iostream>
#include <stdexcept>

std::string rgb2hex(int r, int g, int b) {
    std::stringstream ss;
    ss << "#";
    ss << std::hex << (r << 16 | g << 8 | b);
    std::string str = ss.str();
    std::transform(str.begin(), str.end(), str.begin(), [](unsigned char c) { return std::toupper(c); });
    if (str.size() < 7 && str != "#0") std::cout << str << std::endl;
    return str;
}

std::unordered_map<std::string, int> colorMap = {
        {"#6D001A", 0},
        {"#BE0039", 1},
        {"#FF4500", 2},
        {"#FFA800", 3},
        {"#FFD635", 4},
        {"#FFF8B8", 5},
        {"#A368", 6},
        {"#CC78", 7},
        {"#7EED56", 8},
        {"#756F", 9},
        {"#9EAA", 10},
        {"#CCC0", 11},
        {"#2450A4", 12},
        {"#3690EA", 13},
        {"#51E9F4", 14},
        {"#493AC1", 15},
        {"#6A5CFF", 16},
        {"#94B3FF", 17},
        {"#811E9F", 18},
        {"#B44AC0", 19},
        {"#E4ABFF", 20},
        {"#DE107F", 21},
        {"#FF3881", 22},
        {"#FF99AA", 23},
        {"#6D482F", 24},
        {"#9C6926", 25},
        {"#FFB470", 26},
        {"#0", 27},
        {"#515252", 28},
        {"#898D90", 29},
        {"#D4D7D9", 30},
        {"#FFFFFF", 31},
};

int main(int argc, char** argv) {
    std::string filePath;
    std::cin >> filePath;
    int width, height, channels;
    uint8_t* image = stbi_load(filePath.c_str(), &width, &height, &channels, 3);
    if (image == nullptr) throw std::runtime_error("Failed to load image. Check file path!");

    int row;
    std::stringstream out;
    out << "[\n";
    for (int y = 0; y < height; ++y) {
        row = (width * 3) * y;
        out << "[";
        for (int x = 0; x < width; ++x) {
            const int off = x * 3;
            out << colorMap[rgb2hex(image[row + off], image[row + off + 1], image[row + off + 2])];
            out << ",";
        }
        out << "],\n";
    }
    out << "]";

    std::ofstream file(filePath + ".txt");
    file << out.str();
    file.close();

    stbi_image_free(image);
    return 0;
}
