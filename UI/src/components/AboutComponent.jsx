import React from 'react';
import Header from '../Header.jsx';

export default function About() {
  return (
    <>
      <Header />
      <section>
        <div className="cover-image">
          <img src="../../assets/team.jpg" alt="Cover Image" />
          <div className="overlay">
            <h1>About Us</h1>
          </div>
        </div>

        <section className="about-section">
          <div className="about-us-container">
            <div className="row">
              <div className="col-md-6">
                <video className="img-fluid" src="../../assets/Patterns.mp4" controls> </video>
              </div>
              <div className="col-md-6">
                <h2>Welcome to CollegeConnect</h2>
                <p>
                  the ultimate social networking platform for college students. We are passionate about connecting students from all over the world and providing them with a unique platform to connect, collaborate, and succeed together.
                </p>
                <p>
                  At CollegeConnect, our mission is to create a thriving online community where college students can network, share knowledge, and explore opportunities. We believe that by connecting students from diverse backgrounds, we can foster an environment of collaboration and growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-us-container">
            <div className="row">
              <div className="col-md-6 order-md-2">
                <img src="../../assets/mantwo.jpg" alt="About Us Image" className="img-fluid" />
              </div>
              <div className="col-md-6 order-md-1">
                <h3>Success Stories</h3>
                <h2>Sarah Johnson - Founding a Startup</h2>
                <p>
                  "CollegeConnect played a pivotal role in my entrepreneurial journey. Through the platform, I connected with like-minded students who shared my passion for innovation. Together, we founded a startup that has now grown into a successful business. CollegeConnect provided the support and resources we needed to turn our dreams into reality."


                </p>

              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-us-container">
            <div className="row">
              <div className="col-md-6">
                <img src="../../assets/man.jpg" alt="About Us Image" className="img-fluid" />
              </div>
              <div className="col-md-6">
                <h2>Mark Davis - Landing an Internship

                </h2>
                <p>
                  "I owe my internship opportunity to CollegeConnect. By connecting with professionals in my field of interest, I gained valuable insights and guidance. The platform allowed me to showcase my skills and connect with recruiters. Thanks to CollegeConnect, I secured an internship that kickstarted my career."


                </p>

              </div>
            </div>
          </div>
        </section>

        {/* <div className="image-container">
      <img src="../../assets/group.jpg" alt="Large Image" />
    </div> */}

        <div className="cover-image midimg">
          <img src="../../assets/group.jpg" alt="Cover Image" />
          <div className="overlay">
            <h1>We’re commited to fostering a safe and supportive community for everyone</h1>
          </div>
        </div>

        <section className="about-section">
          <div className="about-us-container footerspace">
            <div className="row">
              <div className="col-md-6 order-md-2">
                <img src="../../assets/graduate.jpg" alt="About Us Image" className="img-fluid" />
              </div>
              <div className="col-md-6 order-md-1">
                <h3>Stand out on CollegeConnect</h3>

                <p>
                  Connect with more people, build influence, and create compelling network that's distinctly yours.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}