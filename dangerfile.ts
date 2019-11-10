import { message, danger } from 'danger';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Runs all checks on the pull request.
 */
function runAllChecks() {
  /**
   * A list of filepaths.
   *
   * Includes all files modified (but not deleted) in this pull request.
   */
  const allFilePaths = [
    ...danger.git.created_files,
    ...danger.git.modified_files,
  ];

  // Give Thanks!
  message('Thanks opening the PR! You rock :)');

  // License Check
  allFilePaths.forEach(filePath => {
    if (fileNeedsLicense(filePath) && isMissingHeader(filePath)) {
      fail(`${filePath} is missing the license header`);
    }
  });
}

const LICENSE_HEADER: string[] = [
  `Copyright 2019 Example.com Inc`,
  `Licensed under the Apache License, Version 2.0 (the "License");`,
  `you may not use this file except in compliance with the License.`,
  `You may obtain a copy of the License at`,
  `http://www.apache.org/licenses/LICENSE-2.0`,
  `Unless required by applicable law or agreed to in writing, software`,
  `distributed under the License is distributed on an "AS IS" BASIS,`,
  `WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.`,
  `See the License for the specific language governing permissions and`,
  `limitations under the License.`,
];

function fileNeedsLicense(filepath: string) {
  return new RegExp(/\.(js|tsx?)$/).test(filepath);
}

function isMissingHeader(filepath: string) {
  // Load the file's contents as a string
  let content = fs.readFileSync(path.resolve(`./${filepath}`), {
    encoding: 'utf8',
  });

  // Make sure every lice of the license is in the file's contents.
  for (const line of LICENSE_HEADER) {
    if (!content.includes(line)) {
      return true;
    }
  }
}

runAllChecks();
