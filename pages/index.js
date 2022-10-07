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
                        <h5>Temp 🌡</h5>
                        <h1>
                            {isReadyComple
                                ? Math.round(weather.main.temp - 273.15)
                                : "..."}
                            °C
                        </h1>
                    </div>
                    <div className="detail-card">
                        <h1>Wind 💨</h1>
                        <p>
                            Speed:{" "}
                            {isReadyComple
                                ? Math.round(weather.wind.speed)
                                : "..."}
                            Km/h
                        </p>
                        <p>
                            Deg:{" "}
                            {isReadyComple
                                ? Math.round(weather.wind.deg)
                                : "..."}
                            Km/h
                        </p>
                        <p>
                            Gust: {isReadyComple ? weather.wind.gust : "..."}
                            Km/h
                        </p>
                    </div>

                    <div className="detail-card">
                        <h1>Rain 🌧</h1>
                        <p>
                            Clouds:{" "}
                            {isReadyComple
                                ? Math.round(weather.clouds.all)
                                : "..."}
                        </p>
                        <p>
                            Rain: {isReadyComple ? weather.visibility : "..."}
                        </p>
                        <p>
                            Gust: {isReadyComple ? weather.wind.gust : "..."}
                            Km/h
                        </p>
                    </div>
                    <div className="detail-card">
                        <h1>Others ⛅</h1>
                        <p>
                            Sunrise:{" "}
                            {isReadyComple ? weather.sys.sunrise : "..."}
                        </p>
                        <p>
                            Sunset:{" "}
                            {isReadyComple ? weather.sys.sunrise : "..."}
                        </p>
                        <p>
                            Feel Like:{" "}
                            {isReadyComple
                                ? Math.round(weather.main.feels_like - 273)
                                : "..."}
                            °C
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
