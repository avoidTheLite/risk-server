import type {Config} from '@jest/types';

const config: Config.InitialOptions ={ 
    verbose: true,
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    extensionsToTreatAsEsm: [".ts"],
    moduleFileExtensions: ["js", "ts"],
  };
  
export default config;