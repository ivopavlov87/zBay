import React from "react";
// import github from "./icons8-github-60.png";
// import linkedin from "./icons8-linkedin-50-1.png"

class Social extends React.Component {

    render() {
        return (
            <div className="social-container">
                <div className="social-list">
                    <a className="social-name" href="https://www.anisurkhan.com" target="_blank">Anisur Khan</a>
                    <br/>
                    <a href="https://www.linkedin.com/in/anisur-khan-88a00182/" className="social-linkedin" target="_blank"></a>
                    <br />
                    <a href="https://github.com/AnisurK24" className="social-github" target="_blank"></a>
                </div>
                <div className="social-list">
                    <a className="social-name" href="https://www.ivopavlov.com" target="_blank">Ivo Pavlov</a>
                    <br />
                    <a href="https://www.linkedin.com/in/ivopavlov" className="social-linkedin" target="_blank"></a>
                    <br />
                    <a href="https://github.com/ivopavlov87" className="social-github" target="_blank"></a>
                </div>
                <div className="social-list">
                    <a className="social-name" href="https://www.jonathanjohnson.com" target="_blank">Jonathan Johnson</a>
                    <br />
                    <a href="https://www.linkedin.com/in/jonathan-johnson-070807195/" className="social-linkedin" target="_blank"></a>
                    <br />
                    <a href="https://github.com/JonathanJohnson23" className="social-github" target="_blank"></a>
                </div>
                <div className="social-list">
                    <a className="social-name" href="https://donaldbatryn.me" target="_blank">Donald Batryn</a>
                    <br />
                    <a href="https://www.linkedin.com/in/donald-batryn-a81522187/" className="social-linkedin" target="_blank"></a>
                    <br />
                    <a href="https://github.com/DonaldBatryn/" className="social-github" target="_blank"></a>
                </div>
            </div>
        );
    }
}

export default Social;