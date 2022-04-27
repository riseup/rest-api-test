// ! Turns globally off printing functions 'log' and 'debug' for testings
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn()
// };

// ! Turn off in a test
// jest.spyOn(global.console, 'log').mockImplementation(jest.fn());
// jest.spyOn(global.console, 'debug').mockImplementation(jest.fn());
// ! Then turn on again
// jest.spyOn(global.console, 'log').mockRestore();
// jest.spyOn(global.console, 'debug').mockRestore();
