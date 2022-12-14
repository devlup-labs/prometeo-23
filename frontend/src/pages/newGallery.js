import "./newGallery.css";
import { useState, useEffect } from "react";
import { backendURL } from "../backendURL";

export default function Gallery() {
    const [galleryData, setGalleryData] = useState([]);
    const [currentImage, setCurrentImage] = useState(-1);

    let animationDuration = 200;
    

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

            await fetch(`${backendURL}/gallery/`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setGalleryData(data);
                    // console.log(...data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        fetchData();
    }, []);

    useEffect(() => {
        // console.log(galleryData);

        const track = document.getElementById("gallery-image-track");

        const handleOnDown = (e) => {
            track.dataset.mouseDownAt = e.clientX
            // console.log(e.clientX)
        };

        const handleOnUp = () => {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;
        };

        const handleOnMove = (e) => {
            // console.log("moving");
            if (track.dataset.mouseDownAt === "0") {
                console.log("mouseDownAt is 0");
                if (currentImage!==-1) openImage(currentImage);
                return;
            }

            const mouseDelta =
                    parseFloat(track.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 2;

            // console.log(mouseDelta);

            const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentageUnconstrained =
                    parseFloat(track.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(
                    Math.min(nextPercentageUnconstrained, 0),
                    -100
                );

            track.dataset.percentage = nextPercentage;

            track.animate(
                {
                    transform: `translate(${nextPercentage}%, -50%)`,
                },
                { duration: 1200, fill: "forwards" }
            );

            for (const image of track.getElementsByClassName("gallery-image")) {
                image.animate(
                    {
                        objectPosition: `${100 + nextPercentage}% center`,
                    },
                    { duration: 1200, fill: "forwards" }
                );
            }
        };

        // const ele = document.getElementById("gallery-image-track");
        const ele = window;

        if (currentImage === -1) {
            ele.onmousedown = (e) => {
                document.getElementById("gallery-image-track").style.cursor =
                    "grabbing";
                handleOnDown(e);
            };

            ele.ontouchstart = (e) => handleOnDown(e.touches[0]);

            ele.onmouseup = (e) => {
                document.getElementById("gallery-image-track").style.cursor =
                    "grab";
                handleOnUp(e);
            };

            ele.ontouchend = (e) => handleOnUp(e.touches[0]);

            ele.onmousemove = (e) => handleOnMove(e);

            ele.ontouchmove = (e) => handleOnMove(e.touches[0]);
        }
    }, [galleryData]);

    useEffect(() => {
        console.log(currentImage);
    }, [currentImage]);

    const openImage = (num) => {
        console.log("opening image");
        if (num === -1) return;
        const image = document.getElementById(`gallery-image-${num}`);
        const showcase = document.getElementById("gallery-showcase");

        showcase.innerHTML = `<img src="${image.src}" alt="showcase-image" id="gallery-showcase-img" />`;
        showcase.style.display = "flex";
        // animate the opacity
        // showcase.animate(
        //     {
        //         opacity: [0, 1],
        //     },
        //     { duration: animationDuration, fill: "forwards" }
        // );
    };

    const handleClick = (id) => {
        console.log(id);
        setCurrentImage(id);
    };

    return (
        <div className="gallery-container">
            <div
                id="gallery-showcase"
                onClick={() => {
                    // document.getElementById("gallery-showcase").animate(
                    //     {
                    //         opacity: [1, 0],
                    //     },
                    //     { duration: animationDuration, fill: "forwards" }
                    // );
                    setTimeout(() => {
                        document.getElementById(
                            "gallery-showcase"
                        ).style.display = "none";
                    }, 300);
                    setCurrentImage(-1);
                }}
            ></div>
            <div
                id="gallery-image-track"
                data-mouse-down-at="0"
                data-prev-percentage="0"
            >
                {galleryData.map((data) => {
                    return (
                        <img
                            className="gallery-image"
                            src={data.image.replace(
                                "0.0.0.0:8888",
                                "apiv.prometeo.in"
                            )}
                            alt="image"
                            key={data.id}
                            id={`gallery-image-${data.id}`}
                            draggable="false"
                            onClick={() =>
                                {
                                    console.log("clicked");
                                    handleClick(data.id);
                                }
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}
