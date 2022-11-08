import React from 'react'
import "./../style.css"

const Footer = () => {
  return (
    <div>
        <div className='footerbox'>
            <div className="footerleft">
                <h2 className='subtext'>About Us & Links</h2>
                <div className="column">
                    Lorem ipsum dolor sit amet consecteciunt sequi sed ex fuga!
                    
                </div>
                <div className="column">
                    Lorem ipsum dolor sit amet cque ut velit.
                    
                </div>
                <div className="column">
                    Lorem ipsum dolor sit, amet a molestiae corporis maxime?
                    
                </div>                
                

            </div>
            <div className="right">
                <div className="socials">
                    <a href="https://www.facebook.com/"><img src="https://img.icons8.com/color/48/000000/facebook-new.png"/></a>
                    <a href="https://www.instagram.com/"><img src="https://img.icons8.com/color/48/000000/instagram-new.png"/></a>
                    <a href="https://www.twitter.com/"><img src="https://img.icons8.com/color/48/000000/twitter.png"/></a>
                    <a href="https://www.youtube.com/"><img src="https://img.icons8.com/color/48/000000/youtube-play.png"/></a>

                </div>

            </div>
        </div>
        <small className='cr'>	&copy; Copyright High Street Gym 2022</small>

    </div>
  )
}

export default Footer