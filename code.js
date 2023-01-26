function playBlackjack() {
    // Create an empty array to hold the player's hand
    let playerHand = [];
  
    // Add two cards to the player's hand
    playerHand.push(getRandomCard());
    playerHand.push(getRandomCard());
  
    // Calculate the total value of the player's hand
    let playerTotal = calculateHandValue(playerHand);
  
    // Create an empty array to hold the dealer's hand
    let dealerHand = [];
  
    // Add two cards to the dealer's hand
    dealerHand.push(getRandomCard());
    dealerHand.push(getRandomCard());
  
    // Calculate the total value of the dealer's hand
    let dealerTotal = calculateHandValue(dealerHand);
  
    // Check if the player has blackjack (an Ace and a 10-point card)
    if (playerTotal === 21) {
      console.log("Player has blackjack!");
    } else {
      // Player can choose to "hit" (take another card) or "stand" (keep their current hand)
      while (playerTotal < 21) {
        let choice = prompt("Hit or stand?");
        if (choice === "hit") {
          playerHand.push(getRandomCard());
          playerTotal = calculateHandValue(playerHand);
        } else if (choice === "stand") {
          break;
        } else {
          console.log("Invalid choice, please enter hit or stand.");
        }
      }
  
      // Check if the player has bust (a total over 21)
      if (playerTotal > 21) {
        console.log("Player busts!");
      } else {
        // Dealer must hit if their total is less than 17
        while (dealerTotal < 17) {
          dealerHand.push(getRandomCard());
          dealerTotal = calculateHandValue(dealerHand);
        }
  
        // Check if the dealer has bust
        if (dealerTotal > 21) {
          console.log("Dealer busts!");
        } else {
          // Determine the winner based on the highest total
          if (playerTotal > dealerTotal) {
            console.log("Player wins!");
          } else if (playerTotal < dealerTotal) {
            console.log("Dealer wins!");
          } else {
            console.log("It's a tie!");
          }
        }
      }
    }
  }