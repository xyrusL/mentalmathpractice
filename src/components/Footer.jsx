function Footer() {
    return (
        <footer className="rounded-top-5 p-3 mt-auto d-flex flex-column flex-md-row align-items-center justify-content-center" style={{ backgroundColor: 'rgb(31, 41, 55)' }}>
            <p className="mb-3 mb-md-0 me-md-3 text-white">© {new Date().getFullYear()} Mental Math. All rights reserved.</p>
            <p className="mb-0 text-white">Just For Learning Only</p>            
        </footer>
    )
}

export default Footer