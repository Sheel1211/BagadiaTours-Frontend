"use client";
import React, { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import Breadcrumb from "@/components/common/Breadcrumb";
import QuantityCounter from "@/uitils/QuantityCounter";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import Newslatter from "@/components/common/Newslatter";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Loader from "../../../loading.js";
import { toast, ToastContainer } from "react-toastify";
const Page = () => {
  const params = useParams();
  const itemId = params.itemId;
  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isOpenimg, setOpenimg] = useState({
    openingState: false,
    openingIndex: 0,
  });

  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [durationOfStay, setDurationOfStay] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [numberOfKids, setNumberOfKids] = useState("");
  const [numberOfInfant, setNumberOfInfant] = useState("");
  const [budget, setBudget] = useState("");

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    try {
      // Constructing the form data object
      const formData = {
        fullName,
        country,
        email,
        startDate,
        durationOfStay,
        numberOfPersons,
        numberOfKids,
        numberOfInfant,
        contactNumber,
        budget,
      };

      const response = await axios
        .post("http://localhost:4000/api/v1/inquiry/addInquiry", formData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });

      console.log("Inquiry submitted successfully!");
      setFullName("");
      setCountry("");
      setEmail("");
      setStartDate(new Date());
      setDurationOfStay("");
      setNumberOfPersons("");
      setContactNumber("");
      setNumberOfKids("");
      setNumberOfInfant("");
      setBudget("");
    } catch (error) {
      console.error("Error submitting inquiry:", error.message);
      setFullName("");
      setCountry("");
      setEmail("");
      setStartDate(new Date());
      setDurationOfStay("");
      setNumberOfPersons("");
      setContactNumber("");
      setNumberOfKids("");
      setNumberOfInfant("");
      setBudget("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(`http://localhost:4000/api/v1/tour/getTour/${itemId}`)
          .then((response) => {
            setData(response.data.tour);
            // console.log("Data " + JSON.stringify(response.data));
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } catch (e) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {/* <ToastContainer /> */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Breadcrumb pagename="Package Details" pagetitle="Package Details" />
          <div className="package-details-area pt-120 mb-120 position-relative">
            <div className="container">
              <div className="row">
                <div className="co-lg-12">
                  <div className="package-img-group mb-50">
                    <div className="row align-items-center g-3">
                      <div className="col-lg-6">
                        <div
                          className="gallery-img-wrap"
                          style={{ cursor: "pointer" }}
                        >
                          <img src={data.images && data.images[0]} alt="" />
                          <a>
                            <i
                              className="bi bi-eye"
                              onClick={() =>
                                setOpenimg({
                                  openingState: true,
                                  openingIndex: 0,
                                })
                              }
                            />
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-6 h-100">
                        <div className="row g-3 h-100">
                          {!isLoading &&
                            data &&
                            data.images &&
                            (data.images.length <= 5 ? (
                              <div className="row">
                                {data.images.map(
                                  (item, index) =>
                                    index !== 0 && (
                                      <div className="col-6" key={index}>
                                        <div className="gallery-img-wrap active">
                                          <img src={item} alt="" />
                                        </div>
                                      </div>
                                    )
                                )}
                              </div>
                            ) : (
                              <div className="row">
                                {data.images.slice(1, 5).map((item, index) => (
                                  <div className="col-6" key={index}>
                                    <div className="gallery-img-wrap active">
                                      <img src={item} alt="" />
                                      {index === 3 && (
                                        <button
                                          className="StartSlideShowFirstImage"
                                          onClick={() =>
                                            setOpenimg({
                                              openingState: true,
                                              openingIndex: 3,
                                            })
                                          }
                                        >
                                          <i className="bi bi-plus-lg" /> View
                                          More Images
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}

                          {/* <div className="col-6">
                        <div className="gallery-img-wrap active">
                          <img
                            src="/assets/img/innerpage/package-05.jpg"
                            alt=""
                          />
                          <a
                            data-fancybox="gallery-01"
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpen(true)}
                          >
                            <i className="bi bi-play-circle" /> Watch Video
                          </a>
                        </div>
                      </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="others-image-wrap d-none">
            <a
              href="assets/img/innerpage/package-01.jpg"
              data-fancybox="images"
            >
              <img src="/assets/img/innerpage/blog-grid-img3.jpg" alt="" />
            </a>
            <a
              href="assets/img/innerpage/package-02.jpg"
              data-fancybox="images"
            >
              <img src="/assets/img/innerpage/blog-grid-img3.jpg" alt="" />
            </a>
            <a
              href="assets/img/innerpage/package-03.jpg"
              data-fancybox="images"
            >
              <img src="/assets/img/innerpage/blog-grid-img3.jpg" alt="" />
            </a>
            <a
              href="assets/img/innerpage/package-04.jpg"
              data-fancybox="images"
            >
              <img src="/assets/img/innerpage/blog-grid-img3.jpg" alt="" />
            </a>
            <a
              href="assets/img/innerpage/package-05.jpg"
              data-fancybox="images"
            >
              <img src="/assets/img/innerpage/blog-grid-img3.jpg" alt="" />
            </a>
          </div> */}
              <div className="row g-xl-4 gy-5">
                <div className="col-xl-8">
                  <h2>{data && data.title}</h2>
                  <h4>Tour Type:{data && data.tourType}</h4>
                  <div className="tour-price">
                    <h3>₹ {data && data.price}/</h3>
                    <span>per person</span>
                  </div>

                  <ul className="tour-info-metalist">
                    <li>
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14C5.14348 14 3.36301 13.2625 2.05025 11.9497C0.737498 10.637 0 8.85652 0 7C0 5.14348 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14348 0 7 0C8.85652 0 10.637 0.737498 11.9497 2.05025C13.2625 3.36301 14 5.14348 14 7ZM7 3.0625C7 2.94647 6.95391 2.83519 6.87186 2.75314C6.78981 2.67109 6.67853 2.625 6.5625 2.625C6.44647 2.625 6.33519 2.67109 6.25314 2.75314C6.17109 2.83519 6.125 2.94647 6.125 3.0625V7.875C6.12502 7.95212 6.14543 8.02785 6.18415 8.09454C6.22288 8.16123 6.27854 8.2165 6.3455 8.25475L9.408 10.0048C9.5085 10.0591 9.62626 10.0719 9.73611 10.0406C9.84596 10.0092 9.93919 9.93611 9.99587 9.83692C10.0525 9.73774 10.0682 9.62031 10.0394 9.50975C10.0107 9.39919 9.93982 9.30426 9.842 9.24525L7 7.62125V3.0625Z"></path>
                      </svg>
                      {data && data.days} Days / {data && data.nights} Night
                    </li>
                    <li>
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 7C7.92826 7 8.8185 6.63125 9.47487 5.97487C10.1313 5.3185 10.5 4.42826 10.5 3.5C10.5 2.57174 10.1313 1.6815 9.47487 1.02513C8.8185 0.368749 7.92826 0 7 0C6.07174 0 5.1815 0.368749 4.52513 1.02513C3.86875 1.6815 3.5 2.57174 3.5 3.5C3.5 4.42826 3.86875 5.3185 4.52513 5.97487C5.1815 6.63125 6.07174 7 7 7ZM14 12.8333C14 14 12.8333 14 12.8333 14H1.16667C1.16667 14 0 14 0 12.8333C0 11.6667 1.16667 8.16667 7 8.16667C12.8333 8.16667 14 11.6667 14 12.8333Z"></path>
                      </svg>
                      Min People : {data && data.maxPeople}
                    </li>
                    <li>
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14 0.43748C14 0.372778 13.9856 0.308889 13.9579 0.250418C13.9302 0.191947 13.8898 0.140348 13.8398 0.0993396C13.7897 0.0583312 13.7312 0.0289339 13.6684 0.0132656C13.6057 -0.00240264 13.5402 -0.00395173 13.4768 0.00872996L9.1875 0.86623L4.89825 0.00872996C4.84164 -0.00258444 4.78336 -0.00258444 4.72675 0.00872996L0.35175 0.88373C0.252608 0.903546 0.163389 0.957088 0.099263 1.03525C0.0351366 1.11342 6.10593e-05 1.21138 0 1.31248L0 13.5625C3.90711e-05 13.6272 0.0144289 13.6911 0.0421328 13.7495C0.0698367 13.808 0.110165 13.8596 0.160212 13.9006C0.210259 13.9416 0.268779 13.971 0.331556 13.9867C0.394332 14.0024 0.459803 14.0039 0.52325 13.9912L4.8125 13.1337L9.10175 13.9912C9.15836 14.0025 9.21664 14.0025 9.27325 13.9912L13.6482 13.1162C13.7474 13.0964 13.8366 13.0429 13.9007 12.9647C13.9649 12.8865 13.9999 12.7886 14 12.6875V0.43748ZM4.375 12.3287V0.97123L4.8125 0.88373L5.25 0.97123V12.3287L4.89825 12.2587C4.84165 12.2474 4.78335 12.2474 4.72675 12.2587L4.375 12.3287ZM8.75 13.0287V1.67123L9.10175 1.74123C9.15836 1.75254 9.21664 1.75254 9.27325 1.74123L9.625 1.67123V13.0287L9.1875 13.1162L8.75 13.0287Z"
                        ></path>
                      </svg>
                      {data.country && data.country}
                    </li>
                  </ul>
                  <p>{data && data.tourDescription}</p>
                  <h4>Included</h4>
                  <div className="includ-and-exclud-area mb-20">
                    <ul>
                      {data &&
                        data.included.split("\n").map(
                          (line, index) =>
                            line.trim() !== "" && (
                              <li key={index}>
                                <i className="bi bi-check-lg" /> {line}
                              </li>
                            )
                        )}
                    </ul>
                    {/* <ul className="exclud">
                      {data &&
                        data.excluded.split("\n").map(
                          (line, index) =>
                            line.trim() !== "" && (
                              <li key={index}>
                                <i className="bi bi-x-lg" /> {line}
                              </li>
                            )
                        )}
                    </ul> */}
                  </div>
                  <h4>Excluded</h4>
                  <div className="includ-and-exclud-area mb-20">
                    {/* <ul>
                      {data &&
                        data.included.split("\n").map(
                          (line, index) =>
                            line.trim() !== "" && (
                              <li key={index}>
                                <i className="bi bi-check-lg" /> {line}
                              </li>
                            )
                        )}
                    </ul> */}
                    <ul className="exclud">
                      {data &&
                        data.excluded.split("\n").map(
                          (line, index) =>
                            line.trim() !== "" && (
                              <li key={index}>
                                <i className="bi bi-x-lg" /> {line}
                              </li>
                            )
                        )}
                    </ul>
                  </div>

                  <h4>Itinerary</h4>
                  <div className="accordion tour-plan" id="tourPlan">
                    {!isLoading &&
                      data.daysDescription &&
                      data.daysDescription.map((item, index) => (
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              <span>Day {index + 1} :</span>
                              {data.daysTitles[index]}
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#tourPlan"
                          >
                            <div className="accordion-body">
                              <p>{/* {item} */}</p>
                              <ul>
                                <li>
                                  <i className="bi bi-check-lg" /> {item}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <h4>{!isLoading && data && data.transportMode} Details:</h4>
                  {!isLoading &&
                    data &&
                    data.modeDetails.map((detail, index) => (
                      <div
                        key={index}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className="ticket inverse"
                          style={{
                            display: "inline-block",
                            width: "350px",
                            margin: "20px",
                            backgroundColor: "#273138",
                            borderRadius: "10px",
                            color: "#fff",
                            fontFamily: "Helvetica Neue",
                            fontWeight: "300",
                            letterSpacing: "1px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                          }}
                        >
                          <header
                            style={{
                              position: "relative",
                              height: "60px",
                              backgroundColor: "#1B252E",
                              padding: "10px",
                              borderRadius: "10px",
                            }}
                          >
                            <div
                              className="company-name"
                              style={{ lineHeight: "35px", textAlign: "left" }}
                            >
                              {detail.name}
                            </div>
                            <div
                              className="gate"
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "15px",
                                fontWeight: "400",
                                lineHeight: "18px",
                                textAlign: "center",
                                fontSize: "17px",
                              }}
                            >
                              {/* <div>Number</div> */}
                              <div>{detail.number}</div>
                            </div>
                          </header>
                          <section
                            className="airports"
                            style={{
                              padding: "5px 10px 10px 10px",
                              height: "150px",
                              textAlign: "center",
                              display: "flex",
                              justifyContent: "space-between",
                              position: "relative",
                            }}
                          >
                            <div
                              className="airport"
                              style={{
                                position: "relative",
                                margin: "10px",
                                textAlign: "center",
                                display: "inline-block",
                              }}
                            >
                              <div
                                className="airport-name"
                                style={{
                                  color: "#29A8EB",
                                  fontSize: "22px",
                                  fontWeight: "400",
                                }}
                              >
                                {detail.from}
                              </div>
                              {/* <div
                                className="airport-code"
                                style={{
                                  fontSize: "32px",
                                  fontWeight: "400",
                                  margin: "5px 0",
                                }}
                              >
                                {detail.fromAirportCode}
                              </div> */}
                              <div
                                className="dep-arr-label"
                                style={{
                                  color: "#9299A0",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                }}
                              >
                                Departing
                              </div>
                              <div
                                className="time"
                                style={{ fontSize: "17px", color: "#fff" }}
                              >
                                {detail.departureTime}
                              </div>
                            </div>
                            <div
                              className="airport"
                              style={{
                                position: "relative",
                                margin: "10px",
                                textAlign: "center",
                                display: "inline-block",
                              }}
                            >
                              <div
                                className="airport-name"
                                style={{
                                  color: "#29A8EB",
                                  fontSize: "22px",
                                  fontWeight: "400",
                                }}
                              >
                                {detail.to}
                              </div>
                              {/* <div
                                className="airport-code"
                                style={{
                                  fontSize: "32px",
                                  fontWeight: "400",
                                  margin: "5px 0",
                                }}
                              >
                                {detail.toAirportCode}
                              </div> */}
                              <div
                                className="dep-arr-label"
                                style={{
                                  color: "#9299A0",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                }}
                              >
                                Arriving
                              </div>
                              <div
                                className="time"
                                style={{ fontSize: "17px", color: "#fff" }}
                              >
                                {detail.arrivalTime}
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    ))}

                  <h4>Return {!isLoading && data && data.transportMode} Details:</h4>
                  {!isLoading &&
                    data &&
                    data.returnModeDetails.map((detail, index) => (
                      <div
                        key={index}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className="ticket inverse"
                          style={{
                            display: "inline-block",
                            width: "350px",
                            margin: "20px",
                            backgroundColor: "#273138",
                            borderRadius: "10px",
                            color: "#fff",
                            fontFamily: "Helvetica Neue",
                            fontWeight: "300",
                            letterSpacing: "1px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                          }}
                        >
                          <header
                            style={{
                              position: "relative",
                              height: "60px",
                              backgroundColor: "#1B252E",
                              padding: "10px",
                              borderRadius: "10px",
                            }}
                          >
                            <div
                              className="company-name"
                              style={{ lineHeight: "35px", textAlign: "left" }}
                            >
                              {detail.name}
                            </div>
                            <div
                              className="gate"
                              style={{
                                position: "absolute",
                                right: "15px",
                                top: "15px",
                                fontWeight: "400",
                                lineHeight: "18px",
                                textAlign: "center",
                                fontSize: "17px",
                              }}
                            >
                              {/* <div>Number</div> */}
                              <div>{detail.number}</div>
                            </div>
                          </header>
                          <section
                            className="airports"
                            style={{
                              padding: "5px 10px 10px 10px",
                              height: "150px",
                              textAlign: "center",
                              display: "flex",
                              justifyContent: "space-between",
                              position: "relative",
                            }}
                          >
                            <div
                              className="airport"
                              style={{
                                position: "relative",
                                margin: "10px",
                                textAlign: "center",
                                display: "inline-block",
                              }}
                            >
                              <div
                                className="airport-name"
                                style={{
                                  color: "#29A8EB",
                                  fontSize: "22px",
                                  fontWeight: "400",
                                }}
                              >
                                {detail.from}
                              </div>
                              {/* <div
                                className="airport-code"
                                style={{
                                  fontSize: "32px",
                                  fontWeight: "400",
                                  margin: "5px 0",
                                }}
                              >
                                {detail.fromAirportCode}
                              </div> */}
                              <div
                                className="dep-arr-label"
                                style={{
                                  color: "#9299A0",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                }}
                              >
                                Departing
                              </div>
                              <div
                                className="time"
                                style={{ fontSize: "17px", color: "#fff" }}
                              >
                                {detail.departureTime}
                              </div>
                            </div>
                            <div
                              className="airport"
                              style={{
                                position: "relative",
                                margin: "10px",
                                textAlign: "center",
                                display: "inline-block",
                              }}
                            >
                              <div
                                className="airport-name"
                                style={{
                                  color: "#29A8EB",
                                  fontSize: "22px",
                                  fontWeight: "400",
                                }}
                              >
                                {detail.to}
                              </div>
                              {/* <div
                                className="airport-code"
                                style={{
                                  fontSize: "32px",
                                  fontWeight: "400",
                                  margin: "5px 0",
                                }}
                              >
                                {detail.toAirportCode}
                              </div> */}
                              <div
                                className="dep-arr-label"
                                style={{
                                  color: "#9299A0",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                }}
                              >
                                Arriving
                              </div>
                              <div
                                className="time"
                                style={{ fontSize: "17px", color: "#fff" }}
                              >
                                {detail.arrivalTime}
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    ))}

                  <div className="tour-location">
                    <h4>Location Map</h4>
                    <div className="map-area mb-30">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14768.161623288532!2d70.8002221!3d22.2764592!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cb4363e7ee93%3A0xb5e2eb3f8b2036ca!2sBagadia%20Agency!5e0!3m2!1sen!2sin!4v1709207660663!5m2!1sen!2sin"
                        width={600}
                        height={450}
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                  {/* <div className="faq-content-wrap mb-80">
                    <div className="faq-content-title mb-20">
                      <h4>Frequently Asked &amp; Question</h4>
                    </div>
                    <div className="faq-content">
                      <div className="accordion" id="accordionTravel">
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="travelheadingOne"
                          >
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#travelcollapseOne"
                              aria-expanded="true"
                              aria-controls="travelcollapseOne"
                            >
                              01. How do I book a trip on your website?
                            </button>
                          </h2>
                          <div
                            id="travelcollapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="travelheadingOne"
                            data-bs-parent="#accordionTravel"
                          >
                            <div className="accordion-body">
                              Aptent taciti sociosqu ad litora torquent per
                              conubia nostra, per inci only Integer purus onthis
                              felis non aliquam.Mauris nec just vitae ann auctor
                              tol euismod sit amet non ipsul growing this.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="travelheadingTwo"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#travelcollapseTwo"
                              aria-expanded="false"
                              aria-controls="travelcollapseTwo"
                            >
                              02. What payment methods do you accept?
                            </button>
                          </h2>
                          <div
                            id="travelcollapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="travelheadingTwo"
                            data-bs-parent="#accordionTravel"
                          >
                            <div className="accordion-body">
                              Aptent taciti sociosqu ad litora torquent per
                              conubia nostra, per inceptos only Integer purus
                              onthis placerat felis non aliquam.Mauris nec justo
                              vitae ante auctor tol euismod sit amet non ipsul
                              growing this Praesent commodo at massa eget
                              suscipit. Utani vitae enim velit.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="travelheadingThree"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#travelcollapseThree"
                              aria-expanded="false"
                              aria-controls="travelcollapseThree"
                            >
                              03. Can I make changes to my reservation after
                              booking?
                            </button>
                          </h2>
                          <div
                            id="travelcollapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="travelheadingThree"
                            data-bs-parent="#accordionTravel"
                          >
                            <div className="accordion-body">
                              Aptent taciti sociosqu ad litora torquent per
                              conubia nostra, per inceptos only Integer purus
                              onthis placerat felis non aliquam.Mauris nec justo
                              vitae ante auctor tol euismod sit amet non ipsul
                              growing this Praesent commodo at massa eget
                              suscipit. Utani vitae enim velit.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="travelheadingFour"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#travelcollapseFour"
                              aria-expanded="false"
                              aria-controls="travelcollapseFour"
                            >
                              04. What is your cancellation policy?
                            </button>
                          </h2>
                          <div
                            id="travelcollapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="travelheadingFour"
                            data-bs-parent="#accordionTravel"
                          >
                            <div className="accordion-body">
                              Aptent taciti sociosqu ad litora torquent per
                              conubia nostra, per inceptos only Integer purus
                              onthis placerat felis non aliquam.Mauris nec justo
                              vitae ante auctor tol euismod sit amet non ipsul
                              growing this Praesent commodo at massa eget
                              suscipit. Utani vitae enim velit.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="travelheadingFive"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#travelcollapseFive"
                              aria-expanded="false"
                              aria-controls="travelcollapseFive"
                            >
                              05. Do you offer group booking discounts?
                            </button>
                          </h2>
                          <div
                            id="travelcollapseFive"
                            className="accordion-collapse collapse"
                            aria-labelledby="travelheadingFive"
                            data-bs-parent="#accordionTravel"
                          >
                            <div className="accordion-body">
                              Aptent taciti sociosqu ad litora torquent per
                              conubia nostra, per inceptos only Integer purus
                              onthis placerat felis non aliquam.Mauris nec justo
                              vitae ante auctor tol euismod sit amet non ipsul
                              growing this Praesent commodo at massa eget
                              suscipit. Utani vitae enim velit.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="review-wrapper">
                <h4>Customer Review</h4>
                <div className="review-box">
                  <div className="total-review">
                    <h2>9.5</h2>
                    <div className="review-wrap">
                      <ul className="star-list">
                        <li>
                          <i className="bi bi-star-fill" />
                        </li>
                        <li>
                          <i className="bi bi-star-fill" />
                        </li>
                        <li>
                          <i className="bi bi-star-fill" />
                        </li>
                        <li>
                          <i className="bi bi-star-fill" />
                        </li>
                        <li>
                          <i className="bi bi-star-half" />
                        </li>
                      </ul>
                      <span>2590 Reviews</span>
                    </div>
                  </div>
                  
                  <div
                    className="modal fade"
                    id="exampleModalToggle"
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-body">
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <i className="bi bi-x-lg" />
                          </button>
                          <div className="row g-2">
                            <div className="col-lg-8">
                              <div className="review-from-wrapper">
                                <h4>Write Your Review</h4>
                                <form>
                                  <div className="row">
                                    <div className="col-md-6 mb-20">
                                      <div className="form-inner">
                                        <label>Name</label>
                                        <input
                                          type="text"
                                          placeholder="Enter Your Name:"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6 mb-20">
                                      <div className="form-inner">
                                        <label>Email</label>
                                        <input
                                          type="email"
                                          placeholder="Enter Your Email:"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12 mb-20">
                                      <div className="form-inner">
                                        <label>Review*</label>
                                        <textarea
                                          name="message"
                                          placeholder="Enter Your Review..."
                                          defaultValue={""}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-12 mb-40">
                                      <div className="star-rating-wrapper">
                                        <ul className="star-rating-list">
                                          <li>
                                            <div
                                              className="rating-container"
                                              data-rating={0}
                                            >
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                            </div>
                                            <span>Overall</span>
                                          </li>
                                          <li>
                                            <div
                                              className="rating-container"
                                              data-rating={0}
                                            >
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                            </div>
                                            <span>Transport</span>
                                          </li>
                                          <li>
                                            <div
                                              className="rating-container"
                                              data-rating={0}
                                            >
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                            </div>
                                            <span>Food</span>
                                          </li>
                                          <li>
                                            <div
                                              className="rating-container"
                                              data-rating={0}
                                            >
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                            </div>
                                            <span>Destination</span>
                                          </li>
                                          <li>
                                            <div
                                              className="rating-container"
                                              data-rating={0}
                                            >
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                              <i className="bi bi-star-fill star-icon" />
                                            </div>
                                            <span>Hospitality</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <button
                                        type="submit"
                                        className="primary-btn1"
                                      >
                                        Submit Now
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div className="col-lg-4 d-lg-flex d-none">
                              <div className="modal-form-image">
                                <img
                                  src="/assets/img/innerpage/form-image.jpg"
                                  alt="image"
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    className="primary-btn1"
                    data-bs-toggle="modal"
                    href="#exampleModalToggle"
                    role="button"
                  >
                    GIVE A RATING
                  </a>
                </div>
                <div className="review-area">
                  <ul className="comment">
                    <li>
                      <div className="single-comment-area">
                        <div className="author-img">
                          <img
                            src="/assets/img/innerpage/comment-author-01.jpg"
                            alt=""
                          />
                        </div>
                        <div className="comment-content">
                          <div className="author-name-deg">
                            <h6>Mr. Bowmik Haldar,</h6>
                            <span>05 June, 2023</span>
                          </div>
                          <ul className="review-item-list">
                            <li>
                              <span>Overall</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Transport</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Food</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Destination</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Hospitality</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <p>
                            A solution that we came up with is to think of
                            sanitary pads packaging as you would tea. Tea comes
                            individually packaged{" "}
                          </p>
                          <div className="replay-btn">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={14}
                              height={11}
                              viewBox="0 0 14 11"
                            >
                              <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z"></path>
                            </svg>
                            Reply (01)
                          </div>
                        </div>
                      </div>
                      <ul className="comment-replay">
                        <li>
                          <div className="single-comment-area">
                            <div className="author-img">
                              <img
                                src="/assets/img/innerpage/comment-author-02.jpg"
                                alt=""
                              />
                            </div>
                            <div className="comment-content">
                              <div className="author-name-deg">
                                <h6>Author Response,</h6>
                                <span>05 June, 2023</span>
                              </div>
                              <p>Thanks for your review.</p>
                              <div className="replay-btn">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={14}
                                  height={11}
                                  viewBox="0 0 14 11"
                                >
                                  <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z"></path>
                                </svg>
                                Reply
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="single-comment-area">
                        <div className="author-img">
                          <img
                            src="/assets/img/innerpage/comment-author-04.jpg"
                            alt=""
                          />
                        </div>
                        <div className="comment-content">
                          <div className="author-name-deg">
                            <h6>Srileka Panday,</h6>
                            <span>05 June, 2023</span>
                          </div>
                          <ul className="review-item-list">
                            <li>
                              <span>Overall</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Transport</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Food</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Destination</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Hospitality</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <p>
                            A solution that we came up with is to think of
                            sanitary pads packaging as you would tea. Tea comes
                            individually packaged{" "}
                          </p>
                          <div className="replay-btn">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={14}
                              height={11}
                              viewBox="0 0 14 11"
                            >
                              <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z"></path>
                            </svg>
                            Reply
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="single-comment-area">
                        <div className="author-img">
                          <img
                            src="/assets/img/innerpage/comment-author-05.jpg"
                            alt=""
                          />
                        </div>
                        <div className="comment-content">
                          <div className="author-name-deg">
                            <h6>Mr. Bowmik Haldar,</h6>
                            <span>05 June, 2023</span>
                          </div>
                          <ul className="review-item-list">
                            <li>
                              <span>Overall</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Transport</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Food</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Destination</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                            <li>
                              <span>Hospitality</span>
                              <ul className="star-list">
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-fill" />
                                </li>
                                <li>
                                  <i className="bi bi-star-half" />
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <p>
                            However, here are some well-regarded car dealerships
                            known for their customer service, inventory, and
                            overall reputation. It's always a good idea to
                            research and read reviews specific...
                          </p>
                          <div className="replay-btn">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={14}
                              height={11}
                              viewBox="0 0 14 11"
                            >
                              <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z"></path>
                            </svg>
                            Reply
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */}
                </div>
                <div className="col-xl-4">
                  <div className="booking-form-wrap mb-40">
                    <h4>Inquire Your Tour</h4>
                    <p>
                      Reserve your ideal trip early for a hassle-free trip;
                      secure comfort and convenience!
                    </p>
                    {/* <div className="nav nav-pills mb-40" role="tablist">
                      <button
                        className="nav-link show active"
                        id="v-pills-booking-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-booking"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-booking"
                        aria-selected="true"
                      >
                        Online Booking
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-contact"
                        aria-selected="false"
                      >
                        Inquiry Form
                      </button>
                    </div> */}
                    <div className="tab-content" id="v-pills-tabContent2">
                      <div
                        className="tab-pane fade active show"
                        id="v-pills-booking"
                        role="tabpanel"
                        aria-labelledby="v-pills-booking-tab"
                      >
                        <div className="sidebar-booking-form">
                          <form>
                            <div className="form-inner mb-20">
                              <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                              />
                            </div>
                            <div className="form-inner mb-20">
                              <input
                                type="text"
                                placeholder="Destination"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                              />
                            </div>
                            <div className="form-inner mb-20">
                              <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>

                            <div className="form-inner mb-20">
                              <label>Travel Date:</label>

                              <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                              />
                            </div>
                            <div className="form-inner mb-20">
                              <input
                                type="text"
                                placeholder="Duration of Stay"
                                value={durationOfStay}
                                onChange={(e) =>
                                  setDurationOfStay(e.target.value)
                                }
                              />
                            </div>
                            <div className="form-inner mb-20">
                              <input
                                type="number"
                                placeholder="Number of Persons (Age 12+)"
                                value={numberOfPersons}
                                onChange={(e) =>
                                  setNumberOfPersons(e.target.value)
                                }
                              />
                            </div>
                            <div className="form-inner mb-20">
                              <input
                                type="number"
                                placeholder="Number of Kids (Age 2-12)"
                                value={numberOfKids}
                                onChange={(e) =>
                                  setNumberOfKids(e.target.value)
                                }
                              />
                            </div>
                            <div className="form-inner mb-20">
                              <input
                                type="number"
                                placeholder="Number of Infants (Age Upto 2)"
                                value={numberOfInfant}
                                onChange={(e) =>
                                  setNumberOfInfant(e.target.value)
                                }
                              />
                            </div>
                            <div className="form-inner mb-20">
                              <input
                                type="tel"
                                placeholder="Contact Number"
                                value={contactNumber}
                                onChange={(e) =>
                                  setContactNumber(e.target.value)
                                }
                              />
                            </div>
                            <div className="form-inner mb-20">
                              <input
                                type="tel"
                                placeholder="Budget"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                              />
                            </div>
                            <button
                              type="submit"
                              onClick={handleFormSubmission}
                              className="primary-btn1 two"
                            >
                              Send Inquiry
                            </button>
                          </form>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="v-pills-contact"
                        role="tabpanel"
                        aria-labelledby="v-pills-contact-tab"
                      >
                        <div className="sidebar-booking-form">
                          <form>
                            <div className="form-inner mb-20">
                              <label>
                                Full Name <span>*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Enter your full name"
                              />
                            </div>
                            <div className="form-inner mb-20">
                              <label>
                                Email Address <span>*</span>
                              </label>
                              <input
                                type="email"
                                placeholder="Enter your email address"
                              />
                            </div>
                            <div className="form-inner mb-20">
                              <label>
                                Phone Number <span>*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Enter your phone number"
                              />
                            </div>
                            <div className="form-inner mb-30">
                              <label>
                                Write Your Message <span>*</span>
                              </label>
                              <textarea
                                placeholder="Write your quiry"
                                defaultValue={""}
                              />
                            </div>
                            <div className="form-inner">
                              <button
                                type="submit"
                                className="primary-btn1 two"
                              >
                                Submit Now
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="banner2-card">
                    <img src="/assets/img/innerpage/support-img.jpg" alt="" />
                    <div className="banner2-content-wrap">
                      <div className="banner2-content">
                        <div className="hotline-area">
                          <div className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={28}
                              height={28}
                              viewBox="0 0 28 28"
                            >
                              <path d="M27.2653 21.5995L21.598 17.8201C20.8788 17.3443 19.9147 17.5009 19.383 18.1798L17.7322 20.3024C17.6296 20.4377 17.4816 20.5314 17.3154 20.5664C17.1492 20.6014 16.9759 20.5752 16.8275 20.4928L16.5134 20.3196C15.4725 19.7522 14.1772 19.0458 11.5675 16.4352C8.95784 13.8246 8.25001 12.5284 7.6826 11.4893L7.51042 11.1753C7.42683 11.0269 7.39968 10.8532 7.43398 10.6864C7.46827 10.5195 7.56169 10.3707 7.69704 10.2673L9.81816 8.61693C10.4968 8.08517 10.6536 7.1214 10.1784 6.40198L6.39895 0.734676C5.91192 0.00208106 4.9348 -0.21784 4.18082 0.235398L1.81096 1.65898C1.06634 2.09672 0.520053 2.80571 0.286612 3.63733C-0.56677 6.74673 0.0752209 12.1131 7.98033 20.0191C14.2687 26.307 18.9501 27.9979 22.1677 27.9979C22.9083 28.0011 23.6459 27.9048 24.3608 27.7115C25.1925 27.4783 25.9016 26.932 26.3391 26.1871L27.7641 23.8187C28.218 23.0645 27.9982 22.0868 27.2653 21.5995ZM26.9601 23.3399L25.5384 25.7098C25.2242 26.2474 24.7142 26.6427 24.1152 26.8128C21.2447 27.6009 16.2298 26.9482 8.64053 19.3589C1.0513 11.7697 0.398595 6.75515 1.18669 3.88421C1.35709 3.28446 1.75283 2.77385 2.2911 2.45921L4.66096 1.03749C4.98811 0.840645 5.41221 0.93606 5.62354 1.25397L7.67659 4.3363L9.39976 6.92078C9.60612 7.23283 9.53831 7.65108 9.24392 7.88199L7.1223 9.53232C6.47665 10.026 6.29227 10.9193 6.68979 11.6283L6.85826 11.9344C7.45459 13.0281 8.19599 14.3887 10.9027 17.095C13.6095 19.8012 14.9696 20.5427 16.0628 21.139L16.3694 21.3079C17.0783 21.7053 17.9716 21.521 18.4653 20.8753L20.1157 18.7537C20.3466 18.4595 20.7647 18.3918 21.0769 18.5979L26.7437 22.3773C27.0618 22.5885 27.1572 23.0128 26.9601 23.3399ZM15.8658 4.66809C20.2446 4.67296 23.7931 8.22149 23.798 12.6003C23.798 12.858 24.0069 13.0669 24.2646 13.0669C24.5223 13.0669 24.7312 12.858 24.7312 12.6003C24.7257 7.7063 20.7598 3.74029 15.8658 3.73494C15.6081 3.73494 15.3992 3.94381 15.3992 4.20151C15.3992 4.45922 15.6081 4.66809 15.8658 4.66809Z" />
                              <path d="M15.865 7.46746C18.6983 7.4708 20.9943 9.76678 20.9976 12.6001C20.9976 12.7238 21.0468 12.8425 21.1343 12.93C21.2218 13.0175 21.3404 13.0666 21.4642 13.0666C21.5879 13.0666 21.7066 13.0175 21.7941 12.93C21.8816 12.8425 21.9308 12.7238 21.9308 12.6001C21.9269 9.2516 19.2134 6.53813 15.865 6.5343C15.6073 6.5343 15.3984 6.74318 15.3984 7.00088C15.3984 7.25859 15.6073 7.46746 15.865 7.46746Z" />
                              <path d="M15.865 10.267C17.1528 10.2686 18.1964 11.3122 18.198 12.6C18.198 12.7238 18.2472 12.8424 18.3347 12.9299C18.4222 13.0174 18.5409 13.0666 18.6646 13.0666C18.7883 13.0666 18.907 13.0174 18.9945 12.9299C19.082 12.8424 19.1312 12.7238 19.1312 12.6C19.1291 10.797 17.668 9.33589 15.865 9.33386C15.6073 9.33386 15.3984 9.54274 15.3984 9.80044C15.3984 10.0581 15.6073 10.267 15.865 10.267Z" />
                            </svg>
                          </div>
                          <div className="content">
                            <span>To More Inquiry</span>
                            <h6>
                              <a href="tel:+990737621432">+777-799-6708</a>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Lightbox
              className="img-fluid"
              open={isOpenimg.openingState}
              plugins={[Fullscreen]}
              index={isOpenimg.openingIndex}
              close={() => setOpenimg(false)}
              styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
              slides={
                data.images &&
                data.images.map(function (elem) {
                  return { src: elem };
                })
              }
            />
            <React.Fragment>
              <ModalVideo
                channel="youtube"
                onClick={() => setOpen(true)}
                isOpen={isOpen}
                animationSpeed="350"
                videoId="r4KpWiK08vM"
                ratio="16:9"
                onClose={() => setOpen(false)}
              />
            </React.Fragment>
          </div>
          {/* <Newslatter /> */}
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
