// color design tokens export
export const tokensDark = {
    grey: {
        0: "#ffffff", // manually adjusted
        10: "#f2f2f2", // manually adjusted
        50: "#e6e6e6", // manually adjusted
        100: "#cccccc",
        200: "#b3b3b3",
        300: "#999999",
        400: "#808080",
        500: "#666666",
        600: "#4d4d4d",
        700: "#333333",
        800: "#1a1a1a",
        900: "#000000", // manually adjusted
    },
    primary: {
        // Midnight Blue
        100: "#34495e",
        200: "#2c3e50",
        300: "#283747",
        400: "#212f3d",
        500: "#1b2631",
        600: "#18222f",
        700: "#13191e",
        800: "#0f141b",
        900: "#0a0f13",
    },
    secondary: {
        // White
        50: "#ffffff",
        100: "#ffffff",
        200: "#ffffff",
        300: "#ffffff",
        400: "#ffffff",
        500: "#ffffff",
        600: "#ffffff",
        700: "#ffffff",
        800: "#ffffff",
        900: "#ffffff",
    },
    graph: {
        100: "#164D0E",
        200: "#FC2CC0",
        300: "#735305",
        400: "#AA6A5A",
        500: "#B405C1"
    }
};

export const tokensLight = {
    grey: {
        0: "#000000",
        10: "#1a1a1a",
        50: "#333333",
        100: "#4d4d4d",
        200: "#666666",
        300: "#808080",
        400: "#999999",
        500: "#b3b3b3",
        600: "#cccccc",
        700: "#e6e6e6",
        800: "#f2f2f2",
        900: "#ffffff",
    },
    primary: {
        // Slate Blue
        100: "#6a5acd",
        200: "#836fff",
        300: "#735be5",
        400: "#6451cc",
        500: "#5447b3",
        600: "#483d99",
        700: "#3c3380",
        800: "#302966",
        900: "#241f4d",
    },
    secondary: {
        // Midnight Blue
        50: "#34495e",
        100: "#2c3e50",
        200: "#283747",
        300: "#212f3d",
        400: "#1b2631",
        500: "#18222f",
        600: "#13191e",
        700: "#0f141b",
        800: "#0a0f13",
        900: "#070812",
    },
    graph: {
        100: "#074855",
        200: "#CD35E2",
        300: "#A2CDB9",
        400: "#F76D50",
        500: "#C46503"
    }
};

// function that reverses the color palette
// function reverseTokens(tokensDark) {
//   const reversedTokens = {};
//   Object.entries(tokensDark).forEach(([key, val]) => {
//       const keys = Object.keys(val);
//       const values = Object.values(val);
//       const length = keys.length;
//       const reversedObj = {};
//       for (let i = 0; i < length; i++) {
//           reversedObj[keys[i]] = values[length - i - 1];
//       }
//       reversedTokens[key] = reversedObj;
//   });
//   return reversedTokens;
// }
// export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
    //const graphColors = generateRandomGraphColors(5); // Adjust the count as needed
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        ...tokensDark.primary,
                        main: tokensDark.primary[400],
                        light: tokensDark.primary[400],
                    },
                    secondary: {
                        ...tokensDark.secondary,
                        main: tokensDark.secondary[300],
                    },
                    graphs: {
                        ...tokensDark.graph,
                    },
                    neutral: {
                        ...tokensDark.grey,
                        main: tokensDark.grey[500],
                    },
                    background: {
                        default: tokensDark.primary[600],
                        alt: tokensDark.primary[500],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        ...tokensLight.primary,
                        main: tokensDark.grey[50],
                        light: tokensDark.grey[100],
                    },
                    secondary: {
                        ...tokensLight.secondary,
                        main: tokensDark.secondary[600],
                        light: tokensDark.secondary[700],
                    },
                    graphs: {
                        ...tokensLight.graph,
                    },
                    neutral: {
                        ...tokensLight.grey,
                        main: tokensDark.grey[500],
                    },
                    background: {
                        default: tokensDark.grey[0],
                        alt: tokensDark.grey[50],
                    },
                }),
        },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};
