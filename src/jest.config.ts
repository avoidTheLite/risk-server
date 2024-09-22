import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  // [...]
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
    "transform": {
      "^.+\\.[tj]sx?$": [
        'ts-jest',
        {
          useESM: true,
        },
      ],
    },
  setupFilesAfterEnv: ['./jest.setup.ts']
  }

  export default jestConfig