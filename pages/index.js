import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// http://samples.openweathermap.org/data/2.5/weather?q=Lahore,PK&appid=542ffd081e67f4512b705f89d2a611b2
const Home = () => {
    const [position, setposition] = useState({});
    const [loading, setloading] = useState(true);
    const [weather, setweather] = useState([]);
    const [isReadyComple, setisReadyComple] = useState(false);
    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setposition(position);
            setloading(false);
        });
    };
    const getData = async () => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=36fa0f6ccfde4d1d66df5bc9c6827756`
        );
        setweather(response.data);
        console.log(response.data);
        setisReadyComple(true);
    };

    useEffect(() => {
        if (!loading) {
            getData();
        }
    }, [loading]);
    useEffect(() => {
        getUserLocation();
        return () => {};
    }, []);

    return (
        <section id="Home">
            <Navbar />
            <div className="content">
                <div className="main-card">
                    <div className="current-temp">
                        <p>
                            Current Temp🌡:{" "}
                            <span>
                                {isReadyComple
                                    ? Math.round(weather.main.temp - 273.15)
                                    : "..."}
                                °C
                            </span>
                        </p>
                        <p>
                            Feel Like🤒:{" "}
                            <span>
                                {isReadyComple
                                    ? Math.round(
                                          weather.main.feels_like - 273.15
                                      )
                                    : "..."}
                                °C
                            </span>
                        </p>
                    </div>
                    <div className="cloud-detail">
                        <h1>Other Details</h1>
                        <div className="detail">
                            <h2>
                                Clouds:{" "}
                                {isReadyComple
                                    ? Math.round(weather.clouds.all)
                                    : "..."}
                                %
                            </h2>
                            <h2>
                                Variation:{" "}
                                {isReadyComple
                                    ? Math.round(weather.main.temp_min - 273.15)
                                    : "..."}
                                °C to{" "}
                                {isReadyComple
                                    ? Math.round(weather.main.temp_max - 273.15)
                                    : "..."}
                                °C
                            </h2>
                            <h2>
                                Humidity:{" "}
                                {isReadyComple
                                    ? Math.round(weather.main.humidity)
                                    : "..."}
                                %
                            </h2>
                            <h2>
                                Presssure:{" "}
                                {isReadyComple
                                    ? Math.round(weather.main.pressure)
                                    : "..."}
                                %
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
