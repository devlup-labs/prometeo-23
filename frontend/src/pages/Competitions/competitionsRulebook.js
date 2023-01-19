import { useState, useEffect } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import { PDFObject } from 'react-pdfobject'

import { backendURL } from "../../backendURL";

function Competitions_Rulebook() {
    const [pdfURL, setPdfURL] = useState({});
    const location = useLocation();
    const [urlParams] = useSearchParams();

    useEffect(() => {
        async function fetchData() {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");
            headers.append("Origin", "http://localhost:3000");

            const requestOptions = {
                method: "GET",
                headers: headers,
            };

            const fetchURL = `${backendURL}/events/`;

            await fetch(fetchURL, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    data = data.filter(
                        (item) => item.id == urlParams.get("id")
                    );
                    setPdfURL(data[0].rulebook.replace(
                        "0.0.0.0:8888",
                        "apiv.prometeo.in"
                    ));
                    // console.log("Data:", data[0]);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        const card = location.state;
        // console.log("Card:", card);

        if (card) {
            //   console.log("pewpewpew");
            setPdfURL(card.rulebook);
        } else {
            // console.log("pewpewpew2");
            fetchData();
        }
    }, []);

    return (
        <PDFObject url={pdfURL} />
    )
}

export default Competitions_Rulebook;
