/** @format */

// Passed between functions to know whether a box has been clicked or not, strictly for the border color change in event handlers
let selectedCard = null;

const carDetails = (index) => {
    // Debugging
    console.log("Car: " + cars[index].make);

    // For box of current object, rewrite the html of the entire box to include all the details of the vehicle
    // use of eq to find the index of the element
    const car = cars[index];
    $(".box").eq(index).html(
        `<div style="
            padding: 30px;
        ">
        
        <b>Details:</b>
        <ul>
            <li>$${car.price} Dollars </li>
            <li>${car.color} Vehicle</li>
            <li>${car.doors} Doors</li>
            <li>${car.miles} Miles</li>
        </ul>
        
        <b>Summary:</b>
        <ul>
            <li>${car.summary}</li>
        </ul>`
    );
};


// Reset card to base state
const resetCard = (index) => {
    // Grab current object
    const car = cars[index];
    
    // Rewrite the html of the entire box to it's base state
    $(".box").eq(index).html(
        `<h3 style="text-align: center;">${car.year} ${car.make} ${car.model}</h3>
         <img src="${car.image}"/>`
    );
};

// Setup the DOM
const setup = () => {
    // Display the details of each car
    // Call the carbox function to create the card boxes "card boxes -> car boxes -> carbox"
    jQuery.each($(".box"), carbox());

    // Event handler for element getting clicked event
    $(".box").on("click", function () {
        // Find the box clicked using the index method
        let carIndex = $(".box").index(this);

        // Call method to update card with current object
        carDetails(carIndex);
        //Debugging
        console.log("Car: " + cars[carIndex].make + " " + cars[carIndex].model);

        // Access wrapper => box(index) use css to change border
        $(`.wrapper .box:eq(${carIndex})`).css("border", "5px solid red");
        
        // Set variable to current card clicked
        selectedCard = carIndex;
    });

    // Event handler for the element getting moused over
    $(".box").on("mouseover", function () {
        let carIndex = $(".box").index(this);
        // Debugging
        console.log("Car: " + cars[carIndex].make + " " + cars[carIndex].model);

        // Conditional to check if mouseover is !happening on a clicked card
        if (selectedCard !== carIndex){
            // Access wrapper => box(index) use css to change border
            $(`.wrapper .box:eq(${carIndex})`).css("border", "5px solid yellow");
        }
    });

    // Event handler for the element getting moused out
    $(".box").on("mouseout", function () {
        let carIndex = $(".box").index(this);
        // Debugging
        console.log("Car: " + cars[carIndex].make + " " + cars[carIndex].model);

        // Call method to reset card to base state on mouseout
        resetCard(carIndex);

        // Access wrapper => box(index) use css to change border
        $(`.wrapper .box:eq(${carIndex})`).css("border", "");

        // Conditional to check if mouseout is occuring on a clicked card
        if (selectedCard === carIndex) {
            selectedCard = null;
        }
    });
};


// Fill content of each card
const carbox = () => {
    // Assign the wrapper element to wrapperRef
    let wrapperRef = $('.wrapper');
    
    // Apply instructions text to paragraph with id
    $("#instructions").html("Click the car to <b>Read</b> more of it's details!");

    // Run through cars and generate HTML for each car
    cars.forEach((car) => {
        let boxMarkup = `
          <div class="box">
            <h3 style="text-align: center;">${car.year} ${car.make} ${car.model}</h3>
            <img src="${car.image}"/>
          </div>`;
        wrapperRef.append(boxMarkup);
    });
};


// Document ready function to 'activate' the CRUD buttons when the document is ready
$(document).ready(() => {
    // Create Button will add a new vehicle
    $("#cButton").on("click", () => {
        // Start by getting all the necessary vehicle details from the user
        let year = prompt("Please enter the vehicle Year:");
        let make = prompt("Please enter the vehicle Make:");
        let model = prompt("Please enter the vehicle Model:");
        let doors = prompt("Please enter the number of doors:");
        let color = prompt("Please enter the vehicle Color:");
        let price = prompt("Please enter the price:");
        let miles = prompt("Please enter the mileage:");
        let summary = prompt("Please enter a vehicle summary:");

        console.log(`Year: ${year}, 
            \nMake: ${make}, 
            \nModel: ${model}, 
            \nDoors: ${doors}, 
            \nColor: ${color}, 
            \nPrice: ${price}, 
            \nMiles: ${miles}, 
            \nSummary: ${summary}`
        ); // Log the user input

        // Make sure no empty fields before pushing to array, otherwise alert user and return
        if (!year || !make || !model || !doors || !color || !price || !miles || !summary) {
            alert("All fields are required. Please try again.");
            return;
        }

        // Push the new vehicle into array and apply the generic image
        cars.push({
            make,
            model,
            year: parseInt(year), // Ensure year is an integer
            doors: parseInt(doors), // Ensure doors is an integer
            color,
            price: parseFloat(price), // Ensure price is a float
            miles: parseInt(miles), // Ensure miles is an integer
            summary,
            image: "./images/genericImage.png" // Set image to generic car
        });

        $(".wrapper").empty(); // Clear the wrapper to remove previous vehicle cards    
        setup(); // Callback function called to setup the ensure changes are displayed automatically
        $(".wrapper").show(); // Show the wrapper on DOM
        alert("Vehicle created successfully. DOM updated!");
    });
    
///////Decided to remove and let the click event handler be the "Read" button for that specific object
    // // Read Button will display all vehicles
    // $("#rButton").on("click", () => {
    //     console.log("Read Button Clicked"); // Log the button click
    //     $(".wrapper").empty(); // Clear the wrapper to remove previous vehicle cards    
    //     setup(); // Callback function to display vehicle, details, and events
    //     $(".wrapper").show(); // Show the wrapper on DOM
    // });
///////Decided to remove and let the click event handler be the "Read" button for that specific object


    // Update Button
    $("#uButton").on("click", () => {
        // Start by getting the vehicle details to update
        let year = prompt("Please enter the Year of vehicle to update:");
        let make = prompt("Please enter the Make of vehicle to update:");
        let model = prompt("Please enter the Model of vehicle to update:");

        console.log(`Year: ${year}, Make: ${make}, Model: ${model}`); // Log the user input

        // Find the car in the array using the provided details
        let car = cars.find(c => c.year == year && c.make == make && c.model == model);
        console.log(car); // Log the found car object

        // If car is found, prompt user for which aspect to update
        if (car) {
            let response = prompt(`Please enter a number between 1 and 10 to determine which aspect you'd like to update:
                \n1. Year
                \n2. Make
                \n3. Model
                \n4. Doors
                \n5. Color
                \n6. Price
                \n7. Mileage
                \n8. Summary
                \n9. All
                \n10. Cancel`
            );

            console.log(`Response: ${response}`); // Log user response
            switch (response) {
                case "1":
                    car.year = parseInt(prompt("Please enter a new vehicle Year:", car.year)); // Display current year in prompt
                    console.log(`Updated Year: ${car.year}`); // Log the updated year
                    break;

                case "2":
                    car.make = prompt("Please enter a new vehicle Make:", car.make); // Display current make in prompt
                    console.log(`Updated Make: ${car.make}`); // Log the updated make
                    break;

                case "3":
                    car.model = prompt("Please enter a new vehicle Model:", car.model); // Display current model in prompt
                    console.log(`Updated Model: ${car.model}`); // Log the updated model
                    break;

                case "4":
                    car.doors = parseInt(prompt("Please enter the new number of doors:", car.doors)); // Display current doors in prompt
                    console.log(`Updated Doors: ${car.doors}`); // Log the updated doors
                    break;

                case "5":
                    car.color = prompt("Please enter a new vehicle color:", car.color); // Display current color in prompt
                    console.log(`Updated Color: ${car.color}`); // Log the updated color
                    break;

                case "6":
                    car.price = parseFloat(prompt("Please enter a new vehicle price:", car.price)); // Display current price in prompt
                    console.log(`Updated Price: ${car.price}`); // Log the updated price
                    break;

                case "7":
                    car.miles = parseInt(prompt("Please enter a new vehicle mileage:", car.miles)); // Display current mileage in prompt
                    console.log(`Updated Mileage: ${car.miles}`); // Log the updated mileage
                    break;

                case "8":
                    car.summary = prompt("Please enter a new vehicle summary:", car.summary); // Display current summary in prompt
                    console.log(`Updated Summary: ${car.summary}`); // Log the updated summary
                    break;
                
                case "9":
                    car.year = parseInt(prompt("Please enter a new vehicle Year:", car.year));        // Display current year in prompt
                    car.make = prompt("Please enter a new vehicle Make:", car.make);                  // Display current make in prompt
                    car.model = prompt("Please enter a new vehicle Model:", car.model);               // Display current model in prompt
                    car.doors = parseInt(prompt("Please enter the new number of doors:", car.doors)); // Display current doors in prompt
                    car.color = prompt("Please enter a new vehicle color:", car.color);               // Display current color in prompt
                    car.miles = parseInt(prompt("Please enter a new vehicle mileage:", car.miles));   // Display current mileage in prompt
                    car.price = parseFloat(prompt("Please enter a new vehicle price:", car.price));   // Display current price in prompt
                    car.summary = prompt("Please enter a new vehicle summary:", car.summary);         // Display current summary in prompt
                    console.log(`Updated Vehicle:
                        \nYear: ${car.year},
                        \nMake: ${car.make},
                        \nModel: ${car.model},
                        \nDoors: ${car.doors},
                        \nColor: ${car.color},
                        \nPrice: $${car.price},
                        \nMileage: ${car.miles},
                        \nSummary: ${car.summary}`
                    ); // Log the updated vehicle
                    break;

                case "10": // If user cancels
                    alert("Update cancelled.");
                    return;

                default: // If not option chosen
                    alert("Invalid option. Please enter a number between 1 and 10.");
                    return;
            }

            $(".wrapper").empty(); // Clear the wrapper to remove previous vehicle cards    
            setup(); // Callback function called to setup the ensure changes are displayed automatically
            $(".wrapper").show(); // Show the wrapper on DOM
            alert("Vehicle information updated successfully. DOM updated!");
        } 
        else {
            alert("Vehicle not in list, check spelling and try again.");
        }
    });


    // Delete Button
    $("#dButton").on("click", () => {
        // Start by getting the vehicle details to delete
        let year = prompt("Please enter the Year of vehicle to delete:");
        let make = prompt("Please enter the Make of vehicle to delete:");
        let model = prompt("Please enter the Model of vehicle to delete:");
        console.log(`Year: ${year}, Make: ${make}, Model: ${model}`); // Log the user input

        // Find the index of the vehicle in the array
        let index = cars.findIndex(c => c.year == year && c.make == make && c.model == model);
        console.log(`Index: ${index}`); // Log the index of the vehicle

        // If the vehicle is found, remove it from the array or alert if not found
        if (index !== -1) {
            cars.splice(index, 1); // Remove the vehicle from the array and only the vehicle found
            console.log("Vehicle removed successfully."); // Log the removal

            $(".wrapper").empty(); // Clear the wrapper to remove previous vehicle cards    
            setup(); // Callback function called to setup the ensure changes are displayed automatically
            $(".wrapper").show(); // Show the wrapper on DOM
            alert("Vehicle removed. DOM updated!");
        } else {
            alert("Vehicle not in list, check spelling and try again.");
        }
    });

    setup(); // Initial setup to display vehicles and their details
});
