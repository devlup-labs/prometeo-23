import './navbar.css'

export default function Navbar() {
    return (
        <div id="navbar">
            <div className="navbar-left-section">
                {/* speakers, sponsors, events */}
                <div className="navbar-left-section-speakers">speakers</div>
                <div className="navbar-left-section-sponsors">sponsors</div>
                <div className="navbar-left-section-events">events</div>
            </div>
            <div className="navbar-logo">
                
            </div>
            <div className='navbar-right-section'>
                {/* gallery, theme, register, login */}
                <div className="navbar-right-section-gallery">gallery</div>
                <div className="navbar-right-section-theme">theme</div>
                <div className="navbar-right-section-register">register</div>
                <div className="navbar-right-section-login">login</div>
            </div>
        </div>
    )
}