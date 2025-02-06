# LogRock-Challenge- # Playwright Parabank Automation

## Description
This project automates the registration, login, and fund transfer process on the Parabank demo website using Playwright.

## Requirements
- Node.js installed
- Playwright installed

## Setup
1. Clone this repository:
   ```sh
   git clone <repo-url>
   cd LogRock-Challenge-Playwright
   ```
2. Install dependencies:
   ```sh
   npm install
   npx playwright install
   ```

## Running the Test
Execute the following command in the terminal:
```sh
npx playwright test tests/parabank.test.js
```

To watch the test execution in real-time, use:
```sh
npx playwright test --headed
```

## Test Report
To generate a test report, run:
```sh
npx playwright test --reporter=html
```
The report will be available in the `playwright-report` folder and can be opened in a browser.

## Notes
- The script ensures the first available account is selected for transfers.
- A 10-second pause is added at the end of the test to allow viewing of the transfer confirmation.
