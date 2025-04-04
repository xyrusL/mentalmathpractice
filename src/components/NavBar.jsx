import { Link } from 'react-router-dom'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

function Navbar({ soundOn, setSoundOn}) {
    const toggleSound = () => {
        setSoundOn(!soundOn)
    }

    return (
        <nav className="rounded-5 p-4 d-flex flex-column flex-md-row align-items-center justify-content-between" style={{ backgroundColor: 'rgb(31, 41, 55)' }}>
            <Link to="/" className="text-decoration-none text-white mb-3 mb-md-0">
                <h1 className="fw-bold m-0 display-6 text-center cursor-pointer">
                    Mental Math Practice Online!
                </h1>
            </Link>
            <ul className="list-unstyled d-flex flex-row mb-0 fs-4">
                <li className="mx-3 cursor-pointer"><Link to="/About" className="text-decoration-none text-white">About</Link></li>
                <li className="mx-3 cursor-pointer"><Link to="/Tutorial" className="text-decoration-none text-white">Tutorial</Link></li>
                <li className="mx-3 cursor-pointer">SourceCode</li>
                <li className="mx-3 cursor-pointer" onClick={toggleSound}>
                    {soundOn ? <FaVolumeUp className="text-white" /> : <FaVolumeMute className="text-white" />}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar