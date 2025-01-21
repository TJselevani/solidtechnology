// "use server";
// import winston from "winston";

// const { combine, timestamp, printf, colorize } = winston.format;
// // Explicitly define the type of logger
// let logger: winston.Logger;

// if (typeof window === "undefined") {
//   // Running in Node.js environment
//   // Define custom log levels and their corresponding colors
//   const customLevels = {
//     levels: {
//       error: 0,
//       warn: 1,
//       info: 2,
//       debug: 3,
//     },
//     colors: {
//       error: "red",
//       warn: "yellow",
//       info: "green",
//       debug: "cyan",
//     },
//   };

//   // Add colors to the logger
//   winston.addColors(customLevels.colors);

//   // Define a custom format for logging
//   const logFormat = printf(({ timestamp, level, message }) => {
//     return `[${timestamp}] ${level}: ${message}`;
//   });

//   // Create the logger instance
//   logger = winston.createLogger({
//     levels: customLevels.levels,
//     level: "info",
//     format: combine(
//       colorize(), // Enable colorization for console logs
//       timestamp(),
//       logFormat // Use the custom log format defined above
//     ),
//     transports: [
//       new winston.transports.Console(), // Log to console with colors
//       new winston.transports.File({
//         filename: "app.log", // Log errors to this file
//         level: "error", // Only log errors to this file
//         format: winston.format.uncolorize(), // No color in file logs
//       }),
//     ],
//   });
// } else {
//   // Running in browser environment
//   logger = {
//     info: console.log,
//     warn: console.warn,
//     error: console.error,
//     debug: console.debug,
//   } as unknown as winston.Logger; // Cast to winston.Logger for compatibility
// }

// // Exporting the logger instance for use in other files
// export { logger };
