import Logo from "./Assests/logo.png"
import mainImg from "./Assests/mainimg.png"
import "./Stylesheets/Home.css"
import { useState } from "react";
import { FloatingLabel, Form } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Button ,Spinner} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState({
        visitPeriod: "",
        recommend: "",
        suggestions: "",
        followup: false
    })

    const [food, setFood] = useState(0);
    const [service, setService] = useState(0);
    const [experience, setExperience] = useState(0);
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFeedback({
            ...feedback,
            [name]: value,
        });
    };

    const handleSubmit = (async (e) => {
        e.preventDefault();
        setLoading(true)

        if (feedback.suggestions.length == 0 || feedback.recommend.length == 0 || feedback.visitPeriod.length == 0 || food === 0 || service == 0 || experience == 0) {
            setError(true)
            setLoading(false)

        } else {
            setError(false)
            console.log(feedback, food, service, experience)
            const response = await fetch("http://localhost:5000/feedback", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    visitPeriod: feedback.visitPeriod,
                    recommend: feedback.recommend,
                    suggestions: feedback.suggestions,
                    followup: feedback.followup,
                    food: food,
                    service: service,
                    experience: experience
                }),
            })

            if (response.ok === false) {
                alert("Failed");
            } else {
                alert("Success");
                setLoading(false);
                navigate("/dashboard")
            }
        }


    })
    return (
        <>
            <main id="home">
                <section>
                    <div className="head">
                        <img src={Logo} alt="logo" className="my-4" />
                        <img src={mainImg} alt="mainimg" className="my-4" />
                    </div>
                </section>
                <section className="content">
                    <div>
                        <h3 style={{ fontSize: "20px", fontWeight: "700" }}>Hello, Thanks for visiting</h3>
                        <p style={{ fontSize: "14px", fontWeight: "400", lineHeight: "21px" }}>Please help us improve our cafe services by filling in our feedback form. Thank you!</p>
                    </div>

                    <div className="my-2">
                        <Form>
                            <div className="my-3">
                                <p className="labells">How often do you visit here?</p>
                                <Form.Select aria-label="Default select example" className="m-3 p-3" name="visitPeriod" onChange={handleChange} >
                                    <option>Please Select</option>
                                    <option value="Regularly">Regularly</option>
                                    <option value="Intermittently">Intermittently</option>
                                </Form.Select>
                            </div>
                            <div className="my-3">

                                <p className="labells">Quality of the food</p>
                                <Rating
                                    name="food"
                                    size="large"
                                    className="px-5"
                                    value={food}
                                    onChange={(event, newValue) => {
                                        setFood(newValue);
                                    }}
                                />
                            </div>
                            <div className="my-3">
                                <p className="labells">Service Quality</p>
                                <Rating
                                    name="service"
                                    size="large"
                                    value={service}
                                    onChange={(event, newValue) => {
                                        setService(newValue);
                                    }}
                                />
                            </div>
                            <div className="my-3">
                                <p className="labells">Overall Experience</p>
                                <Rating
                                    name="experience"
                                    size="large"
                                    value={experience}
                                    onChange={(event, newValue) => {
                                        setExperience(newValue);
                                    }}
                                />
                            </div>
                            <div className="my-3">
                                <Form.Label style={{ display: "block" }} className="labells mb-3" >Would you recommend our restaurant to others?</Form.Label>
                                <Form.Check type="radio" label="Yes" name="recommend" inline id="inline-radio-1" value="Yes" onChange={handleChange} />
                                <Form.Check type="radio" label="No" name="recommend" inline id="inline-radio-2" value="No" onChange={handleChange} />
                            </div>

                            <div className="my-3">
                                <Form.Label htmlFor="suggestions" className="labells mb-3">Your suggestions to improve</Form.Label>
                                <Form.Control as="textarea" style={{ height: '200px' }} id="suggestions" name="suggestions" value={feedback?.suggestions} onChange={handleChange} />
                            </div>

                            <div className="my-3">
                                <Form.Check
                                    type="checkbox"
                                    id="followup"
                                    label="Receive personal follow up to your feedback"
                                    name="followup"
                                    checked={feedback.followup}
                                    onChange={handleChange}
                                />
                            </div>
                            {error && <div>
                                <p className="err">Fill all the details</p>
                            </div>}
                            <div className="my-3">
                                <Button type="submit" variant="danger" className="labells" style={{ width: "100%" }} onClick={handleSubmit}>{loading ?
                                    <Spinner animation="border" className="text-center" />
                                    : <>Submit Feedback</>
                                }</Button>
                            </div>
                        </Form>
                    </div>
                </section >
            </main >
        </>
    )
}


export default Home