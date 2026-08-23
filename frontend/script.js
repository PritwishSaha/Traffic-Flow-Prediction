const form = document.getElementById("predictionForm");

const carInput = document.getElementById("car_count");
const bikeInput = document.getElementById("bike_count");
const busInput = document.getElementById("bus_count");
const truckInput = document.getElementById("truck_count");

const totalVehicles = document.getElementById("totalVehicles");

const placeholder = document.getElementById("placeholder");
const resultContent = document.getElementById("resultContent");

const predictButton = document.getElementById("predictButton");
const buttonText = document.getElementById("buttonText");

const statusCircle = document.getElementById("statusCircle");


/* ==============================
   CALCULATE TOTAL VEHICLES
============================== */

function updateTotal() {

    const car =
        Number(carInput.value) || 0;

    const bike =
        Number(bikeInput.value) || 0;

    const bus =
        Number(busInput.value) || 0;

    const truck =
        Number(truckInput.value) || 0;

    const total =
        car + bike + bus + truck;

    totalVehicles.textContent = total;

    /* little pop when the total changes */

    totalVehicles.style.transform = "scale(1.15)";

    requestAnimationFrame(() => {

        setTimeout(() => {

            totalVehicles.style.transform = "scale(1)";

        }, 120);

    });
}


carInput.addEventListener(
    "input",
    updateTotal
);

bikeInput.addEventListener(
    "input",
    updateTotal
);

busInput.addEventListener(
    "input",
    updateTotal
);

truckInput.addEventListener(
    "input",
    updateTotal
);


/* Initial calculation */

updateTotal();


/* ==============================
   FORM SUBMISSION
============================== */

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        /* Get values */

        const date =
            Number(
                document.getElementById("date").value
            );

        const hour =
            Number(
                document.getElementById("hour").value
            );

        const minute =
            Number(
                document.getElementById("minute").value
            );

        const dayOfWeek =
            Number(
                document.getElementById("day_of_week").value
            );

        const car =
            Number(carInput.value);

        const bike =
            Number(bikeInput.value);

        const bus =
            Number(busInput.value);

        const truck =
            Number(truckInput.value);

        const rushHour =
            document.getElementById("rush_hour").checked
                ? 1
                : 0;


        /* Validate */

        if (
            car < 0 ||
            bike < 0 ||
            bus < 0 ||
            truck < 0
        ) {

            alert(
                "Vehicle counts cannot be negative."
            );

            return;
        }


        /* Loading state */

        predictButton.classList.add("loading");

        buttonText.textContent =
            "Analyzing Traffic...";


        try {

            const response =
                await fetch(
                    "https://traffic-flow-prediction-22ii.onrender.com/predict",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            date: date,

                            car_count: car,

                            bike_count: bike,

                            bus_count: bus,

                            truck_count: truck,

                            hour: hour,

                            minute: minute,

                            rush_hour: rushHour,

                            day_of_week:
                                dayOfWeek

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok || !data.success) {

                throw new Error(
                    data.error ||
                    "Prediction failed."
                );

            }


            /* Show result */

            showPrediction(data);


        } catch (error) {

            console.error(error);

            alert(
                "Unable to connect to the ML server.\n\n" +
                "Make sure Flask is running on port 5000."
            );

        } finally {

            predictButton.classList.remove(
                "loading"
            );

            buttonText.textContent =
                "Predict Traffic";

        }

    }
);


/* ==============================
   DISPLAY PREDICTION
============================== */

function showPrediction(data) {

    placeholder.classList.add("hidden");


    /* retrigger entrance animations even on repeat predictions */

    resultContent.classList.add("hidden");

    void resultContent.offsetWidth;

    resultContent.classList.remove("hidden");

    statusCircle.style.animation = "none";

    void statusCircle.offsetWidth;

    statusCircle.style.animation = "";


    /* Prediction */

    const prediction =
        data.prediction;

    const predictionElement =
        document.getElementById(
            "predictionResult"
        );

    predictionElement.textContent =
        prediction;


    /* Confidence */

    const confidence =
        Number(data.confidence) || 0;

    document.getElementById(
        "confidenceValue"
    ).textContent =
        confidence.toFixed(2) + "%";


    const confidenceFill =
        document.getElementById(
            "confidenceFill"
        );

    confidenceFill.style.width =
        confidence + "%";


    /* Total */

    document.getElementById(
        "resultTotal"
    ).textContent =
        data.total;


    /* Probabilities */

    const probabilities =
        data.probabilities || {};


    updateProbability(
        "low",
        probabilities.low
    );

    updateProbability(
        "normal",
        probabilities.normal
    );

    updateProbability(
        "high",
        probabilities.high
    );

    updateProbability(
        "heavy",
        probabilities.heavy
    );


    /* Status styling */

    updateTrafficStatus(
        prediction
    );

}


/* ==============================
   UPDATE PROBABILITY
============================== */

function updateProbability(
    name,
    value
) {

    const probability =
        Number(value) || 0;


    const valueElement =
        document.getElementById(
            name + "Probability"
        );

    const barElement =
        document.getElementById(
            name + "Bar"
        );


    if (valueElement) {

        valueElement.textContent =
            probability.toFixed(2) + "%";

    }


    if (barElement) {

        barElement.style.width =
            probability + "%";

    }

}


/* ==============================
   TRAFFIC STATUS
============================== */

const STATUS_COLORS = {
    low: "#4fd6ff",
    normal: "#35e28a",
    high: "#ffb238",
    heavy: "#ff5c6c"
};

const STATUS_EMOJI = {
    low: "🟢",
    normal: "🔵",
    high: "🟡",
    heavy: "🔴"
};

function updateTrafficStatus(
    prediction
) {

    const normalized =
        prediction.toLowerCase();

    statusCircle.textContent =
        STATUS_EMOJI[normalized] || "🚦";

    const color =
        STATUS_COLORS[normalized] || "#35e28a";

    statusCircle.style.borderColor = color;

    statusCircle.style.boxShadow =
        `0 0 34px ${color}40`;

}
