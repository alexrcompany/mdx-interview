// Modex Code Interview
// ---------------------
// Author: Alex Andreu
// Date: 03/06/2024
// Disclaimer: This script has been tested and run with node v18.10.0

// Information provided by MODEX to solve this problem:
// ----------------------------------------------------
// Problem Statement:
// You are given an array nums of integers representing a sequence of stock prices for a single stock over a period of n days. Your task is to write a Node.js function maxProfitK(prices, k) that calculates the maximum profit that can be obtained by completing at most k transactions.
// Write a Node.js function maxProfitK(prices, k) that takes an array prices of integers representing the stock prices and an integer k representing the maximum number of transactions allowed, and returns the maximum profit that can be obtained.

// Input:
// An array prices of integers representing the stock prices for each day, where prices[i] is the price of the stock on the i-th day (0-indexed).
// An integer k representing the maximum number of transactions allowed.

// Output:
// An integer representing the maximum profit that can be obtained by completing at most k transactions.


// Start of the implementation
// -----------------------------------------------------
// Description: I've added a few extra steps to make it easier to test over 
// the command line so you can type 'node mpk.js <INTEGER>' on the command line
// to test different screnarios

// Mock values for the stock prices
const dailyStockPrices = [6,11,14,21,8,23,21,14,29,23,14,33]

// Default K value if non provided over the command line
var k = 3

// Command-line arguments
const args = process.argv;

// Retrieve k from the command line if passed
// Ignore the first two arguments as they are always 'node <SCRIPT_NAME>'
// NOTE: Skip to Function Implementation for the actual solution, this is just 
// fodder to improve usability
if (args.length >= 3) {
    k = args[2];

    // Validate the input
    // Check for integer value
    if (isNaN(k)) {
        console.error('ERROR: k must be a number');
        process.exit(1); // We exit with a non-zero number to indicate an error. 2 is used as an example
    }

    // Check for the maximum amount of transactions, assuming max 1 per day.
    if(k > dailyStockPrices.length){
        console.error('ERROR: K can\'t be bigger than the available number of days(',dailyStockPrices.length,')');
        process.exit(2); // Exit with a different error from the one above, this should be documented if this 
                         // was a real program in our current stack.
    }
    console.log('Setting K to:', k);

} else {
    // Let the user know they can actually provide a value for k
    // over the command line.
    console.warn('No K value provided. Using', k);
    console.info('You can provide a value for k using the syntax below:')
    console.info('node ktrans.js 3')
}

// -------------------------------------
// Function implementation and solution
// -------------------------------------
// To calculate the maximum profit we can make over k transactions we can build a matrix 
// with the daily prices as columns and maximum profit for that day up to that row number of transactions.
// By iterating this matrix we can compare each day prices to the previous days prices and decide if we
// should make a transaction. This matrix will have prices x (k +1) size (Being the first row all 0's always as that's 
// the maximum profit you can get with 0 transactions).
// Example profit matrix for K = 2 for prices [6,11,14,21,8,23,21,14,29,23,14,33]
// K=0 [
//     [
//       0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0,
//       0, 0
//     ],
//     [
//       0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0,
//       0, 0
//     ],
//     [
//       0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0,
//       0, 0
//     ],
// ]
// K=1 [
//   [
//     0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0,
//     0, 0
//   ],
//   [
//      0,  5,  8, 15, 15,
//     17, 17, 17, 23, 23,
//     23, 27
//   ],
//   [
//     0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0,
//     0, 0
//   ]
// ]
// K=2 [
//   [
//     0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0,
//     0, 0
//   ],
//   [
//      0,  5,  8, 15, 15,
//     17, 17, 17, 23, 23,
//     23, 27
//   ],
//   [
//      0,  5,  8, 15, 15,
//     30, 30, 30, 36, 36,
//     36, 42
//   ]
// ]
// This would work fine, no problem, but it would require nested loops to go over every possible profit
// for every single value of k, navigating every row and every column in a two dimensional array. 
// As we can assume that profit only goes up or stays the same as K increases there's a simple way to 
// reduce the complexity of this solution by just keeping track of two possible profit outcomes by diving
// the matrix into it's odd and even rows and simplifying the data structure to a one dimensional array each.
// We iterate over this two arrays by comparing each row to the previous one and then choosing
// the one we need according to the module of k once we've calculated the final possible profit at k = k;
function maxProfitK(prices, k) {

    // Check if the stock prices are available
    // This is added just to clarify that input validation 
    // should never be taken for granted, as we DO KNOW we've set 
    // the array value at the top of the script.
    if (!prices.length) {
        return -1; // We return -1 to indicate an error, just in case this is part of a bigger 
                   // picture and we want to use the outcome for further decission making down the line
    }

    // Just in case someone wants to mess with the result, there's no need to calculate anything 
    // when k = 0, so we return the right profits right away
    if (k === 0){
        return 0;
    }

    // Initialize the even k values profit array with the same length as the stock prices list as this is the maximum
    // number of transactions we can have. Remember, we assume 1 transaction per day tops. 
    // Then we initialize every position to 0.
    let evenProfits = new Array(prices.length).fill(0);
    // We do the same as above for the odd values of k
    let oddProfits = new Array(prices.length).fill(0);
    // Profit values
    // Our profits at current k value
    let currProfits;
    // Our profits at k - 1
    let prevProfits;
    // Current maximum profits
    let currMax;

    // Now we iterate over the values for k > 0 as it would be wastefull to compute this knowing it's 0 already.
    for (let t = 1; t <= k; t++) {

        // Initialize our maximum profit for this iteration. I'm using this constant just to be more elegant.
        // Anything bellow the first price in the stock price list would work just fine.
        currMax = Number.NEGATIVE_INFINITY;

        // We check for k being odd or even and assign the current and previous profits array
        // acordingly. This will swap the k = 1, for k = 3, then k = 3 for k = 5 and so on. (Same for odd values).
        if (t % 2 === 1) {
            currProfits = oddProfits;
            prevProfits = evenProfits;
        } else {
            currProfits = evenProfits;
            prevProfits = oddProfits;
        }

        // For every position in the current array, we start an index at position 2 and check the maximum profit for that
        // day at k transactions and we store it as the maximum profits if above.
        for (let d = 1; d < prices.length; d++) {
            // We calculate how much we would have left by subtracting the previous day stock price
            // from our yesterday's profits in the other row. Remember we're swapping odd and even ones.
            // We keep the maxium value being either the above stated or our current value.
            currMax = Math.max(currMax, prevProfits[d - 1] - prices[d - 1]);
            // Our maximum profit would then be either:
            // a: Our current maximum profit
            // b: Our previous profits + the price the price we sell the stock at for the day
            // So we store that value in the current row (odd or even) so that it will be used as prevProfits in
            // the following iteration.
            currProfits[d] = Math.max(currProfits[d - 1], currMax + prices[d]);
        }
    }

    // We finally return the appropriate value by returning the last even row if k is even 
    // and the odd one if it isn't. The -1 one in the indexes is to compensate for the 0 indexing in arrays.
    return k % 2 === 0 ? evenProfits[prices.length - 1] : oddProfits[prices.length - 1];
}

// Clean up the screen for improved readability. 
console.clear();

// Finaly we return the value over the terminal. 
// I've added a bit of flavour text, to make it more friendly.
console.log('Welcome to the MODEX exchange');
console.log('ALX stock prices', dailyStockPrices,'for the last',dailyStockPrices.length,'days');
console.log('Your maximum expected profit for K =',k,'transactions is',maxProfitK(dailyStockPrices,k),'MONETARY_UNITS');