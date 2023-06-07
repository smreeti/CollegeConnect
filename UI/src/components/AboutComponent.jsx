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

        <section className="about-section remmargin">
          <div className="container">
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

      <section id="top_selling_container">
        <h1>SUCCESS STORIES</h1>
        <div id="top_selling">
          <div class="items">
            <img className='imgbor' src="../../assets/ryan.jpg" alt="Scooby Doo" />
            <p class="product_title"> <span className='success'> Sarah Thompson
</span><br>
            </br></p>
           <p className='product_title'> Sarah, a high school student struggling with math, discovered EmpowerNet's vibrant online community. She connected with fellow students who excelled in math and found mentors who provided invaluable guidance. Through collaborative study sessions and resource sharing, Sarah's understanding of the subject skyrocketed. Encouraged by her newfound confidence, she pursued a degree in mathematics.

</p>



           
 
          </div>
          <div class="items">
            <img className='imgbor' src="../../assets/smiling.jpg" alt="Scooby Doo" />
            <p class="product_title"> <span className='success'>Michael Rodriguez

</span><br>
            </br></p>
           <p className='product_title'>Michael, a college freshman, faced difficulties transitioning from high school. He felt overwhelmed and isolated in his new academic environment. However, after joining EmpowerNet, he found a supportive network of like-minded students facing similar challenges. They shared tips on time management, study techniques, and coping with stress.


</p>



           
 
          </div>

          <div class="items">
            <img className='imgbor' src="../../assets/woman.jpg" alt="Scooby Doo" />
            <p class="product_title"> <span className='success'> Namita Thapar
</span><br>
            </br></p>
           <p className='product_title'> Namita, a shy and introverted student, struggled with public speaking. She yearned to overcome her fears and excel in this essential skill. Through EmpowerNet, she discovered a community dedicated to honing communication abilities. Emily participated in virtual speaking contests, received constructive feedback, and attended webinars hosted by renowned public speakers. </p>



           
 
          </div>

       

       
        </div>
      </section>

      <section className="cover-image midimg" id="hero_banner">
        <div>
          <div className="slideshow overlay">         
        </div>
        </div>
      </section>

      <p className='centertext'>We’re commited to fostering a safe and supportive community for everyone</p>


        <section className="about-section">
          <div className="container footerspace">
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