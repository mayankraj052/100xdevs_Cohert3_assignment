/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
   // Check for null or empty input
   if (!transactions || transactions.length === 0) {
    return [];
  }

  // Create a dictionary to keep track of total spent per category
  const categoryTotals = {};

  // Iterate over each transaction
  transactions.forEach(transaction => {
    const { category, price } = transaction;
    // Initialize the category in the dictionary if not already present
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    // Add the price to the total for the category
    categoryTotals[category] += price;
  });

  // Convert the categoryTotals object into an array of objects
  return Object.keys(categoryTotals).map(category => ({
    category: category,
    totalSpent: categoryTotals[category],
  }));
}

module.exports = calculateTotalSpentByCategory;
