import "./newNewGallery.css";
import { useState, useEffect } from "react";
import { backendURL } from "../backendURL";

export default function NewGallery() {
    useEffect(() => {
        const navBarEle = document.getElementById("navbar");
        navBarEle.style.opacity = 1;
    });

    const [galleryData, setGalleryData] = useState([]);
    const [stop, setStop] = useState(false);
    const [galleryCompData, setGalleryCompData] = useState([]);

    // let drag = false;
    let animationDuration = 200;

    var imageLinks = [];

    // const imageLinks = [
    //     "https://i.imgur.com/B2ieX9p.jpg",
    //     "https://i.imgur.com/AlLF2g2.jpg",
    //     "https://i.imgur.com/XKI6vlW.jpg",
    //     "https://i.imgur.com/Fp7LGVZ.jpg",
    //     "https://i.imgur.com/QMfpyZr.jpg",
    // ];

    // change this to the number of images from backend

    const [numOfImages, setNumOfImages] = useState(0);

    useEffect(() => {
        console.log(galleryData.length, numOfImages);
        let percentage = parseInt(
            (100 * galleryData.length) / numOfImages
                ? (100 * galleryData.length) / numOfImages
                : 0
        );
        let loaderText = document.getElementById("gallery-loader-text");
        loaderText.innerHTML = `${percentage}%`;
        let loaderBar = document.getElementById("gallery-loader-bar");
        loaderBar.style.width = `${percentage}%`;

        if (percentage === 100) {
            setTimeout(() => {

                let loader = document.getElementById("gallery-loader");
                loader.style.opacity = 0;
                setTimeout(() => {
                    loader.style.display = "none";
                }, 500);
                let heading = document.getElementById("gallery-heading");
                heading.style.opacity = 1;
                let track = document.getElementById("slider-image-track");
                track.style.opacity = 1;
                // if (!("ontouchstart" in window))
                //     track.style.transform = `translate(${-50}%, 0%)`;
                // let container = document.getElementById("gallery-container");
                // container.style.cursor = "grab";
            }, 500);
        }
    }, [galleryData, numOfImages]);

    useEffect(() => {
        // delete all images
        // let track = document.getElementById("slider-image-track");
        // while (track.firstChild) {
        //     track.removeChild(track.lastChild);
        // }

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
                    // choose image link and id
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].image === null) continue;
                        if (
                            data[i].name === "Prometeo-23-logo" ||
                            data[i].name === "Theme Reveal"
                        )
                            continue;
                        imageLinks.push({
                            link: data[i].image.replace(
                                "0.0.0.0:8888",
                                "apiv.prometeo.in"
                            ),
                            id: data[i].id,
                        });
                    }
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        // wait for fetch to finish
        fetchData().then(() => {
            console.log("our data is", imageLinks[0]);

            setNumOfImages(imageLinks.length);

            console.log("num of images", numOfImages);

            for (let i = 0; i < imageLinks.length; i++) {
                // if (imageLinks[i].id === 1) continue;
                let img = new Image();
                img.src = imageLinks[i].link;
                img.draggable = false;
                // img.id = `gallery-image-${imageLinks[i].id}`;
                img.className = "slider-image";
                // img.height = 300;
                // img.onclick = () => {
                //     console.log("clicked");
                //     handleClick(i);
                // };

                img.onload = function () {
                    // console.log("image loaded");
                    let obj = {
                        src: img.src,
                        image: img,
                    };
                    console.log("image loaded");
                    setGalleryData((prev) => [...prev, obj]);
                    let div = document.createElement("div");
                    div.className = "slide";
                    div.appendChild(img);
                    // clone
                    let div2 = div.cloneNode(true);
                    let track1 = document.getElementById("track-1");
                    track1.appendChild(div);
                    let track2 = document.getElementById("track-2");
                    track2.appendChild(div2);
                };
            }
        });
    }, []);

    const openImage = (num) => {
        // disable pointer events
        setStop(true);
        // console.log("opening image", num);
        const image = document.getElementById(`gallery-image-${num}`);
        const showcase = document.getElementById("gallery-showcase");
        showcase.innerHTML = `<img src=${image.src} id="gallery-showcase-image" />`;
        showcase.style.display = "flex";
        // animate opacity
        showcase.animate(
            {
                opacity: [0, 1],
            },
            { duration: animationDuration, fill: "forwards" }
        );
    };

    return (
        <div id="gallery-container">
            <div id="gallery-loader">
                <div id="gallery-loader-text">0%</div>
                <div id="gallery-loader-bar"></div>
            </div>
            <div
                id="gallery-showcase"
                onClick={() => {
                    // document.getElementById("gallery-showcase").animate(
                    //     {
                    //         opacity: [1, 0],
                    //     },
                    //     { duration: animationDuration, fill: "forwards" }
                    // );
                    let showcase = document.getElementById("gallery-showcase");
                    showcase.innerHTML = "";
                    // animate opacity
                    showcase.animate(
                        {
                            opacity: [1, 0],
                        },
                        { duration: animationDuration, fill: "forwards" }
                    );
                    showcase.style.display = "none";
                    setStop(false);
                    // setCurrentImage(-1);
                    // document.getElementById(
                    //     "slider-image-track"
                    // ).style.pointerEvents = "all";
                }}
            ></div>
            <div id="gallery-heading">GALLERY</div>
            <div className="slider">
                <div className="slide-track" id="slider-image-track">
                    <div id="track-1"></div>
                    <div id="track-2"></div>
                </div>
            </div>
        </div>
    );
}
