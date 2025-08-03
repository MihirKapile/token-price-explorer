# Token Price Explorer

A single-page web application built with React that allows users to select crypto tokens and see their value relative to a USD amount and another crypto token. This project was built to assess frontend development skills, API interaction, and product sense.

## Deployed Application

**\[[https://token-price-explorer-one.vercel.app/](https://token-price-explorer-one.vercel.app/)]**

---

## Instructions to set up and run the project locally

### Prerequisites

* Node.js and npm installed on your machine.
* An active internet connection to fetch data from the API.

### Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd <your-project-directory>
   ```

3. **Install dependencies:**

   This project requires `@funkit/api-base`, which has peer dependency requirements that conflict with the standard `create-react-app` environment. To resolve this, use the `--legacy-peer-deps` flag during installation.

   ```bash
   npm install --legacy-peer-deps
   ```

4. **Configure Environment Variables:**

   * Create a new file in the root of the project directory named `.npmrc`. This file ensures that any future installations (including on deployment platforms like Vercel) handle dependency conflicts correctly. Add the following line:

     ```
     legacy-peer-deps = true
     ```
   * Next, create a file named `.env` in the root of the project. This file will hold your API key.
   * Add your API key to the `.env` file as follows:

     ```
     REACT_APP_FUNKIT_API_KEY=your_dev_api_key_here
     ```

5. **Run the application:**

   ```bash
   npm start
   ```

   This will start the development server and open the application in your default web browser, typically at `http://localhost:3000`.

---

## Assumptions and Design Choices

* **API Data Structure**: The application assumes the price information from the `getAssetPriceInfo` function is located in a `unitPrice` property of the returned object. This was determined through empirical testing, as the documentation for the return type was not provided.
* **Token List**: The list of supported tokens (USDC, USDT, ETH, WBTC) is hardcoded within the application for simplicity. In a full-scale application, this list would be fetched from a dedicated endpoint for easier maintenance.
* **Error Handling**: The application handles API errors gracefully. If a token price cannot be fetched for any reason (e.g., API failure, invalid token data), the interface will display "N/A" rather than crashing or showing a `NaN` value. This was an intentional choice to improve user experience.
* **Styling**: The UI was styled using standard CSS in the `App.css` file to keep the project lightweight and avoid introducing additional library dependencies. The layout follows the provided wireframe.

---

## Libraries Used

* **React**: The core framework used to build the single-page application.
* **@funkit/api-base**: The specified npm package used to interact with the cryptocurrency API to fetch token information and pricing data.
* **viem**: Installed as a peer dependency of `@funkit/api-base`. It is a modern, lightweight library for interacting with Ethereum and other EVM-compatible blockchains.
